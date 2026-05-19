import { LevelConfig, Problem, Stone } from "../types";

function stoneFromCoord(token: string, color: "black" | "white") {
  const normalized = token.trim().toLowerCase();
  const match = normalized.match(/^([a-i])([1-9])$/);
  if (!match) {
    throw new Error(`Invalid stone coordinate: ${token}`);
  }

  return {
    x: match[1].charCodeAt(0) - 97,
    y: 9 - Number(match[2]),
    color,
  };
}

function expandCoordText(text: string): string[] {
  return text
    .toLowerCase()
    .match(/[a-i][1-9]/g) ?? [];
}

function makeProblemsFromText(level: number, lines: string[]): Problem[] {
  return lines.map((line, index) => {
    const whiteMatch = line.match(/w:\s*(.*?)\s*b:/i);
    const blackMatch = line.match(/b:\s*(.*)$/i);

    return {
      id: `level-${level}-problem-${index + 1}`,
      boardSize: 9,
      stones: [
        ...expandCoordText(whiteMatch?.[1] ?? "").map((coord) =>
          stoneFromCoord(coord, "white"),
        ),
        ...expandCoordText(blackMatch?.[1] ?? "").map((coord) =>
          stoneFromCoord(coord, "black"),
        ),
      ],
    };
  });
}

function expandCompactCoordText(text: string): string[] {
  const coords: string[] = [];
  let currentColumn = "";

  for (const rawToken of text.toLowerCase().trim().split(/\s+/)) {
    const token = rawToken.replace(/[^a-i1-9]/g, "");
    if (!token) {
      continue;
    }

    if (/^[a-i]$/.test(token)) {
      currentColumn = token;
      continue;
    }

    const columnWithRows = token.match(/^([a-i])([1-9]+)$/);
    if (columnWithRows) {
      currentColumn = columnWithRows[1];
      for (const row of columnWithRows[2]) {
        coords.push(`${currentColumn}${row}`);
      }
      continue;
    }

    if (/^[1-9]+$/.test(token) && currentColumn) {
      for (const row of token) {
        coords.push(`${currentColumn}${row}`);
      }
    }
  }

  return coords;
}

function uniqueStones(stones: Stone[]): Stone[] {
  const seen = new Set<string>();
  return stones.filter((stone) => {
    const key = `${stone.color}:${stone.x},${stone.y}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function makeProblemsFromCompactText(level: number, lines: string[]): Problem[] {
  return lines.map((line, index) => {
    const whiteMatch = line.match(/w:\s*(.*?)(?:\s*b:|$)/i);
    const blackMatch = line.match(/b:\s*(.*)$/i);
    const stones = [
      ...expandCompactCoordText(whiteMatch?.[1] ?? "").map((coord) =>
        stoneFromCoord(coord, "white"),
      ),
      ...expandCompactCoordText(blackMatch?.[1] ?? "").map((coord) =>
        stoneFromCoord(coord, "black"),
      ),
    ];

    return {
      id: `level-${level}-problem-${index + 1}`,
      boardSize: 9,
      stones: uniqueStones(stones),
    };
  });
}

function makeDummyProblem(level: number): Problem[] {
  return [
    {
      id: `level-${level}-problem-1`,
      boardSize: 9,
      stones: [
        // Display coords: white B1, black G6
        { x: 1, y: 8, color: "white" },
        { x: 6, y: 3, color: "black" },
      ],
    },
  ];
}

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    rank: "30-20 kyu",
    timeLimitMinutes: 10,
    levelUpBelow: 5,
    levelDownAbove: null,
    problems: [
      ...makeDummyProblem(1),
      {
        id: "level-1-problem-2",
        boardSize: 9,
        stones: [
          // l1 p2: b B2, b D6, w G8
          { x: 1, y: 7, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 6, y: 1, color: "white" },
        ],
      },
      {
        id: "level-1-problem-3",
        boardSize: 9,
        stones: [
          // l1 p3: w B1, b C1, b E4
          { x: 1, y: 8, color: "white" },
          { x: 2, y: 8, color: "black" },
          { x: 4, y: 5, color: "black" },
        ],
      },
      {
        id: "level-1-problem-4",
        boardSize: 9,
        stones: [
          // l1 p4: w A2, b C6, b F7
          { x: 0, y: 7, color: "white" },
          { x: 2, y: 3, color: "black" },
          { x: 5, y: 2, color: "black" },
        ],
      },
      {
        id: "level-1-problem-5",
        boardSize: 9,
        stones: [
          // l1 p5: b D4, b E7, w F4
          { x: 3, y: 5, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 5, color: "white" },
        ],
      },
      {
        id: "level-1-problem-6",
        boardSize: 9,
        stones: [
          // l1 p6: b B7, w C8, b D5
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 4, color: "black" },
        ],
      },
      {
        id: "level-1-problem-7",
        boardSize: 9,
        stones: [
          // l1 p7: b E5, b F5, w G5, w G6
          { x: 4, y: 4, color: "black" },
          { x: 5, y: 4, color: "black" },
          { x: 6, y: 4, color: "white" },
          { x: 6, y: 3, color: "white" },
        ],
      },
      {
        id: "level-1-problem-8",
        boardSize: 9,
        stones: [
          // l1 p8: b B7, b C4, w F6, w G4
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 5, y: 3, color: "white" },
          { x: 6, y: 5, color: "white" },
        ],
      },
      {
        id: "level-1-problem-9",
        boardSize: 9,
        stones: [
          // l1 p9: b B3, w C6, b G2, w I8
          { x: 1, y: 6, color: "black" },
          { x: 2, y: 3, color: "white" },
          { x: 6, y: 7, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-1-problem-10",
        boardSize: 9,
        stones: [
          // l1 p10: b A3, b B2, w E5, w G5
          { x: 0, y: 6, color: "black" },
          { x: 1, y: 7, color: "black" },
          { x: 4, y: 4, color: "white" },
          { x: 6, y: 4, color: "white" },
        ],
      },
      {
        id: "level-1-problem-11",
        boardSize: 9,
        stones: [
          // l1 p11: b A6, w B4, b C3, w E2, b H3
          { x: 0, y: 3, color: "black" },
          { x: 1, y: 5, color: "white" },
          { x: 2, y: 6, color: "black" },
          { x: 4, y: 7, color: "white" },
          { x: 7, y: 6, color: "black" },
        ],
      },
      {
        id: "level-1-problem-12",
        boardSize: 9,
        stones: [
          // l1 p12: b A8, w D4, b E6, w F3, b G5
          { x: 0, y: 1, color: "black" },
          { x: 3, y: 5, color: "white" },
          { x: 4, y: 3, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 6, y: 4, color: "black" },
        ],
      },
    ],
  },
  {
    level: 2,
    rank: "20-11 kyu",
    timeLimitMinutes: 15,
    levelUpBelow: 10,
    levelDownAbove: 20,
    problems: [
      {
        id: "level-2-problem-1",
        boardSize: 9,
        stones: [
          // l2 p1: b D6, w E4, b G6
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 5, color: "white" },
          { x: 6, y: 3, color: "black" },
        ],
      },
      {
        id: "level-2-problem-2",
        boardSize: 9,
        stones: [
          // l2 p2: b B2, b D6, w G8
          { x: 1, y: 7, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 6, y: 1, color: "white" },
        ],
      },
      {
        id: "level-2-problem-3",
        boardSize: 9,
        stones: [
          // l2 p3: w B1, b C1, b E4, w I8
          { x: 1, y: 8, color: "white" },
          { x: 2, y: 8, color: "black" },
          { x: 4, y: 5, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-2-problem-4",
        boardSize: 9,
        stones: [
          // l2 p4: b C6, w D4, b F7, w G4
          { x: 2, y: 3, color: "black" },
          { x: 3, y: 5, color: "white" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 5, color: "white" },
        ],
      },
      {
        id: "level-2-problem-5",
        boardSize: 9,
        stones: [
          // l2 p5: w C5, b D4, b E7, w F4, b G7
          { x: 2, y: 4, color: "white" },
          { x: 3, y: 5, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 5, color: "white" },
          { x: 6, y: 2, color: "black" },
        ],
      },
      {
        id: "level-2-problem-6",
        boardSize: 9,
        stones: [
          // l2 p6: w C3, b C7, w D8, b E5, b F7
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 2, color: "black" },
          { x: 3, y: 1, color: "white" },
          { x: 4, y: 4, color: "black" },
          { x: 5, y: 2, color: "black" },
        ],
      },
      {
        id: "level-2-problem-7",
        boardSize: 9,
        stones: [
          // l2 p7: b C3, b E3, b E6, w G6, w G7
          { x: 2, y: 6, color: "black" },
          { x: 4, y: 6, color: "black" },
          { x: 4, y: 3, color: "black" },
          { x: 6, y: 3, color: "white" },
          { x: 6, y: 2, color: "white" },
        ],
      },
      {
        id: "level-2-problem-8",
        boardSize: 9,
        stones: [
          // l2 p8: b B7, b C4, w D3, b D7, w F6, w G4
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 3, y: 6, color: "white" },
          { x: 3, y: 2, color: "black" },
          { x: 5, y: 3, color: "white" },
          { x: 6, y: 5, color: "white" },
        ],
      },
      {
        id: "level-2-problem-9",
        boardSize: 9,
        stones: [
          // l2 p9: b B1, b B3, w C6, w C9, b G2, w I8
          { x: 1, y: 8, color: "black" },
          { x: 1, y: 6, color: "black" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 0, color: "white" },
          { x: 6, y: 7, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-2-problem-10",
        boardSize: 9,
        stones: [
          // l2 p10: b B2, w C8, b D2, w E5, b F5, w G5
          { x: 1, y: 7, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 7, color: "black" },
          { x: 4, y: 4, color: "white" },
          { x: 5, y: 4, color: "black" },
          { x: 6, y: 4, color: "white" },
        ],
      },
      {
        id: "level-2-problem-11",
        boardSize: 9,
        stones: [
          // l2 p11: b A6, w B4, b C3, w D6, w E2, b E4, b H3
          { x: 0, y: 3, color: "black" },
          { x: 1, y: 5, color: "white" },
          { x: 2, y: 6, color: "black" },
          { x: 3, y: 3, color: "white" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 7, y: 6, color: "black" },
        ],
      },
      {
        id: "level-2-problem-12",
        boardSize: 9,
        stones: [
          // l2 p12: b A8, w B3, w D1, w D4, b E6, b E7, w F3, w G5
          { x: 0, y: 1, color: "black" },
          { x: 1, y: 6, color: "white" },
          { x: 3, y: 8, color: "white" },
          { x: 3, y: 5, color: "white" },
          { x: 4, y: 3, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 6, y: 4, color: "white" },
        ],
      },
    ],
  },
  {
    level: 3,
    rank: "15-7 kyu",
    timeLimitMinutes: 20,
    levelUpBelow: 15,
    levelDownAbove: 30,
    problems: [
      {
        id: "level-3-problem-1",
        boardSize: 9,
        stones: [
          // l3 p1: b D6, w E4, b G7
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 5, color: "white" },
          { x: 6, y: 2, color: "black" },
        ],
      },
      {
        id: "level-3-problem-2",
        boardSize: 9,
        stones: [
          // l3 p2: b B7, b D6, w F2, w G8
          { x: 1, y: 2, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 5, y: 7, color: "white" },
          { x: 6, y: 1, color: "white" },
        ],
      },
      {
        id: "level-3-problem-3",
        boardSize: 9,
        stones: [
          // l3 p3: b A1, w B1, b C1, b E4, w I8
          { x: 0, y: 8, color: "black" },
          { x: 1, y: 8, color: "white" },
          { x: 2, y: 8, color: "black" },
          { x: 4, y: 5, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-3-problem-4",
        boardSize: 9,
        stones: [
          // l3 p4: b C6, w C8, b D2, w C4, b F7, w G4
          { x: 2, y: 3, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 7, color: "black" },
          { x: 2, y: 5, color: "white" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 5, color: "white" },
        ],
      },
      {
        id: "level-3-problem-5",
        boardSize: 9,
        stones: [
          // l3 p5: w B7, w C5, b D4, b E7, w F4, b G7
          { x: 1, y: 2, color: "white" },
          { x: 2, y: 4, color: "white" },
          { x: 3, y: 5, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 5, color: "white" },
          { x: 6, y: 2, color: "black" },
        ],
      },
      {
        id: "level-3-problem-6",
        boardSize: 9,
        stones: [
          // l3 p6: w C3, b C7, w D8, b E5, b F7, w H4
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 2, color: "black" },
          { x: 3, y: 1, color: "white" },
          { x: 4, y: 4, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 7, y: 5, color: "white" },
        ],
      },
      {
        id: "level-3-problem-7",
        boardSize: 9,
        stones: [
          // l3 p7: b B3, w C7, b E6, b G4, b G5, w G6, w G7
          { x: 1, y: 6, color: "black" },
          { x: 2, y: 2, color: "white" },
          { x: 4, y: 3, color: "black" },
          { x: 6, y: 5, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 6, y: 3, color: "white" },
          { x: 6, y: 2, color: "white" },
        ],
      },
      {
        id: "level-3-problem-8",
        boardSize: 9,
        stones: [
          // l3 p8: b B7, b C4, b D7, b E4, w F3, w F5, w F6, w G4
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 5, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 4, color: "white" },
          { x: 5, y: 3, color: "white" },
          { x: 6, y: 5, color: "white" },
        ],
      },
      {
        id: "level-3-problem-9",
        boardSize: 9,
        stones: [
          // l3 p9: b B1, b B3, w C6, w C9, b E3, b F7, b G2, b H9, w I8
          { x: 1, y: 8, color: "black" },
          { x: 1, y: 6, color: "black" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 0, color: "white" },
          { x: 4, y: 6, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 7, color: "black" },
          { x: 7, y: 0, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-3-problem-10",
        boardSize: 9,
        stones: [
          // l3 p10: b B2, b B8, w C6, w C8, b D2, w E5, b F5, w G5, b G8, w H2
          { x: 1, y: 7, color: "black" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 7, color: "black" },
          { x: 4, y: 4, color: "white" },
          { x: 5, y: 4, color: "black" },
          { x: 6, y: 4, color: "white" },
          { x: 6, y: 1, color: "black" },
          { x: 7, y: 7, color: "white" },
        ],
      },
      {
        id: "level-3-problem-11",
        boardSize: 9,
        stones: [
          // l3 p11: b A6, b B8, b C3, w D6, w E2, b E4, w G2, b G4, w G7, b H3, w H7
          { x: 0, y: 3, color: "black" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 6, color: "black" },
          { x: 3, y: 3, color: "white" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 6, y: 7, color: "white" },
          { x: 6, y: 5, color: "black" },
          { x: 6, y: 2, color: "white" },
          { x: 7, y: 6, color: "black" },
          { x: 7, y: 2, color: "white" },
        ],
      },
      {
        id: "level-3-problem-12",
        boardSize: 9,
        stones: [
          // l3 p12: b A8, w B3, b B6, w D1, w D4, b E6, b E7, b F2, w F3, b G5, w G8, w I1
          { x: 0, y: 1, color: "black" },
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 3, color: "black" },
          { x: 3, y: 8, color: "white" },
          { x: 3, y: 5, color: "white" },
          { x: 4, y: 3, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 6, y: 4, color: "black" },
          { x: 6, y: 1, color: "white" },
          { x: 8, y: 8, color: "white" },
        ],
      },
    ],
  },
  {
    level: 4,
    rank: "10-3 kyu",
    timeLimitMinutes: 25,
    levelUpBelow: 20,
    levelDownAbove: 40,
    problems: [
      {
        id: "level-4-problem-1",
        boardSize: 9,
        stones: [
          // l4 p1: b B8, b D6, w E4, b G6
          { x: 1, y: 1, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 5, color: "white" },
          { x: 6, y: 3, color: "black" },
        ],
      },
      {
        id: "level-4-problem-2",
        boardSize: 9,
        stones: [
          // l4 p2: b B3, b B7, b C6, b F2, b G8
          { x: 1, y: 6, color: "black" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 3, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 6, y: 1, color: "black" },
        ],
      },
      {
        id: "level-4-problem-3",
        boardSize: 9,
        stones: [
          // l4 p3: b A1, w B1, b C1, w C8, b E4, w I8
          { x: 0, y: 8, color: "black" },
          { x: 1, y: 8, color: "white" },
          { x: 2, y: 8, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-4-problem-4",
        boardSize: 9,
        stones: [
          // l4 p4: w C2, w C4, b C6, b C8, b F2, b F7, b G5, w H8
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 5, color: "white" },
          { x: 2, y: 3, color: "black" },
          { x: 2, y: 1, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 7, y: 1, color: "white" },
        ],
      },
      {
        id: "level-4-problem-5",
        boardSize: 9,
        stones: [
          // l4 p5: w B7, w C5, b D4, b E7, b F2, w F4, w F8, b G7
          { x: 1, y: 2, color: "white" },
          { x: 2, y: 4, color: "white" },
          { x: 3, y: 5, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 5, color: "white" },
          { x: 5, y: 1, color: "white" },
          { x: 6, y: 2, color: "black" },
        ],
      },
      {
        id: "level-4-problem-6",
        boardSize: 9,
        stones: [
          // l4 p6: w C3, b C4, b C5, w D2, b D3, w D4, b D6, w E2, b E3, w F5
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 5, color: "black" },
          { x: 2, y: 4, color: "black" },
          { x: 3, y: 7, color: "white" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 5, color: "white" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 6, color: "black" },
          { x: 5, y: 4, color: "white" },
        ],
      },
      {
        id: "level-4-problem-7",
        boardSize: 9,
        stones: [
          // l4 p7: w C8, w D6, w D7, b D8, b E5, w E6, b E7, w E8, b F6, b F7, b F8
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 3, color: "white" },
          { x: 3, y: 2, color: "white" },
          { x: 3, y: 1, color: "black" },
          { x: 4, y: 4, color: "black" },
          { x: 4, y: 3, color: "white" },
          { x: 4, y: 2, color: "black" },
          { x: 4, y: 1, color: "white" },
          { x: 5, y: 3, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 5, y: 1, color: "black" },
        ],
      },
      {
        id: "level-4-problem-8",
        boardSize: 9,
        stones: [
          // l4 p8: w B3, b B7, b C4, w D2, b D7, b E4, w F3, w F5, w F6, b F8, w G4, b G7
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 3, y: 7, color: "white" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 5, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 4, color: "white" },
          { x: 5, y: 3, color: "white" },
          { x: 5, y: 1, color: "black" },
          { x: 6, y: 5, color: "white" },
          { x: 6, y: 2, color: "black" },
        ],
      },
      {
        id: "level-4-problem-9",
        boardSize: 9,
        stones: [
          // l4 p9: w A5, b B1, b B3, w C6, w C9, w E1, b E3, w F7, b G2, b H7, b H9, w I8
          { x: 0, y: 4, color: "white" },
          { x: 1, y: 8, color: "black" },
          { x: 1, y: 6, color: "black" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 0, color: "white" },
          { x: 4, y: 8, color: "white" },
          { x: 4, y: 6, color: "black" },
          { x: 5, y: 2, color: "white" },
          { x: 6, y: 7, color: "black" },
          { x: 7, y: 2, color: "black" },
          { x: 7, y: 0, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-4-problem-10",
        boardSize: 9,
        stones: [
          // l4 p10: b B2, b B8, w C2, w C6, b C7, w C8, b D2, w E5, b F5, w G5, b G8, w H2, b H3
          { x: 1, y: 7, color: "black" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 2, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 7, color: "black" },
          { x: 4, y: 4, color: "white" },
          { x: 5, y: 4, color: "black" },
          { x: 6, y: 4, color: "white" },
          { x: 6, y: 1, color: "black" },
          { x: 7, y: 7, color: "white" },
          { x: 7, y: 6, color: "black" },
        ],
      },
      {
        id: "level-4-problem-11",
        boardSize: 9,
        stones: [
          // l4 p11: b A6, w B4, w B6, b B8, w C2, b C3, w D5, w D6, w E2, b E4, w G2, b G4, w G7, b H3, w H7
          { x: 0, y: 3, color: "black" },
          { x: 1, y: 5, color: "white" },
          { x: 1, y: 3, color: "white" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 6, color: "black" },
          { x: 3, y: 4, color: "white" },
          { x: 3, y: 3, color: "white" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 6, y: 7, color: "white" },
          { x: 6, y: 5, color: "black" },
          { x: 6, y: 2, color: "white" },
          { x: 7, y: 6, color: "black" },
          { x: 7, y: 2, color: "white" },
        ],
      },
      {
        id: "level-4-problem-12",
        boardSize: 9,
        stones: [
          // l4 p12: b A8, w B3, b B6, w C2, w D1, w D4, b D7, b E6, b E7, b F1, b F2, w F3, b G5, w G8, w H3, b H7, w I1
          { x: 0, y: 1, color: "black" },
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 3, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 3, y: 8, color: "white" },
          { x: 3, y: 5, color: "white" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 3, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 8, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 6, y: 4, color: "black" },
          { x: 6, y: 1, color: "white" },
          { x: 7, y: 6, color: "white" },
          { x: 7, y: 2, color: "black" },
          { x: 8, y: 8, color: "white" },
        ],
      },
    ],
  },
  {
    level: 5,
    rank: "6-1 kyu",
    timeLimitMinutes: 30,
    levelUpBelow: 25,
    levelDownAbove: 50,
    problems: [
      {
        id: "level-5-problem-1",
        boardSize: 9,
        stones: [
          // l5 p1: b B8, b D6, w E4, w E8, b G6
          { x: 1, y: 1, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 5, color: "white" },
          { x: 4, y: 1, color: "white" },
          { x: 6, y: 3, color: "black" },
        ],
      },
      {
        id: "level-5-problem-2",
        boardSize: 9,
        stones: [
          // l5 p2: b B3, b B7, b D6, b F2, b F3, b F4, b G8
          { x: 1, y: 6, color: "black" },
          { x: 1, y: 2, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 6, color: "black" },
          { x: 5, y: 5, color: "black" },
          { x: 6, y: 1, color: "black" },
        ],
      },
      {
        id: "level-5-problem-3",
        boardSize: 9,
        stones: [
          // l5 p3: b A1, w B2, b B7, b C1, w C8, b E4, w H2, b H4, w I8
          { x: 0, y: 8, color: "black" },
          { x: 1, y: 8, color: "white" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 8, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 7, y: 7, color: "white" },
          { x: 7, y: 5, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-5-problem-4",
        boardSize: 9,
        stones: [
          // l5 p4: w C2, w C4, b C6, w C8, w E4, b F2, b F3, b F7, b G5, w H3, w H8
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 5, color: "white" },
          { x: 2, y: 3, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 4, y: 5, color: "white" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 6, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 7, y: 6, color: "white" },
          { x: 7, y: 1, color: "white" },
        ],
      },
      {
        id: "level-5-problem-5",
        boardSize: 9,
        stones: [
          // l5 p5: b A5, w B7, w C5, w D3, w D4, b E7, b F2, w F4, w F8, b G3, b G7, w H4, b H6
          { x: 0, y: 4, color: "black" },
          { x: 1, y: 2, color: "white" },
          { x: 2, y: 4, color: "white" },
          { x: 3, y: 6, color: "white" },
          { x: 1, y: 5, color: "white" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 5, color: "white" },
          { x: 5, y: 1, color: "white" },
          { x: 6, y: 6, color: "black" },
          { x: 6, y: 2, color: "black" },
          { x: 7, y: 5, color: "white" },
          { x: 7, y: 3, color: "black" },
        ],
      },
      {
        id: "level-5-problem-6",
        boardSize: 9,
        stones: [
          // l5 p6: w B3, w C3, b C4, b C5, w D2, b D3, w D4, b D6, w E2, b E3, b F3, w F5, b F7, w G7, b G8
          { x: 1, y: 6, color: "white" },
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 5, color: "black" },
          { x: 2, y: 4, color: "black" },
          { x: 3, y: 7, color: "white" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 5, color: "white" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 6, color: "black" },
          { x: 5, y: 6, color: "black" },
          { x: 5, y: 4, color: "white" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 2, color: "white" },
          { x: 6, y: 1, color: "black" },
        ],
      },
      {
        id: "level-5-problem-7",
        boardSize: 9,
        stones: [
          // l5 p7: interpreted be99wf3 as be9 + wf3
          // w B5, w B6, b C5, w C8, w D6, w D7, b D8, w E3, b E4, b E5, w E6, b E7, b E9, w F3, b F6, b F7, b F8
          { x: 1, y: 4, color: "white" },
          { x: 1, y: 3, color: "white" },
          { x: 2, y: 4, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 3, color: "white" },
          { x: 3, y: 2, color: "white" },
          { x: 3, y: 1, color: "black" },
          { x: 4, y: 6, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 4, y: 4, color: "black" },
          { x: 4, y: 3, color: "white" },
          { x: 4, y: 2, color: "black" },
          { x: 4, y: 0, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 3, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 5, y: 1, color: "black" },
        ],
      },
      {
        id: "level-5-problem-8",
        boardSize: 9,
        stones: [
          // l5 p8: w B3, b B4, b B7, b C4, w D2, w D7, b E2, b E4, w F3, w F5, w F6, b F8, w G4, b G7, b H5, w H6, w H7
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 5, color: "black" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 3, y: 7, color: "white" },
          { x: 3, y: 2, color: "white" },
          { x: 4, y: 7, color: "black" },
          { x: 4, y: 5, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 4, color: "white" },
          { x: 5, y: 3, color: "white" },
          { x: 5, y: 1, color: "black" },
          { x: 6, y: 5, color: "white" },
          { x: 6, y: 2, color: "black" },
          { x: 7, y: 4, color: "black" },
          { x: 7, y: 3, color: "white" },
          { x: 7, y: 2, color: "white" },
        ],
      },
      {
        id: "level-5-problem-9",
        boardSize: 9,
        stones: [
          // l5 p9: w A5, b C3, b C4, b C5, w C9, b D7, w E1, w E3, w E4, w E5, b E7, b F7, b G2, b H5, b H7, b H8, b H9
          { x: 0, y: 4, color: "white" },
          { x: 2, y: 6, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 2, y: 4, color: "black" },
          { x: 2, y: 0, color: "white" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 8, color: "white" },
          { x: 4, y: 6, color: "white" },
          { x: 4, y: 5, color: "white" },
          { x: 4, y: 4, color: "white" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 7, color: "black" },
          { x: 7, y: 4, color: "black" },
          { x: 7, y: 2, color: "black" },
          { x: 7, y: 1, color: "black" },
          { x: 7, y: 0, color: "black" },
        ],
      },
      {
        id: "level-5-problem-10",
        boardSize: 9,
        stones: [
          // l5 p10: b B2, b B8, w C2, w C3, w C6, b C7, w C8, b D2, b D3, b D7, w E5, b F5, b F6, w F8, w G3, w G5, b G8, w H2, b H3
          { x: 1, y: 7, color: "black" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 2, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 7, color: "black" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 4, color: "white" },
          { x: 5, y: 4, color: "black" },
          { x: 5, y: 3, color: "black" },
          { x: 5, y: 1, color: "white" },
          { x: 6, y: 6, color: "white" },
          { x: 6, y: 4, color: "white" },
          { x: 6, y: 1, color: "black" },
          { x: 7, y: 7, color: "white" },
          { x: 7, y: 6, color: "black" },
        ],
      },
      {
        id: "level-5-problem-11",
        boardSize: 9,
        stones: [
          // l5 p11: interpreted gb8 as bb8 and gh8 as bh8
          // b A5, w B3, w B4, w B6, b B8, w B9, w C2, b C3, b C6, b D2, w D5, w D6, w E2, b E4, w G2, b G4, w G7, b H3, w H4, w H7, b H8
          { x: 0, y: 3, color: "black" },
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 5, color: "white" },
          { x: 1, y: 3, color: "white" },
          { x: 1, y: 1, color: "black" },
          { x: 1, y: 0, color: "white" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 6, color: "black" },
          { x: 2, y: 3, color: "black" },
          { x: 3, y: 7, color: "black" },
          { x: 3, y: 4, color: "white" },
          { x: 3, y: 3, color: "white" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 6, y: 7, color: "white" },
          { x: 6, y: 5, color: "black" },
          { x: 6, y: 2, color: "white" },
          { x: 7, y: 6, color: "black" },
          { x: 7, y: 5, color: "white" },
          { x: 7, y: 2, color: "white" },
          { x: 7, y: 1, color: "black" },
        ],
      },
      {
        id: "level-5-problem-12",
        boardSize: 9,
        stones: [
          // l5 p12: w B3, b B4, b B6, b C3, b C4, w C6, w C7, b C8, b D3, b D7, w D8, b E6, b E7, w E8, w F3, b G3, b G5, w G6, w G8, w H3, b H4, w H6, b H7
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 5, color: "black" },
          { x: 1, y: 3, color: "black" },
          { x: 2, y: 6, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 2, color: "white" },
          { x: 2, y: 1, color: "black" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 2, color: "black" },
          { x: 3, y: 1, color: "white" },
          { x: 4, y: 3, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 4, y: 1, color: "white" },
          { x: 5, y: 6, color: "white" },
          { x: 6, y: 6, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 6, y: 3, color: "white" },
          { x: 6, y: 1, color: "white" },
          { x: 7, y: 6, color: "white" },
          { x: 7, y: 5, color: "black" },
          { x: 7, y: 3, color: "white" },
          { x: 7, y: 2, color: "black" },
        ],
      },
    ],
  },
  {
    level: 6,
    rank: "3 kyu-2 dan",
    timeLimitMinutes: 35,
    levelUpBelow: 30,
    levelDownAbove: 60,
    problems: [
      {
        id: "level-6-problem-1",
        boardSize: 9,
        stones: [
          // l6 p1: w B3, b B8, b D6, w E4, w E8, b G6
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 1, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 5, color: "white" },
          { x: 4, y: 1, color: "white" },
          { x: 6, y: 3, color: "black" },
        ],
      },
      {
        id: "level-6-problem-2",
        boardSize: 9,
        stones: [
          // l6 p2
          { x: 1, y: 6, color: "black" },
          { x: 1, y: 2, color: "black" },
          { x: 3, y: 5, color: "black" },
          { x: 3, y: 4, color: "black" },
          { x: 3, y: 3, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 6, color: "black" },
          { x: 5, y: 5, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 6, y: 1, color: "black" },
        ],
      },
      {
        id: "level-6-problem-3",
        boardSize: 9,
        stones: [
          // l6 p3
          { x: 0, y: 8, color: "black" },
          { x: 1, y: 8, color: "white" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 8, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 5, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 3, color: "white" },
          { x: 7, y: 7, color: "white" },
          { x: 7, y: 5, color: "black" },
          { x: 8, y: 1, color: "white" },
        ],
      },
      {
        id: "level-6-problem-4",
        boardSize: 9,
        stones: [
          // l6 p4
          { x: 1, y: 5, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 5, color: "white" },
          { x: 2, y: 3, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 5, color: "white" },
          { x: 4, y: 1, color: "white" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 6, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 7, y: 5, color: "white" },
          { x: 7, y: 1, color: "white" },
        ],
      },
      {
        id: "level-6-problem-5",
        boardSize: 9,
        stones: [
          // l6 p5
          { x: 0, y: 4, color: "black" },
          { x: 1, y: 7, color: "black" },
          { x: 1, y: 2, color: "white" },
          { x: 2, y: 7, color: "black" },
          { x: 2, y: 4, color: "white" },
          { x: 2, y: 1, color: "black" },
          { x: 3, y: 6, color: "white" },
          { x: 3, y: 5, color: "black" },
          { x: 3, y: 1, color: "black" },
          { x: 4, y: 4, color: "black" },
          { x: 5, y: 7, color: "black" },
          { x: 5, y: 5, color: "white" },
          { x: 5, y: 1, color: "white" },
          { x: 6, y: 7, color: "white" },
          { x: 6, y: 6, color: "black" },
          { x: 7, y: 6, color: "white" },
          { x: 7, y: 5, color: "white" },
          { x: 7, y: 3, color: "black" },
        ],
      },
      {
        id: "level-6-problem-6",
        boardSize: 9,
        stones: [
          // l6 p6: normalized wrapped token "w h7" to wh7
          { x: 1, y: 6, color: "white" },
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 5, color: "black" },
          { x: 2, y: 4, color: "black" },
          { x: 3, y: 7, color: "white" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 5, color: "white" },
          { x: 3, y: 3, color: "black" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 6, color: "black" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 6, color: "black" },
          { x: 5, y: 4, color: "white" },
          { x: 5, y: 3, color: "white" },
          { x: 5, y: 2, color: "black" },
          { x: 5, y: 1, color: "black" },
          { x: 6, y: 5, color: "black" },
          { x: 6, y: 2, color: "white" },
          { x: 6, y: 1, color: "black" },
          { x: 7, y: 2, color: "white" },
          { x: 7, y: 1, color: "white" },
        ],
      },
      {
        id: "level-6-problem-7",
        boardSize: 9,
        stones: [
          // l6 p7: normalized wrapped token "w f3" to wf3
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 5, color: "black" },
          { x: 1, y: 4, color: "white" },
          { x: 1, y: 3, color: "white" },
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 5, color: "white" },
          { x: 2, y: 4, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 5, color: "black" },
          { x: 3, y: 3, color: "white" },
          { x: 3, y: 2, color: "white" },
          { x: 3, y: 1, color: "black" },
          { x: 4, y: 6, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 4, y: 4, color: "black" },
          { x: 4, y: 3, color: "white" },
          { x: 4, y: 2, color: "black" },
          { x: 4, y: 0, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 3, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 5, y: 1, color: "black" },
        ],
      },
      {
        id: "level-6-problem-8",
        boardSize: 9,
        stones: [
          // l6 p8: normalized wrapped token "b g7" to bg7
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 5, color: "black" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 5, color: "black" },
          { x: 3, y: 7, color: "white" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 7, color: "black" },
          { x: 4, y: 6, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 5, y: 6, color: "white" },
          { x: 5, y: 5, color: "white" },
          { x: 5, y: 4, color: "white" },
          { x: 5, y: 3, color: "white" },
          { x: 5, y: 1, color: "black" },
          { x: 6, y: 6, color: "black" },
          { x: 6, y: 5, color: "white" },
          { x: 6, y: 3, color: "black" },
          { x: 6, y: 2, color: "black" },
          { x: 7, y: 4, color: "black" },
          { x: 7, y: 3, color: "white" },
          { x: 7, y: 2, color: "white" },
        ],
      },
      {
        id: "level-6-problem-9",
        boardSize: 9,
        stones: [
          // l6 p9: normalized wrapped token "b h5" to bh5
          { x: 0, y: 6, color: "white" },
          { x: 0, y: 5, color: "white" },
          { x: 0, y: 4, color: "white" },
          { x: 1, y: 2, color: "black" },
          { x: 2, y: 8, color: "black" },
          { x: 2, y: 7, color: "black" },
          { x: 2, y: 6, color: "black" },
          { x: 2, y: 5, color: "black" },
          { x: 2, y: 4, color: "black" },
          { x: 2, y: 2, color: "black" },
          { x: 2, y: 0, color: "white" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 8, color: "white" },
          { x: 4, y: 6, color: "white" },
          { x: 4, y: 5, color: "white" },
          { x: 4, y: 4, color: "white" },
          { x: 4, y: 2, color: "black" },
          { x: 5, y: 2, color: "black" },
          { x: 6, y: 7, color: "black" },
          { x: 7, y: 4, color: "black" },
          { x: 7, y: 2, color: "black" },
          { x: 7, y: 1, color: "black" },
          { x: 7, y: 0, color: "black" },
        ],
      },
      {
        id: "level-6-problem-10",
        boardSize: 9,
        stones: [
          // l6 p10: normalized wrapped token "b g8" to bg8
          { x: 1, y: 7, color: "black" },
          { x: 1, y: 3, color: "black" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 6, color: "white" },
          { x: 2, y: 5, color: "white" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 2, color: "black" },
          { x: 2, y: 1, color: "white" },
          { x: 3, y: 7, color: "black" },
          { x: 3, y: 6, color: "black" },
          { x: 3, y: 2, color: "black" },
          { x: 4, y: 4, color: "white" },
          { x: 5, y: 4, color: "black" },
          { x: 5, y: 3, color: "black" },
          { x: 5, y: 1, color: "white" },
          { x: 6, y: 6, color: "white" },
          { x: 6, y: 4, color: "white" },
          { x: 6, y: 2, color: "black" },
          { x: 6, y: 1, color: "black" },
          { x: 7, y: 7, color: "white" },
          { x: 7, y: 6, color: "black" },
          { x: 7, y: 5, color: "white" },
        ],
      },
      {
        id: "level-6-problem-11",
        boardSize: 9,
        stones: [
          // l6 p11: interpreted invalid bw4 as wh4
          { x: 0, y: 3, color: "black" },
          { x: 1, y: 6, color: "white" },
          { x: 1, y: 5, color: "white" },
          { x: 1, y: 3, color: "white" },
          { x: 1, y: 1, color: "black" },
          { x: 1, y: 0, color: "white" },
          { x: 2, y: 7, color: "white" },
          { x: 2, y: 6, color: "black" },
          { x: 2, y: 3, color: "black" },
          { x: 3, y: 7, color: "black" },
          { x: 3, y: 4, color: "white" },
          { x: 3, y: 3, color: "white" },
          { x: 4, y: 7, color: "white" },
          { x: 4, y: 5, color: "black" },
          { x: 4, y: 1, color: "black" },
          { x: 6, y: 7, color: "white" },
          { x: 6, y: 5, color: "black" },
          { x: 6, y: 2, color: "white" },
          { x: 6, y: 1, color: "white" },
          { x: 7, y: 6, color: "black" },
          { x: 7, y: 5, color: "white" },
          { x: 7, y: 2, color: "white" },
          { x: 7, y: 1, color: "black" },
        ],
      },
      {
        id: "level-6-problem-12",
        boardSize: 9,
        stones: [
          // l6 p12: split bb6bb8 into bb6 bb8; interpreted invalid ws5 as wd5
          { x: 0, y: 2, color: "white" },
          { x: 0, y: 1, color: "black" },
          { x: 1, y: 3, color: "black" },
          { x: 1, y: 1, color: "black" },
          { x: 2, y: 4, color: "white" },
          { x: 2, y: 3, color: "white" },
          { x: 2, y: 0, color: "black" },
          { x: 3, y: 4, color: "white" },
          { x: 3, y: 0, color: "black" },
          { x: 4, y: 6, color: "white" },
          { x: 4, y: 3, color: "black" },
          { x: 4, y: 2, color: "white" },
          { x: 5, y: 5, color: "white" },
          { x: 5, y: 2, color: "black" },
          { x: 5, y: 1, color: "black" },
          { x: 6, y: 4, color: "black" },
          { x: 6, y: 2, color: "black" },
          { x: 6, y: 1, color: "white" },
          { x: 7, y: 4, color: "white" },
          { x: 7, y: 2, color: "black" },
          { x: 7, y: 1, color: "white" },
          { x: 8, y: 1, color: "white" },
          { x: 8, y: 0, color: "white" },
        ],
      },
    ],
  },
  {
    level: 7,
    rank: "1-4 dan",
    timeLimitMinutes: 45,
    levelUpBelow: 35,
    levelDownAbove: 70,
    problems: makeProblemsFromText(7, [
      "w: b3 e4 e8 b: b8 d6 g3 g6",
      "w: b: c7 d2d3d4 d7 d8 e3 e5 e7 g4 g5 h5",
      "w: b1 c4 c8 e8 f3 f6 h2 h6 i8 b: a1 b7 c1 d3 d6 e4 g8 h4",
      "w: b2 b6 c8 d5 f3 g8 h3 h5 h8 b: b4 b7 c4 c6 d7 e5 f7 g5 h4 h7 i9",
      "w: b7 c4 c5 d3 f4 f8 g2 g6 h3 h4 h8 b: b2 b8 c2 c8 d4 d8 e5 e7 f2 g3 h6 h7",
      "w: b3 c3 d2 d4 e2 f5 f6 g6 g7 h5 h6 h8 i7 b: c4 c5 d3 d6 e3 e7 f3 f7 f8 g4 g5 g8 h4",
      "w: b3 b5 b6 c3 c4 c8 d6 d7 e2 e3 e6 f3 g3 h3 b: b2 b4 c5 d2 d3 d4 d8 e4 e5 e7 e9 f6 f7 f8 g4 h4",
      "w: a2 b2 b3 c2 d2 e3 f3 f4 f5 f6 g4 g5 h6 h7 b: a3 a4 b4 b7 c3 c4 d3 d7 e2 e4 f8 g3 g6 g7 h2 h5",
      "w: a3 a4 a5 c9 e1 e3 e4 e5 g3 h3 b: a7 b7 c1 c2 c3 c4 c5 c6 c7 d7 e7 f7 g2 g7 h4 h5 h6 h7 h8 h9",
      "w: c2 c3 c4 c6 c8 d4 e4 e5 f4 f8 g3 g5 h2 h4 h6 b: b2 b3 b4 b6 b8 c5 c7 d2 d3 d7 f5 f6 g7 g8 h3",
      "w: b3 b4 b6 b9 c2 c7 d5 d6 e2 e7 g2 g7 g8 h4 h5 h7 b: a6 b2 b8 c3 c6 d2 e3 e4 e8 f5 g3 g4 h3 h8",
      "w: a2 a7 b5 c5 c6 d1 d5 e3 e7 f3 f4 g8 h2 h5 h8 i8 i9 b: a8 b1 b6 b8 c2 c9 d3 d9 e6 f7 f8 g1 g5 g7 h7 i1",
    ]),
  },
  {
    level: 8,
    rank: "3-5 dan",
    timeLimitMinutes: 50,
    levelUpBelow: 40,
    levelDownAbove: 80,
    problems: makeProblemsFromCompactText(8, [
      "w: b3 e4 6 8 b: b8 d6 g3 6",
      "w: b: a4 c7 d2 3 4 7 8 e3 5 7 f9 g4 5 h5 i1",
      "w: a2 b1 c4 6 8 9 e2 8 g4 h6 b: a4 9 b3 7 c5 d 4 7 e4 6 f3 g1 6 h4",
      "w: b2 3 6 c2 8 d5 8 f3 g8 h3 5 8 b: b4 7 c3 4 6 d2 3 7 e5 f7 g4 5 h4 7 i9",
      "w: b1 7 9 c4 5 d3 f4 6 8 g2 6 h3 4 8 9 b: b2 8 c2 8 d4 6 8 9 e5 7 f2 g3 h6 7 i2",
      "w: b2 3 c3 7 d2 4 e2 4 f5 6 g6 7 h5 7 8 i6 b: b4 c4 5 d3 6 8 e3 7 f2 3 7 8 g4 5 8 h2 4",
      "w: b3 5 6 c3 4 8 d6 7 e2 3 6 f3 4 g3 h2 3 i4 5 b: b2 4 c5 d2 3 4 8 e4 5 7 9 f5 6 7 8 g2 4 h4 5 i3",
      "w: a2 b2 3 c2 d2 e3 8 f2 3 4 5 6 g2 4 5 h6 7 8 b: a3 4 b4 7 c3 4 d37 e2 4 7 f8 g3 6 7 8 h2 3 4 5",
      "w: a3 4 5 8 b8 c8 9 d8 e1 2 3 4 5 8 9 g3 h3 i3 b: a7 b7 c1 2 3 4 5 6 7 d7 e7 f7 g2 7 h4 5 6 7 8 9",
      "w: c2 3 4 6 8 d4 e4 5 6 f4 7 8 g3 5 h2 4 6 7 8 b: b2 3 4 6 8 c5 7 d2 3 7 e7 f5 6 9 g6 7 8 9 h3",
      "w: a2 3 b3 4 5 6 9 c2 7 9 d4 5 6 7 8 e2 f3 g4 9 h2 5 b: a4 5 6 7 8 b1 2 7 8 c3 4 5 6 8 d2 9 e3 f5 h3 4 8",
      "w: a2 3 7 9 b2 5 c1 5 6 8 c1 5 6 8 d1 5 e1 3 7 f3 4 g2 4 8 h2 3 5 6 8 i7 8 9 b: a4 8 b1 3 6 8 c2 9 d2 3 6 8 9 e2 4 6 9 f7 8 g1 5 7 h1 4 7 9 i1 4 5",
    ]),
  },
  {
    level: 9,
    rank: "4-6 dan",
    timeLimitMinutes: 55,
    levelUpBelow: 40,
    levelDownAbove: 90,
    problems: makeDummyProblem(9),
  },
];

export const RANK_OPTIONS = [
  "30 kyu",
  "25 kyu",
  "20 kyu",
  "15 kyu",
  "10 kyu",
  "6 kyu",
  "3 kyu",
  "1 kyu",
  "1 dan",
  "2 dan",
  "3 dan",
  "4 dan",
  "5 dan",
];
