import { mockGenerateDailyExercises, mockGenerateProgram } from "./mockAiService";

// NOTE: Keep AI calls on server side in production.
// These client methods are temporary contracts for UI integration.

export function generateStudentProgram(input) {
  return mockGenerateProgram(input);
}

export function generateWeeklyTopicPlan(input) {
  return {
    weekNumber: input.weekNumber || 1,
    topic: "Generated topic placeholder",
    notes: "TODO: replace with secure server-side AI response",
  };
}

export function generateDailyExercises(input) {
  return mockGenerateDailyExercises(input);
}

export function markStudentSubmission() {
  return { status: "TODO", message: "Cloud Function endpoint pending" };
}

export function reviewPeerFeedback() {
  return { status: "TODO", message: "Peer feedback quality model pending" };
}

export function recommendNextExercises() {
  return { status: "TODO", message: "Adaptive recommendation endpoint pending" };
}
