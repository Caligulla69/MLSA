// HeroPremium.jsx - Enhanced premium hero with 3D effects
import { useRef, useEffect, useCallback, memo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowRight,
  FaPlay,
  FaCrown,
  FaCheck,
  FaGlobe,
  FaAward,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { HiOutlineSparkles, HiArrowDown } from "react-icons/hi";
import { RiMicrosoftFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

// Brand Colors
const colors = {
  accent: "#0A5FA8",
  main: "#16253B",
  light: "#3F5F8C",
  pale: "#E6EEF6",
  cream: "#FBFAF8",
  ivory: "#EEECE6",
};

export default function HeroPremium() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const heroTextRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Timeline for orchestrated animations
      const tl = gsap.timeline({ delay: 0.5 });

      // Masthead badge animation
      tl.from(".masthead-badge", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Character-by-character text reveal
      const chars = heroTextRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        tl.from(
          chars,
          {
            opacity: 0,
            y: 80,
            rotateX: -90,
            stagger: 0.025,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.4",
        );
      }

      // Subtitle animation
      tl.from(
        ".hero-subtitle",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );

      // CTA buttons animation
      tl.from(
        ".hero-cta",
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // Decorative lines animation
      tl.from(
        ".deco-line",
        {
          scaleX: 0,
          duration: 1.2,
          ease: "power4.inOut",
          stagger: 0.1,
        },
        "-=0.6",
      );

      // Bento grid cards animation
      const bentoItems = gridRef.current?.querySelectorAll(".bento-item");
      if (bentoItems && bentoItems.length > 0) {
        tl.from(
          bentoItems,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8",
        );
      }

      // Scroll indicator animation
      tl.from(
        ".scroll-indicator",
        {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // Continuous floating animation for decorative elements
      gsap.to(".float-element", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Parallax scroll effect on decorative lines
      gsap.to(".parallax-line", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Quote section parallax
      gsap.from(".quote-section", {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: ".quote-section",
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: colors.cream }}
    >
      {/* Elegant Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Vertical Lines */}
      <div
        className="absolute top-0 left-[20%] w-px h-full opacity-40 deco-line origin-top parallax-line"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}15, transparent)`,
        }}
      />
      <div
        className="absolute top-0 right-[20%] w-px h-full opacity-40 deco-line origin-top parallax-line"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}15, transparent)`,
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-20 deco-line origin-top"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}10, transparent)`,
        }}
      />

      {/* Floating Geometric Elements */}
      <div className="absolute top-40 right-[10%] w-40 h-40 opacity-[0.04] float-element hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div
        className="absolute bottom-60 left-[8%] w-32 h-32 opacity-[0.04] float-element hidden lg:block"
        style={{ animationDelay: "1s" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
            transform="rotate(15 50 50)"
          />
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
            transform="rotate(15 50 50)"
          />
        </svg>
      </div>

      {/* Gradient Orb */}
      <div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.pale} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Masthead */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          {/* Badge */}
          <div className="masthead-badge inline-flex items-center gap-4 mb-8 sm:mb-10">
            <div
              className="w-12 sm:w-16 h-px deco-line origin-right"
              style={{ background: colors.main }}
            />
            <span
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium flex items-center gap-2"
              style={{ color: colors.light }}
            >
              <FaStar className="text-amber-400 text-[8px]" />
              Established 2020
              <FaStar className="text-amber-400 text-[8px]" />
            </span>
            <div
              className="w-12 sm:w-16 h-px deco-line origin-left"
              style={{ background: colors.main }}
            />
          </div>

          {/* Main Heading with Character Animation */}
          <div ref={heroTextRef} className="overflow-hidden mb-6 sm:mb-8">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[1] tracking-tight"
              style={{ color: colors.main }}
            >
              {"The Inner Circle".split("").map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12"
            style={{ color: colors.light }}
          >
            A curated collective of exceptional student technologists,
            <span className="font-normal" style={{ color: colors.main }}>
              {" "}
              united under the Microsoft standard of excellence.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <MagneticButton
              className="hero-cta group inline-flex items-center gap-3 px-8 sm:px-10 py-4 text-white font-medium tracking-wider text-sm transition-all"
              style={{ background: colors.main }}
            >
              <span className="relative z-10">REQUEST MEMBERSHIP</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>

            <MagneticButton
              className="hero-cta group inline-flex items-center gap-3 px-8 sm:px-10 py-4 border font-medium tracking-wider text-sm transition-all hover:bg-opacity-5"
              style={{ borderColor: `${colors.main}30`, color: colors.main }}
            >
              <FaPlay className="text-xs" style={{ color: colors.accent }} />
              OUR STORY
            </MagneticButton>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 auto-rows-[100px] sm:auto-rows-[120px] lg:auto-rows-[130px]"
        >
          {/* The Standard Card - Main Feature */}
          <PremiumCard
            className="col-span-4 sm:col-span-8 lg:col-span-6 row-span-3 p-6 sm:p-8 lg:p-10"
            style={{ background: colors.main }}
            enableTilt
          >
            <div className="h-full flex flex-col justify-between relative">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M100 0 L100 100 L0 100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M100 25 L100 100 L25 100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-full border flex items-center justify-center"
                    style={{ borderColor: `${colors.accent}50` }}
                  >
                    <FaCrown className="text-amber-400" />
                  </div>
                  <div
                    className="h-px flex-1"
                    style={{ background: `rgba(255,255,255,0.15)` }}
                  />
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: `${colors.accent}80` }}
                  >
                    Elite
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  The Standard
                </h2>
                <p
                  className="leading-relaxed text-sm sm:text-base"
                  style={{ color: `rgba(255,255,255,0.6)` }}
                >
                  Every member represents the pinnacle of student achievement.
                  Selected through rigorous evaluation, our ambassadors embody
                  technical excellence and visionary leadership.
                </p>
              </div>

              <div
                className="grid grid-cols-3 gap-4 pt-6 border-t"
                style={{ borderColor: `rgba(255,255,255,0.1)` }}
              >
                <StatItem value="3%" label="Accept Rate" />
                <StatItem value="100+" label="Countries" center />
                <StatItem value="100K" label="Members" />
              </div>
            </div>
          </PremiumCard>

          {/* Microsoft Partnership */}
          <PremiumCard
            className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6"
            style={{ background: "white", borderColor: `${colors.main}10` }}
            enableTilt
          >
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: colors.pale }}
              >
                <RiMicrosoftFill
                  className="text-2xl"
                  style={{ color: colors.main }}
                />
              </div>
              <p className="font-medium text-sm" style={{ color: colors.main }}>
                Microsoft
              </p>
              <p
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: colors.light }}
              >
                Official Partner
              </p>
            </div>
          </PremiumCard>

          {/* Recognition Card */}
          <PremiumCard
            className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6"
            style={{
              background: colors.ivory,
              borderColor: `${colors.main}08`,
            }}
            enableTilt
          >
            <div className="h-full flex flex-col justify-between">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: colors.pale }}
              >
                <FaAward className="text-lg" style={{ color: colors.accent }} />
              </div>
              <div>
                <p
                  className="text-xl sm:text-2xl font-light"
                  style={{ color: colors.main }}
                >
                  Global
                </p>
                <p
                  className="text-xs tracking-wider"
                  style={{ color: colors.light }}
                >
                  Recognition & Prestige
                </p>
              </div>
            </div>
          </PremiumCard>

          {/* Member Privileges */}
          <PremiumCard
            className="col-span-4 sm:col-span-4 lg:col-span-6 row-span-2 p-5 sm:p-6"
            style={{ background: "white", borderColor: `${colors.main}10` }}
            enableTilt
          >
            <div className="flex items-center gap-3 mb-5">
              <HiOutlineSparkles style={{ color: colors.accent }} />
              <p
                className="text-xs tracking-[0.2em] uppercase font-medium"
                style={{ color: colors.light }}
              >
                Member Privileges
              </p>
              <div
                className="h-px flex-1"
                style={{ background: `${colors.main}10` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Azure Credits — $150/mo",
                "GitHub Enterprise",
                "Microsoft Certifications",
                "Executive Network",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded transition-colors hover:bg-opacity-50"
                  style={{ background: `${colors.pale}50` }}
                >
                  <FaCheck
                    className="text-[10px]"
                    style={{ color: colors.accent }}
                  />
                  <span
                    className="text-xs sm:text-sm"
                    style={{ color: colors.main }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </PremiumCard>

          {/* Apply CTA Banner */}
          <PremiumCard
            className="col-span-4 sm:col-span-8 lg:col-span-6 row-span-1 p-5 sm:p-6"
            style={{
              background: `linear-gradient(135deg, ${colors.pale} 0%, #FEF3C720 100%)`,
              borderColor: `${colors.accent}20`,
            }}
          >
            <div className="h-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: "#10B981" }}
                />
                <div>
                  <p
                    className="font-medium text-sm sm:text-base"
                    style={{ color: colors.main }}
                  >
                    Applications for 2025
                  </p>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: colors.light }}
                  >
                    Limited positions • Highly selective
                  </p>
                </div>
              </div>
              <button
                className="hidden sm:flex px-6 py-2.5 text-xs font-medium tracking-wider text-white transition-all hover:opacity-90"
                style={{ background: colors.main }}
              >
                APPLY
              </button>
            </div>
          </PremiumCard>

          {/* Next Event */}
          <PremiumCard
            className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6"
            style={{ background: "white", borderColor: `${colors.main}10` }}
            enableTilt
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: colors.light }}
                >
                  Next Event
                </p>
                <p
                  className="text-lg font-medium"
                  style={{ color: colors.main }}
                >
                  Annual Gala
                </p>
                <p className="text-sm mt-1" style={{ color: colors.light }}>
                  March 2025 — Seattle
                </p>
              </div>
              <span
                className="inline-block px-3 py-1 text-xs font-medium tracking-wider w-fit"
                style={{
                  background: `${colors.accent}10`,
                  color: colors.accent,
                }}
              >
                MEMBERS ONLY
              </span>
            </div>
          </PremiumCard>

          {/* Network Access */}
          <PremiumCard
            className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6 group cursor-pointer"
            style={{
              background: colors.ivory,
              borderColor: `${colors.main}08`,
            }}
            enableTilt
          >
            <div className="h-full flex flex-col justify-between">
              <div
                className="w-10 h-10 flex items-center justify-center transition-colors"
                style={{ background: colors.pale }}
              >
                <FaGlobe
                  className="text-lg transition-colors"
                  style={{ color: colors.light }}
                />
              </div>
              <div>
                <p
                  className="text-xl font-light"
                  style={{ color: colors.main }}
                >
                  Lifetime
                </p>
                <p
                  className="text-xs tracking-wider"
                  style={{ color: colors.light }}
                >
                  Network Access
                </p>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator flex flex-col items-center mt-16 sm:mt-20">
          <span
            className="text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ color: colors.light }}
          >
            Scroll to explore
          </span>
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
            style={{ borderColor: `${colors.main}20` }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ background: colors.accent }}
            />
          </div>
        </div>

        {/* Quote Section */}
        <div className="quote-section mt-24 sm:mt-32 text-center">
          <blockquote
            className="text-xl sm:text-2xl lg:text-3xl font-extralight italic max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.light }}
          >
            "Excellence is not a destination, but a continuous journey of
            growth, innovation, and meaningful impact."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-10 h-px" style={{ background: colors.main }} />
            <span
              className="text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: colors.main }}
            >
              The Ambassador Creed
            </span>
            <div className="w-10 h-px" style={{ background: colors.main }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Stat Item Component
const StatItem = memo(function StatItem({ value, label, center = false }) {
  return (
    <div className={`text-center ${center ? "border-x border-white/10" : ""}`}>
      <p className="text-2xl sm:text-3xl font-light text-white">{value}</p>
      <p
        className="text-[10px] tracking-wider uppercase mt-1"
        style={{ color: `rgba(255,255,255,0.5)` }}
      >
        {label}
      </p>
    </div>
  );
});

// Premium Card with 3D Tilt Effect
const PremiumCard = memo(function PremiumCard({
  children,
  className = "",
  style = {},
  enableTilt = false,
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableTilt || !cardRef.current || window.innerWidth < 1024) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        y: -5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Glare effect
      if (glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        gsap.to(glareRef.current, {
          opacity: 0.08,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
          duration: 0.3,
        });
      }
    },
    [enableTilt],
  );

  const handleMouseLeave = useCallback(() => {
    if (!enableTilt || !cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      duration: 0.5,
      ease: "power3.out",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [enableTilt]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bento-item relative border overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* Glare overlay */}
      {enableTilt && (
        <div
          ref={glareRef}
          className="absolute inset-0 opacity-0 pointer-events-none z-10"
          style={{ mixBlendMode: "overlay" }}
        />
      )}
      {children}
    </div>
  );
});

// Magnetic Button Component
const MagneticButton = memo(function MagneticButton({
  children,
  className = "",
  style = {},
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || window.innerWidth < 768) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
});
