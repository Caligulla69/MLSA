import { motion } from "framer-motion";

const shapes = [
  { size: 60, x: "10%", y: "20%", delay: 0, duration: 20 },
  { size: 40, x: "80%", y: "15%", delay: 2, duration: 25 },
  { size: 80, x: "70%", y: "60%", delay: 4, duration: 22 },
  { size: 50, x: "20%", y: "70%", delay: 1, duration: 28 },
  { size: 35, x: "90%", y: "80%", delay: 3, duration: 24 },
  { size: 45, x: "5%", y: "50%", delay: 5, duration: 26 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
