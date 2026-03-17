<<<<<<< codex/plan-next-steps-for-tutoring-app-development-8k74t5
export { default } from "../features/pricing/PricingCalculator";
=======
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { saveParentAndStudentRecords } from "../firebase/firestoreHelpers";

const ONLINE_RATE = 220;
const IN_PERSON_RATE = 250;

function getSessions(mark) {
  const numericMark = Number(mark);
  if (numericMark < 40) return 4;
  if (numericMark < 60) return 2;
  return 1;
}

function calculateStudentPricing(mark, mode) {
  const sessions = getSessions(mark);
  const rate = mode === "online" ? ONLINE_RATE : IN_PERSON_RATE;
  const total = sessions * rate;

  return { sessions, rate, total };
}

function generateStrongPassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

export default function PriceCalculator() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const parentEmail = user?.email || "pending@email.com";
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const [students, setStudents] = useState([
    {
      id: crypto.randomUUID(),
      name: "Student 1",
      email: "",
      mark: 55,
      mode: "online",
      password: generateStrongPassword(),
      paymentStatus: "pending",
    },
  ]);

  const handleStudentChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const addStudent = () => {
    setStudents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `Student ${prev.length + 1}`,
        email: "",
        mark: 55,
        mode: "online",
        password: generateStrongPassword(),
        paymentStatus: "pending",
      },
    ]);
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const calculatedStudents = useMemo(() => {
    return students.map((student) => {
      const pricing = calculateStudentPricing(student.mark, student.mode);
      return {
        ...student,
        ...pricing,
      };
    });
  }, [students]);

  const grandTotal = useMemo(() => {
    return calculatedStudents.reduce((sum, student) => sum + student.total, 0);
  }, [calculatedStudents]);

  const totalSessions = useMemo(() => {
    return calculatedStudents.reduce((sum, student) => sum + student.sessions, 0);
  }, [calculatedStudents]);

  const checkoutPayload = useMemo(() => {
    return {
      parentEmail,
      students: calculatedStudents.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        mark: Number(student.mark),
        sessions: student.sessions,
        rate: student.rate,
        total: student.total,
        mode: student.mode,
        password: student.password,
        parentEmail,
        paymentStatus: student.paymentStatus || "pending",
      })),

      totalStudents: calculatedStudents.length,
      totalSessions,
      amountDue: grandTotal,
      paymentStatus: "pending",
    };
  }, [calculatedStudents, totalSessions, grandTotal, parentEmail]);

  const handleSaveStudents = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const hasInvalidStudent = students.some(
      (student) => !student.name.trim() || !student.email.trim()
    );

    if (hasInvalidStudent) {
      setSaveStatus("Please add a name and email for each student.");
      return;
    }

    setIsProcessing(true);
    setSaveStatus("");

    try {
      const result = await saveParentAndStudentRecords(user, checkoutPayload);
      setSaveStatus(`Saved ${result.studentCount} student records successfully.`);
    } catch (error) {
      setSaveStatus(error.message || "Failed to save student records.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="pricing-calculator" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
      <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
        Monthly estimate
      </div>

      <h2 className="mb-3 text-3xl font-black md:text-5xl">
        Family tutoring price calculator
      </h2>

      <p className="max-w-3xl text-slate-300">
        Add each child, enter their previous year mark, and the calculator will estimate
        recommended monthly sessions and total cost.
      </p>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur-md shadow-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-2xl font-bold">Students</h3>

          <button
            onClick={addStudent}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 font-semibold text-white"
          >
            Add student
          </button>
        </div>

        <div className="space-y-6">
          {calculatedStudents.map((student, index) => (
            <div
              key={student.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-xl font-bold">Student {index + 1}</h4>

                {students.length > 1 && (
                  <button
                    onClick={() => removeStudent(student.id)}
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-200"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold">Student name</label>
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) =>
                      handleStudentChange(student.id, "name", e.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                    placeholder="Enter student name"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Student email</label>
                  <input
                    type="email"
                    value={student.email}
                    onChange={(e) =>
                      handleStudentChange(student.id, "email", e.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                    placeholder="Enter student email"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Previous year average (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={student.mark}
                    onChange={(e) =>
                      handleStudentChange(student.id, "mark", e.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Generated password</label>
                  <input
                    type="text"
                    value={student.password}
                    readOnly
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white/80 outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-3 block font-semibold">Session mode</label>

                <div className="flex flex-wrap gap-3">
                  <button
                    className={`rounded-2xl border px-4 py-3 font-semibold ${
                      student.mode === "online"
                        ? "border-cyan-300/40 bg-cyan-300/10"
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => handleStudentChange(student.id, "mode", "online")}
                  >
                    Online — R220/session
                  </button>

                  <button
                    className={`rounded-2xl border px-4 py-3 font-semibold ${
                      student.mode === "inPerson"
                        ? "border-cyan-300/40 bg-cyan-300/10"
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => handleStudentChange(student.id, "mode", "inPerson")}
                  >
                    In person — R250/session
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <span className="block text-sm text-slate-300">
                    Recommended sessions / month
                  </span>
                  <strong className="text-2xl font-black">{student.sessions}</strong>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <span className="block text-sm text-slate-300">Rate per session</span>
                  <strong className="text-2xl font-black">R{student.rate}</strong>
                </div>

                <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-indigo-500/15 to-cyan-400/10 p-4">
                  <span className="block text-sm text-slate-300">Student total</span>
                  <strong className="text-2xl font-black">R{student.total}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-indigo-500/20 to-cyan-400/15 p-6">
          <h3 className="text-2xl font-bold">Family total</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <span className="block text-sm text-slate-300">Number of students</span>
              <strong className="text-2xl font-black">{calculatedStudents.length}</strong>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <span className="block text-sm text-slate-300">Total sessions / month</span>
              <strong className="text-2xl font-black">{totalSessions}</strong>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <span className="block text-sm text-slate-300">Grand total / month</span>
              <strong className="text-3xl font-black">R{grandTotal}</strong>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveStudents}
            disabled={isProcessing}
            className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {isProcessing ? "Saving..." : "Save students"}
          </button>
        </div>

        {saveStatus && <p className="mt-4 text-sm text-slate-300">{saveStatus}</p>}

        <p className="mt-4 text-sm text-slate-400">
          Sign-in will be required before checkout if you are not already authenticated.
        </p>
      </div>
    </section>
  );
}
>>>>>>> main
