export default function SectionTitle({ badge, title, subtitle }) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
          {badge}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-300">{subtitle}</p>}
    </div>
  );
}
