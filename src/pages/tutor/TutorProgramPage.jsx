import Card from "../../components/common/Card";
import { generateStudentProgram } from "../../services/ai/aiService";

export default function TutorProgramPage() {
  const mockResult = generateStudentProgram({
    grade: "11",
    subject: "Mathematics",
    tutorReport: "Student struggles with algebraic fractions.",
  });

  return (
    <Card title="AI Program Generation" subtitle="Server-side AI service contract scaffold.">
      <pre className="overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-cyan-200">
        {JSON.stringify(mockResult, null, 2)}
      </pre>
      <p className="mt-3 text-sm text-slate-300">TODO: Call secure Cloud Function endpoint.</p>
    </Card>
  );
}
