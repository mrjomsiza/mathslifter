import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../../firebase/authService";
import {
  createOrMergeUserProfile,
  saveStudentPlanSelection,
} from "../../firebase/firestoreService";
import PricingCalculator from "../../features/pricing/PricingCalculator";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (role === "student" && !selectedPlan) {
      setError("Students must choose a plan before creating an account.");
      return;
    }

    try {
      const user = await registerWithEmail({ name, email, password });

      await createOrMergeUserProfile(user, {
        role,
        name,
        grade,
        subjects: [subject],
        plan: role === "student" ? selectedPlan : null,
      });

      if (role === "student") {
        await saveStudentPlanSelection(user.uid, selectedPlan);
      }

      navigate(role === "tutor" ? "/tutor" : "/student");
    } catch {
      setError("Could not create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 py-8 md:grid-cols-2">
        <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="mt-1 text-sm text-slate-300">Tutor and student accounts only.</p>

          <div className="mt-4 space-y-3">
            <input className="auth-input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>

            <input className="auth-input" placeholder="Grade (e.g. 11)" value={grade} onChange={(e) => setGrade(e.target.value)} />
            <input className="auth-input" placeholder="Main subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          <button className="auth-btn mt-4 w-full" type="submit">Create account</button>
        </form>

        <div>
          <h2 className="mb-3 text-xl font-semibold">Student plan selection</h2>
          <PricingCalculator onSelectPlan={setSelectedPlan} />
          {selectedPlan && (
            <p className="mt-3 text-sm text-cyan-200">
              Selected: {selectedPlan.sessionsPerMonth} sessions/month · R{selectedPlan.amountDue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
