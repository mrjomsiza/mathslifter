import { Link } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-white">MathsLifter</Link>
        <div className="flex gap-2">
          <Link to="/signin" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white">Sign in</Link>
          <Link to="/signup"><PrimaryButton>Get started</PrimaryButton></Link>
        </div>
      </div>
    </header>
  );
}
