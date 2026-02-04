import { cn } from "../../lib/utils";

export default function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-white/[0.05] text-white/70 border-white/[0.1]",
    primary: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    success: "bg-green-500/10 text-green-400 border-green-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5",
        "text-xs font-medium rounded-full border",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
