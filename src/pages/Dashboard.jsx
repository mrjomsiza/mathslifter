import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logOut } from "../firebase/firebase";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = localStorage.getItem("selectedRole") || "unknown";

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/8 p-8 text-center backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>
        <p className="mt-3 text-slate-300">
          Signed in as: {user?.displayName || user?.email}
        </p>
        <p className="mt-2 text-slate-400">
          This is a starter dashboard scaffold. Next we can build the real dashboard.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            className="rounded-full border border-white/15 bg-white/8 px-6 py-3 font-semibold text-white"
            onClick={() => navigate("/")}
          >
            Go home
          </button>

          <button
            className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 font-semibold text-white"
            onClick={async () => {
              await logOut();
              localStorage.removeItem("selectedRole");
              navigate("/");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}