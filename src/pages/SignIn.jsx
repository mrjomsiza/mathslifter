import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInWithEmail, registerWithEmail } from "../firebase/firebase";
import {
  createParentAccount,
  createStudentAccount,
  createUser,
} from "../firebase/firestoreHelpers";

const ACCOUNT_TYPES = {
  parent: "Parent",
  student: "Student",
};

export default function SignIn() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [accountType, setAccountType] = useState("parent");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    parentEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const title = useMemo(() => {
    if (mode === "login") return "Sign in";
    return accountType === "parent" ? "Create parent account" : "Create student account";
  }, [mode, accountType]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      await createUser(result.user, { role: "parent" });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmail({ email: form.email, password: form.password });
        navigate("/dashboard");
        return;
      }

      const credential = await registerWithEmail({
        email: form.email,
        password: form.password,
        name: form.name,
      });

      if (accountType === "parent") {
        await createParentAccount(credential.user, {
          name: form.name,
        });
      } else {
        await createStudentAccount(credential.user, form.parentEmail, {
          name: form.name,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Authentication failed. Please verify your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/8 p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-black">{title}</h1>
          <button
            type="button"
            onClick={() => setMode((prev) => (prev === "login" ? "register" : "login"))}
            className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold"
          >
            {mode === "login" ? "Need an account?" : "Already registered?"}
          </button>
        </div>

        <p className="mt-3 text-slate-300">
          {mode === "login"
            ? "Use your email + password to sign in."
            : "Create an account for a parent or for a student linked to a parent email."}
        </p>

        {mode === "register" && (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {Object.entries(ACCOUNT_TYPES).map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setAccountType(value)}
                className={`rounded-2xl border px-4 py-3 font-semibold ${
                  accountType === value
                    ? "border-cyan-300/40 bg-cyan-300/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleEmailAuth}>
          {mode === "register" && (
            <div>
              <label className="mb-2 block text-sm font-semibold">Full name</label>
              <input
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value.toLowerCase())}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              minLength={6}
              required
            />
          </div>

          {mode === "register" && accountType === "student" && (
            <div>
              <label className="mb-2 block text-sm font-semibold">Parent email (required)</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                value={form.parentEmail}
                onChange={(e) => updateField("parentEmail", e.target.value.toLowerCase())}
                required
              />
            </div>
          )}

          {errorMessage && <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 font-semibold text-white disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-slate-400">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          className="w-full rounded-full border border-white/15 bg-white/8 px-6 py-3 font-semibold text-white"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Continue with Google (parent)
        </button>
      </div>
    </div>
  );
}
