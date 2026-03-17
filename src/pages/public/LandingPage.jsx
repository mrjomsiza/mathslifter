import { useNavigate } from "react-router-dom";
import PublicHeader from "../../components/layout/PublicHeader";
import SectionTitle from "../../components/common/SectionTitle";
import Card from "../../components/common/Card";
import PricingCalculator from "../../features/pricing/PricingCalculator";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PublicHeader />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <SectionTitle
            badge="Tutor + Student Platform"
            title="Master maths with the 70/20/10 learning system"
            subtitle="10% tutor guidance, 70% active exercises, 20% peer feedback. AI helps generate plans, exercises, and progress insights."
          />
          <div className="flex gap-3">
            <button onClick={() => navigate("/signup")} className="rounded-full bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950">
              Get started
            </button>
            <button onClick={() => navigate("/signin")} className="rounded-full border border-white/20 px-5 py-2.5 font-semibold">
              Sign in
            </button>
          </div>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-md rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-indigo-600/30 via-slate-900 to-cyan-500/30 p-6">
          <p className="text-xs uppercase tracking-widest text-cyan-300">3D hero placeholder</p>
          <p className="mt-3 text-slate-200">
            Clean placeholder container ready for Three.js/react-three-fiber scene.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-white/10" />
            <div className="h-14 rounded-xl bg-white/10" />
            <div className="h-14 rounded-xl bg-white/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionTitle badge="How it works" title="Productized 70 / 20 / 10 model" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="10% Formal" subtitle="Tutor introduces weekly focus topic and strategy." />
          <Card title="70% Experiential" subtitle="Daily problem solving with adaptive exercise load." />
          <Card title="20% Social" subtitle="Peer marking and feedback quality tracking." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionTitle badge="Pricing" title="Student self-service plan selection" />
        <PricingCalculator />
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
        MathsLifter · Tutor & Student Learning Platform
      </footer>
    </div>
  );
}
