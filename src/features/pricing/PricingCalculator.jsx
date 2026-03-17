import { useMemo, useState } from "react";
import { calculatePricing } from "./pricingModel";
import PrimaryButton from "../../components/common/PrimaryButton";

export default function PricingCalculator({ onSelectPlan }) {
  const [mark, setMark] = useState(55);
  const [mode, setMode] = useState("online");

  const result = useMemo(() => calculatePricing({ mark, mode }), [mark, mode]);

  const planPayload = {
    mark: Number(mark),
    mode,
    sessionsPerMonth: result.sessions,
    ratePerSession: result.rate,
    amountDue: result.totalMonthlyAmount,
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <h3 className="text-xl font-semibold text-white">Student Plan Calculator</h3>
      <p className="mt-2 text-sm text-slate-300">
        We recommend sessions from your previous year mark using the 0-39, 40-59, 60+ rules.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Previous year mark (%)
          <input
            type="number"
            min="0"
            max="100"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-white"
          />
        </label>

        <div>
          <p className="mb-1 text-sm text-slate-300">Session mode</p>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("online")}
              className={`rounded-lg px-3 py-2 text-sm ${
                mode === "online" ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-white"
              }`}
            >
              Online (R220)
            </button>
            <button
              onClick={() => setMode("inPerson")}
              className={`rounded-lg px-3 py-2 text-sm ${
                mode === "inPerson" ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-white"
              }`}
            >
              In person (R250)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Stat title="Sessions / month" value={result.sessions} />
        <Stat title="Rate / session" value={`R${result.rate}`} />
        <Stat title="Monthly total" value={`R${result.totalMonthlyAmount}`} />
      </div>

      {onSelectPlan && (
        <PrimaryButton onClick={() => onSelectPlan(planPayload)} className="mt-5">
          Choose this plan
        </PrimaryButton>
      )}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/70 p-3">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
