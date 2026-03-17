import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle } from "../firebase/firebase";
import { createUser } from "../firebase/firestoreHelpers";

export default function Footer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/10 bg-white/5">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-8 md:flex-row md:px-6 lg:px-8">
        <div>
          <h3 className="text-lg font-bold">MathsLift</h3>
          <p className="mt-2 max-w-md text-slate-300">
            Helping students learn through practice, peer learning, and focused teaching.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-slate-300">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing-calculator">Pricing</a>
          <a 
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
            {user ? "" : "Sing In"}
          </a>
        </div>
      </div>
    </footer>
  );
}