import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../firebase/authService";
import { getUserProfile } from "../../firebase/firestoreService";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginWithEmail({ email, password });
      const profile = await getUserProfile(user.uid);
      navigate(profile?.role === "tutor" ? "/tutor" : "/student");
    } catch {
      setError("Could not sign in. Check your credentials.");
    }
  };

  return (
    <AuthCard title="Sign in">
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button className="auth-btn" type="submit">Sign in</button>
      </form>
      <p className="mt-4 text-sm text-slate-300">No account? <Link to="/signup" className="text-cyan-300">Create one</Link></p>
    </AuthCard>
  );
}

function AuthCard({ title, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
