export const ONLINE_RATE = 220;
export const IN_PERSON_RATE = 250;

export function getRecommendedSessions(mark) {
  const score = Number(mark);
  if (score <= 39) return 4;
  if (score <= 59) return 2;
  return 1;
}

export function calculatePricing({ mark, mode }) {
  const sessions = getRecommendedSessions(mark);
  const rate = mode === "inPerson" ? IN_PERSON_RATE : ONLINE_RATE;
  return {
    sessions,
    rate,
    totalMonthlyAmount: sessions * rate,
  };
}
