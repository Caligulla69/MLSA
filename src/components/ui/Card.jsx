import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function Card({
  children,
  className,
  hover = true,
  glow = false,
  tilt = true,
  ...props
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-white/[0.05] to-white/[0.02]",
        "border border-white/[0.08]",
        "backdrop-blur-xl",
        hover && "transition-all duration-500",
        hover && "hover:border-white/[0.15] hover:shadow-2xl",
        glow && "hover:shadow-[0_0_60px_rgba(0,102,255,0.15)]",
        className,
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-purple/10 pointer-events-none" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      </div>

      {children}
    </motion.div>
  );
}
