export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
