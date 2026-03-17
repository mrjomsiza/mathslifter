import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { logoutUser } from "../../firebase/authService";
import PrimaryButton from "../common/PrimaryButton";

const tutorNav = [
  { to: "/tutor", label: "Overview" },
  { to: "/tutor/students", label: "Students" },
  { to: "/tutor/programs", label: "Program AI" },
  { to: "/progress", label: "Progress" },
];

const studentNav = [
  { to: "/student", label: "Overview" },
  { to: "/student/weekly-plan", label: "Weekly Plan" },
  { to: "/student/exercises", label: "Exercises" },
  { to: "/student/submissions", label: "Submissions" },
  { to: "/student/peer-review", label: "Peer Review" },
];

export default function AppShell({ title, children }) {
  const { userProfile } = useAuth();
  const nav = userProfile?.role === "tutor" ? tutorNav : studentNav;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-300">MathsLifter</p>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <PrimaryButton onClick={logoutUser}>Sign out</PrimaryButton>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Navigation</p>
          <nav className="space-y-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/settings" className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
              Settings
            </Link>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
