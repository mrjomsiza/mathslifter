import Card from "../../components/common/Card";

export default function StudentDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card title="Current weekly topic" subtitle="Formal learning (10%).">Quadratic Functions</Card>
      <Card title="Today’s exercises" subtitle="Experiential learning (70%).">2 tasks</Card>
      <Card title="Peer review tasks" subtitle="Social learning (20%).">1 pending</Card>
      <Card title="Progress trend" subtitle="Based on AI + peer feedback.">+8%</Card>
    </div>
  );
}
