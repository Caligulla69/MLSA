import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedCounter({ value, suffix = "" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const numericValue = parseInt(value.replace(/\D/g, ""));

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2000,
  });

  const display = useTransform(
    spring,
    (val) => Math.floor(val).toLocaleString() + suffix,
  );

  useEffect(() => {
    if (inView && !hasAnimated) {
      spring.set(numericValue);
      setHasAnimated(true);
    }
  }, [inView, numericValue, spring, hasAnimated]);

  return (
    <motion.span ref={ref}>{hasAnimated ? display : "0" + suffix}</motion.span>
  );
}
