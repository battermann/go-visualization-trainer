import { LevelConfig, Problem } from "../types";

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
    problems: makeDummyProblem(6),
  },
  {
    level: 7,
    rank: "1-4 dan",
    timeLimitMinutes: 45,
    levelUpBelow: 35,
    levelDownAbove: 70,
    problems: makeDummyProblem(7),
  },
  {
    level: 8,
    rank: "3-5 dan",
    timeLimitMinutes: 50,
    levelUpBelow: 40,
    levelDownAbove: 80,
    problems: makeDummyProblem(8),
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
