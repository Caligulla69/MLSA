import { cn } from "../../lib/utils";

export default function GradientText({ children, className }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple",
        "bg-300% animate-gradient-x",
        className,
      )}
    >
      {children}
    </span>
  );
}
