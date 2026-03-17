import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/firebase";
import { createUser } from "../firebase/firestoreHelpers";

export default function SignIn() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      await createUser(result.user);
      navigate("/choose-role");
    } catch (error) {
      console.error(error);
      alert("Google sign-in failed.");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/8 p-8 text-center backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black">Sign in</h1>
        <p className="mt-3 text-slate-300">
          Use Google to continue as a tutor, student, or parent.
        </p>
        <button
          className="mt-6 w-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 font-semibold text-white"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}