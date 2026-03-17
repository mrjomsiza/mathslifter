import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logOut, signInWithGoogle } from "../firebase/firebase";
import { createUser } from "../firebase/firestoreHelpers";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    try {
      if (user) {
        await logOut();
        navigate("/");
      } else {
        await signInWithGoogle();
        navigate("/choose-role");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link to="/" className="text-lg font-extrabold tracking-wide">
          MathsLift
        </Link>

        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing-calculator">Pricing</a>
        </nav>

        <div className="flex gap-3">
          <button
            className="rounded-full border border-white/15 bg-white/8 px-4 py-2 font-semibold text-white"
            onClick={handleAuthClick}
          >
            {user ? "Sign out" : "Sign in"}
          </button>

          <button
            className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 font-semibold text-white"
            onClick={async () => {
              try {
                if (!user) {
                  const result = await signInWithGoogle();
                  await createUser(result.user);
                }
                navigate("/choose-role");
              } catch (error) {
                console.error(error);
                alert("Could not continue with Google sign-in.");
              }
            }}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}