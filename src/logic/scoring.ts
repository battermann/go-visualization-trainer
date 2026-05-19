import { Mistake, ScoreResult, Stone } from "../types";

function keyOf(stone: Pick<Stone, "x" | "y">): string {
  return `${stone.x},${stone.y}`;
}

function toCoordLabel(stone: Pick<Stone, "x" | "y">, boardSize = 9): string {
  const col = String.fromCharCode(65 + stone.x);
  const row = boardSize - stone.y;
  return `${col}${row}`;
}

function manhattanDistance(a: Stone, b: Stone): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function colorLabel(stone: Stone): string {
  return stone.color === "black" ? "Black" : "White";
}

function removeMatchedPair(
  targetIndex: number,
  userIndex: number,
  unmatchedTargets: Set<number>,
  unmatchedUsers: Set<number>,
): void {
  unmatchedTargets.delete(targetIndex);
  unmatchedUsers.delete(userIndex);
}

function findBestMatching(
  targetIndexes: number[],
  userIndexes: number[],
  canMatch: (targetIndex: number, userIndex: number) => boolean,
): Array<[number, number]> {
  let best: Array<[number, number]> = [];

  function search(
    targetPosition: number,
    usedUsers: Set<number>,
    pairs: Array<[number, number]>,
  ): void {
    if (targetPosition >= targetIndexes.length) {
      if (pairs.length > best.length) {
        best = [...pairs];
      }
      return;
    }

    if (pairs.length + (targetIndexes.length - targetPosition) <= best.length) {
      return;
    }

    const targetIndex = targetIndexes[targetPosition];
    search(targetPosition + 1, usedUsers, pairs);

    for (const userIndex of userIndexes) {
      if (usedUsers.has(userIndex) || !canMatch(targetIndex, userIndex)) {
        continue;
      }
      usedUsers.add(userIndex);
      pairs.push([targetIndex, userIndex]);
      search(targetPosition + 1, usedUsers, pairs);
      pairs.pop();
      usedUsers.delete(userIndex);
    }
  }

  search(0, new Set(), []);
  return best;
}

export function scoreProblem(targetStones: Stone[], userStones: Stone[]): ScoreResult {
  const mistakes: Mistake[] = [];
  const unmatchedTargets = new Set(targetStones.map((_, idx) => idx));
  const unmatchedUsers = new Set(userStones.map((_, idx) => idx));
  const userByCoord = new Map<string, number>();

  userStones.forEach((stone, index) => {
    userByCoord.set(keyOf(stone), index);
  });

  targetStones.forEach((targetStone, targetIndex) => {
    const userIndex = userByCoord.get(keyOf(targetStone));
    if (userIndex === undefined || !unmatchedUsers.has(userIndex)) {
      return;
    }
    const userStone = userStones[userIndex];
    unmatchedTargets.delete(targetIndex);
    unmatchedUsers.delete(userIndex);

    if (userStone.color !== targetStone.color) {
      mistakes.push({
        type: "wrong-color",
        points: 1,
        targetStone,
        userStone,
        message: `${colorLabel(targetStone)} stone at ${toCoordLabel(targetStone)} has wrong color`,
      });
    }
  });

  const nearMissPairs = findBestMatching(
    Array.from(unmatchedTargets),
    Array.from(unmatchedUsers),
    (targetIndex, userIndex) => {
      const targetStone = targetStones[targetIndex];
      const userStone = userStones[userIndex];
      return targetStone.color === userStone.color && manhattanDistance(targetStone, userStone) === 1;
    },
  );

  for (const [targetIndex, userIndex] of nearMissPairs) {
    const targetStone = targetStones[targetIndex];
    const userStone = userStones[userIndex];
    removeMatchedPair(targetIndex, userIndex, unmatchedTargets, unmatchedUsers);
    mistakes.push({
      type: "near-miss",
      points: 1,
      targetStone,
      userStone,
      message: `${colorLabel(targetStone)} stone near ${toCoordLabel(targetStone)} is one intersection away`,
    });
  }

  const remainingTargetIndexes = Array.from(unmatchedTargets);
  const remainingUserIndexes = Array.from(unmatchedUsers);
  const wrongPositionPairCount = Math.min(
    remainingTargetIndexes.length,
    remainingUserIndexes.length,
  );

  for (let i = 0; i < wrongPositionPairCount; i += 1) {
    const targetIndex = remainingTargetIndexes[i];
    const userIndex = remainingUserIndexes[i];
    const targetStone = targetStones[targetIndex];
    const userStone = userStones[userIndex];
    removeMatchedPair(targetIndex, userIndex, unmatchedTargets, unmatchedUsers);
    mistakes.push({
      type: "wrong-position",
      points: 2,
      targetStone,
      userStone,
      message: `${colorLabel(userStone)} stone at ${toCoordLabel(userStone)} should be ${colorLabel(targetStone).toLowerCase()} at ${toCoordLabel(targetStone)}`,
    });
  }

  for (const targetIndex of unmatchedTargets) {
    const targetStone = targetStones[targetIndex];
    mistakes.push({
      type: "missing",
      points: 2,
      targetStone,
      message: `Missing ${targetStone.color} stone at ${toCoordLabel(targetStone)}`,
    });
  }

  for (const userIndex of unmatchedUsers) {
    const userStone = userStones[userIndex];
    mistakes.push({
      type: "extra",
      points: 2,
      userStone,
      message: `Extra ${userStone.color} stone at ${toCoordLabel(userStone)}`,
    });
  }

  return {
    points: mistakes.reduce((sum, mistake) => sum + mistake.points, 0),
    mistakes,
  };
}

type ScoringCase = {
  name: string;
  target: Stone[];
  user: Stone[];
  expectedPoints: number;
};

const SCORING_EXAMPLES: ScoringCase[] = [
  {
    name: "perfect match",
    target: [{ x: 0, y: 0, color: "black" }],
    user: [{ x: 0, y: 0, color: "black" }],
    expectedPoints: 0,
  },
  {
    name: "wrong color at same coordinate",
    target: [{ x: 3, y: 3, color: "black" }],
    user: [{ x: 3, y: 3, color: "white" }],
    expectedPoints: 1,
  },
  {
    name: "orthogonal near miss",
    target: [{ x: 4, y: 4, color: "white" }],
    user: [{ x: 4, y: 5, color: "white" }],
    expectedPoints: 1,
  },
  {
    name: "diagonal should not be near miss",
    target: [{ x: 4, y: 4, color: "white" }],
    user: [{ x: 5, y: 5, color: "white" }],
    expectedPoints: 2,
  },
  {
    name: "far misplaced stone counts once",
    target: [{ x: 2, y: 2, color: "black" }],
    user: [{ x: 8, y: 8, color: "black" }],
    expectedPoints: 2,
  },
  {
    name: "one misplaced plus one missing",
    target: [
      { x: 2, y: 2, color: "black" },
      { x: 3, y: 3, color: "white" },
    ],
    user: [{ x: 8, y: 8, color: "black" }],
    expectedPoints: 4,
  },
];

export function runScoringSelfCheck(): string[] {
  const failures: string[] = [];
  for (const testCase of SCORING_EXAMPLES) {
    const result = scoreProblem(testCase.target, testCase.user);
    if (result.points !== testCase.expectedPoints) {
      failures.push(
        `${testCase.name}: expected ${testCase.expectedPoints}, got ${result.points}`,
      );
    }
  }
  return failures;
}
