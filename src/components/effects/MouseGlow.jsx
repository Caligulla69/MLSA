import { useMousePosition } from "../../hooks/useMousePosition";
import { motion } from "framer-motion";

export default function MouseGlow() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 102, 255, 0.06), transparent 40%)`,
      }}
    />
  );
}
