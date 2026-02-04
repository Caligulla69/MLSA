import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const variants = {
    primary: cn(
      "relative overflow-hidden",
      "bg-gradient-to-r from-brand-blue to-brand-cyan",
      "text-white font-medium",
      "before:absolute before:inset-0",
      "before:bg-gradient-to-r before:from-brand-cyan before:to-brand-blue",
      "before:opacity-0 before:transition-opacity before:duration-500",
      "hover:before:opacity-100",
      "shadow-[0_0_30px_rgba(0,102,255,0.3)]",
      "hover:shadow-[0_0_50px_rgba(0,102,255,0.5)]",
    ),
    secondary: cn(
      "bg-white/[0.03] border border-white/[0.1]",
      "text-white font-medium",
      "hover:bg-white/[0.08] hover:border-white/[0.2]",
    ),
    ghost: cn("text-white/60 hover:text-white", "hover:bg-white/[0.05]"),
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "transition-all duration-300",
        variants[variant],
        sizes[size],
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
