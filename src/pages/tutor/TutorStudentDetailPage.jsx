import Card from "../../components/common/Card";

export default function TutorStudentDetailPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Student profile" subtitle="Grade, subjects, tutor notes and plan status.">
        <p className="text-sm text-slate-300">TODO: Load actual student profile and report data.</p>
      </Card>
      <Card title="Uploads" subtitle="Past papers and student document uploads.">
        <p className="text-sm text-slate-300">TODO: Integrate Firebase Storage upload UI.</p>
      </Card>
    </div>
  );
}
