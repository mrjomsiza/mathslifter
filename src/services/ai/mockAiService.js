export function mockGenerateProgram({ grade, subject, tutorReport }) {
  return {
    grade,
    subject,
    tutorReport,
    weeklyFocus: "Algebraic Fractions",
    model: "70/20/10",
    generatedAt: new Date().toISOString(),
  };
}

export function mockGenerateDailyExercises({ weekNumber = 1 }) {
  const exercisesPerDay = weekNumber === 1 ? 1 : weekNumber === 2 ? 2 : 3;
  return {
    weekNumber,
    exercisesPerDay,
    cap: 3,
  };
}
