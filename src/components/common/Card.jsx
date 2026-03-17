export default function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      {subtitle && <p className="mt-1 text-sm text-slate-300">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
