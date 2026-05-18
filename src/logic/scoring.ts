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
        message: `${targetStone.color === "black" ? "Black" : "White"} stone at ${toCoordLabel(targetStone)} has wrong color`,
      });
    }
  });

  for (const targetIndex of Array.from(unmatchedTargets)) {
    const targetStone = targetStones[targetIndex];
    let nearMissUserIndex: number | null = null;

    for (const userIndex of unmatchedUsers) {
      const userStone = userStones[userIndex];
      if (userStone.color !== targetStone.color) {
        continue;
      }
      if (manhattanDistance(targetStone, userStone) === 1) {
        nearMissUserIndex = userIndex;
        break;
      }
    }

    if (nearMissUserIndex !== null) {
      const userStone = userStones[nearMissUserIndex];
      unmatchedTargets.delete(targetIndex);
      unmatchedUsers.delete(nearMissUserIndex);
      mistakes.push({
        type: "near-miss",
        points: 1,
        targetStone,
        userStone,
        message: `${targetStone.color === "black" ? "Black" : "White"} stone near ${toCoordLabel(targetStone)} is one intersection away`,
      });
    }
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
    expectedPoints: 4,
  },
  {
    name: "missing and extra",
    target: [{ x: 2, y: 2, color: "black" }],
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
