import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PriceCalculator from "../components/PriceCalculator";
import Footer from "../components/Footer";
import { signInWithGoogle } from "../firebase/firebase";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    try {
      await signInWithGoogle();
      navigate("/choose-role");
    } catch (error) {
      console.error(error);
      alert("Could not sign in with Google.");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-slate-50">
      <Navbar />

      <section className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
              For tutors, students, and parents
            </div>

            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              A smarter tutoring platform built around the{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                70 / 20 / 10
              </span>{" "}
              learning model
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              We teach a focused topic, guide students through weekly practice,
              and build real understanding through peer feedback and measurable progress.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={handleGetStarted}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-[0_14px_30px_rgba(34,211,238,0.25)] transition hover:-translate-y-0.5"
              >
                Get started
              </button>

              <button
                onClick={() => navigate("/signin")}
                className="rounded-full border border-white/15 bg-white/8 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/12"
              >
                Sign in
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-md shadow-2xl">
                <strong className="block text-2xl font-black">70%</strong>
                <span className="text-sm text-slate-300">Exercises & active practice</span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-md shadow-2xl">
                <strong className="block text-2xl font-black">20%</strong>
                <span className="text-sm text-slate-300">Peer feedback & social learning</span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-md shadow-2xl">
                <strong className="block text-2xl font-black">10%</strong>
                <span className="text-sm text-slate-300">Tutor teaching & weekly guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
          How we apply it
        </div>

        <h2 className="mb-4 text-3xl font-black leading-tight md:text-5xl">
          How the 70 / 20 / 10 model works in this tutoring program
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur-md shadow-2xl">
            <h3 className="mb-3 text-xl font-bold">70% — Practice first</h3>
            <p className="text-slate-300">
              Students spend most of their time solving carefully selected exercises
              that build from foundational topics toward harder problem areas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur-md shadow-2xl">
            <h3 className="mb-3 text-xl font-bold">20% — Peer learning</h3>
            <p className="text-slate-300">
              Students review and mark peer work, which helps them think critically,
              spot mistakes, and strengthen their own understanding.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur-md shadow-2xl">
            <h3 className="mb-3 text-xl font-bold">10% — Focused teaching</h3>
            <p className="text-slate-300">
              Each week begins with guided tutor instruction on the key topic,
              followed by structured exercises and follow-up support.
            </p>
          </div>
        </div>
      </section>

      <PriceCalculator />
      <Footer />
    </div>
  );
}