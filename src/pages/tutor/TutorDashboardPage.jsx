import Card from "../../components/common/Card";

export default function TutorDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card title="Assigned students" subtitle="Manage student learning journeys.">12</Card>
      <Card title="Programs this week" subtitle="AI-generated weekly plans.">8</Card>
      <Card title="Submissions pending" subtitle="Awaiting tutor review.">14</Card>
      <Card title="Peer review quality" subtitle="Average quality score.">82%</Card>
    </div>
  );
}
