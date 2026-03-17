import { useNavigate } from "react-router-dom";

const roles = ["Tutor", "Student", "Parent"];

export default function ChooseRole() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("selectedRole", role.toLowerCase());
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/8 p-8 text-center backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black">Select your role</h1>
        <p className="mt-3 text-slate-300">
          We’ll save this properly in Firestore next.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <button
              key={role}
              className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 font-bold transition hover:-translate-y-0.5 hover:bg-white/10"
              onClick={() => handleRoleSelect(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}