const FIRST_LEVEL_BY_RANK: Record<string, number> = {
  "30 kyu": 1,
  "25 kyu": 1,
  "20 kyu": 1,
  "15 kyu": 3,
  "10 kyu": 4,
  "6 kyu": 5,
  "3 kyu": 6,
  "1 kyu": 5,
  "1 dan": 6,
  "2 dan": 6,
  "3 dan": 7,
  "4 dan": 7,
  "5 dan": 8,
  "6+ dan": 10,
};

export function getRecommendedStartLevel(rank: string): number {
  const firstLevel = FIRST_LEVEL_BY_RANK[rank] ?? 1;
  return Math.max(1, firstLevel - 2);
}
