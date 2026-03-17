import Card from "../../components/common/Card";

const MOCK_STUDENTS = [
  { id: "std-1", name: "Lerato M", grade: "11", subject: "Maths" },
  { id: "std-2", name: "Sipho K", grade: "10", subject: "Maths Lit" },
];

export default function TutorStudentsPage() {
  return (
    <div className="space-y-3">
      {MOCK_STUDENTS.map((student) => (
        <Card key={student.id} title={student.name} subtitle={`Grade ${student.grade} · ${student.subject}`}>
          <p className="text-sm text-slate-300">TODO: Wire to Firestore assignments + student detail route.</p>
        </Card>
      ))}
    </div>
  );
}
