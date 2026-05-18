import { LevelConfig, Problem } from "../types";

const level1Problems: Problem[] = [
  {
    id: "level-1-problem-1",
    boardSize: 9,
    stones: [
      { x: 6, y: 1, color: "black" },
      { x: 1, y: 8, color: "white" },
    ],
  },
  {
    id: "level-1-problem-2",
    boardSize: 9,
    stones: [
      { x: 3, y: 2, color: "black" },
      { x: 1, y: 7, color: "black" },
      { x: 6, y: 0, color: "white" },
    ],
  },
  {
    id: "level-1-problem-3",
    boardSize: 9,
    stones: [
      { x: 4, y: 4, color: "black" },
      { x: 1, y: 8, color: "white" },
      { x: 2, y: 8, color: "black" },
    ],
  },
];

function shiftProblems(seed: number): Problem[] {
  return level1Problems.map((problem, idx) => ({
    ...problem,
    id: `level-${seed}-problem-${idx + 1}`,
    stones: problem.stones.map((stone, stoneIndex) => ({
      ...stone,
      x: (stone.x + seed + stoneIndex) % 9,
      y: (stone.y + seed + idx) % 9,
      color:
        (seed + stoneIndex) % 2 === 0
          ? stone.color
          : stone.color === "black"
            ? "white"
            : "black",
    })),
  }));
}

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    rank: "30-20 Kyu",
    timeLimitMinutes: 10,
    levelUpBelow: 5,
    levelDownAbove: null,
    problems: level1Problems,
  },
  {
    level: 2,
    rank: "20-11 Kyu",
    timeLimitMinutes: 15,
    levelUpBelow: 10,
    levelDownAbove: 20,
    problems: shiftProblems(2),
  },
  {
    level: 3,
    rank: "15-7 Kyu",
    timeLimitMinutes: 20,
    levelUpBelow: 15,
    levelDownAbove: 30,
    problems: shiftProblems(3),
  },
  {
    level: 4,
    rank: "10-3 Kyu",
    timeLimitMinutes: 25,
    levelUpBelow: 20,
    levelDownAbove: 40,
    problems: shiftProblems(4),
  },
  {
    level: 5,
    rank: "6-1 Kyu",
    timeLimitMinutes: 30,
    levelUpBelow: 25,
    levelDownAbove: 50,
    problems: shiftProblems(5),
  },
  {
    level: 6,
    rank: "3 Kyu - 2 Dan",
    timeLimitMinutes: 35,
    levelUpBelow: 30,
    levelDownAbove: 60,
    problems: shiftProblems(6),
  },
  {
    level: 7,
    rank: "1-4 Dan",
    timeLimitMinutes: 45,
    levelUpBelow: 35,
    levelDownAbove: 70,
    problems: shiftProblems(7),
  },
  {
    level: 8,
    rank: "3-5 Dan",
    timeLimitMinutes: 50,
    levelUpBelow: 40,
    levelDownAbove: 80,
    problems: shiftProblems(8),
  },
  {
    level: 9,
    rank: "4-6 Dan",
    timeLimitMinutes: 55,
    levelUpBelow: 40,
    levelDownAbove: 90,
    problems: shiftProblems(9),
  },
  {
    level: 10,
    rank: "6+ Dan",
    timeLimitMinutes: 60,
    levelUpBelow: 0,
    levelDownAbove: 100,
    problems: shiftProblems(10),
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
