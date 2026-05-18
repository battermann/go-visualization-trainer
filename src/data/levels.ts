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
    rank: "30-20 Kyu",
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
    rank: "20-11 Kyu",
    timeLimitMinutes: 15,
    levelUpBelow: 10,
    levelDownAbove: 20,
    problems: makeDummyProblem(2),
  },
  {
    level: 3,
    rank: "15-7 Kyu",
    timeLimitMinutes: 20,
    levelUpBelow: 15,
    levelDownAbove: 30,
    problems: makeDummyProblem(3),
  },
  {
    level: 4,
    rank: "10-3 Kyu",
    timeLimitMinutes: 25,
    levelUpBelow: 20,
    levelDownAbove: 40,
    problems: makeDummyProblem(4),
  },
  {
    level: 5,
    rank: "6-1 Kyu",
    timeLimitMinutes: 30,
    levelUpBelow: 25,
    levelDownAbove: 50,
    problems: makeDummyProblem(5),
  },
  {
    level: 6,
    rank: "3 Kyu - 2 Dan",
    timeLimitMinutes: 35,
    levelUpBelow: 30,
    levelDownAbove: 60,
    problems: makeDummyProblem(6),
  },
  {
    level: 7,
    rank: "1-4 Dan",
    timeLimitMinutes: 45,
    levelUpBelow: 35,
    levelDownAbove: 70,
    problems: makeDummyProblem(7),
  },
  {
    level: 8,
    rank: "3-5 Dan",
    timeLimitMinutes: 50,
    levelUpBelow: 40,
    levelDownAbove: 80,
    problems: makeDummyProblem(8),
  },
  {
    level: 9,
    rank: "4-6 Dan",
    timeLimitMinutes: 55,
    levelUpBelow: 40,
    levelDownAbove: 90,
    problems: makeDummyProblem(9),
  },
  {
    level: 10,
    rank: "6+ Dan",
    timeLimitMinutes: 60,
    levelUpBelow: 0,
    levelDownAbove: 100,
    problems: makeDummyProblem(10),
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
  "6+ dan",
];
