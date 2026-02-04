// HeroPremium.jsx - Enhanced premium hero with 3D effects (Optimized)
import { useRef, useEffect, useCallback, memo, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowRight,
  FaPlay,
  FaCrown,
  FaCheck,
  FaGlobe,
  FaAward,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  HiOutlineSparkles,
  HiCalendarDays,
  HiUserGroup,
} from "react-icons/hi2";
import { RiMicrosoftFill } from "react-icons/ri";

// Register plugin once at module level
gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONSTANTS - Frozen for immutability
// ============================================

const COLORS = Object.freeze({
  accent: "#0A5FA8",
  main: "#16253B",
  light: "#3F5F8C",
  pale: "#E6EEF6",
  cream: "#FBFAF8",
  ivory: "#EEECE6",
});

// Pre-computed derived colors (opacity variants only)
const DERIVED = Object.freeze({
  main05: `${COLORS.main}0D`,
  main08: `${COLORS.main}14`,
  main10: `${COLORS.main}1A`,
  main15: `${COLORS.main}26`,
  main20: `${COLORS.main}33`,
  main30: `${COLORS.main}4D`,
  main50: `${COLORS.main}80`,
  accent10: `${COLORS.accent}1A`,
  accent20: `${COLORS.accent}33`,
  accent50: `${COLORS.accent}80`,
  accent80: `${COLORS.accent}CC`,
  light50: `${COLORS.light}80`,
  pale50: `${COLORS.pale}80`,
  white10: "rgba(255,255,255,0.1)",
  white15: "rgba(255,255,255,0.15)",
  white50: "rgba(255,255,255,0.5)",
  white60: "rgba(255,255,255,0.6)",
});

// Static style objects
const STYLES = Object.freeze({
  section: { background: COLORS.cream },
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  mainBg: { background: COLORS.main },
  paleBg: { background: COLORS.pale },
  ivoryBg: { background: COLORS.ivory },
  whiteBg: { background: "white" },
});

// Hero title text
const HERO_TITLE = "The Inner Circle";

// Stats data
const HERO_STATS = Object.freeze([
  { id: "rate", value: "3%", label: "Accept Rate" },
  { id: "countries", value: "100+", label: "Countries", center: true },
  { id: "members", value: "100K", label: "Members" },
]);

// Member privileges
const PRIVILEGES = Object.freeze([
  "Azure Credits — $150/mo",
  "GitHub Enterprise",
  "Microsoft Certifications",
  "Executive Network",
]);

// Noise texture SVG
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ============================================
// CUSTOM HOOKS
// ============================================

function useHeroAnimations(containerRef, heroTextRef, gridRef, mounted) {
  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Timeline for orchestrated animations
      const tl = gsap.timeline({ delay: 0.3 });

      // Masthead badge animation
      tl.from(".masthead-badge", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Character-by-character text reveal
      const chars = heroTextRef.current?.querySelectorAll(".char");
      if (chars?.length > 0) {
        tl.from(
          chars,
          {
            opacity: 0,
            y: 80,
            rotateX: -90,
            stagger: 0.02,
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
      if (bentoItems?.length > 0) {
        tl.from(
          bentoItems,
          {
            opacity: 0,
            y: 50,
            scale: 0.97,
            stagger: {
              amount: 0.5,
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

      // Parallax scroll effect
      gsap.to(".parallax-line", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Quote section reveal
      gsap.from(".quote-section", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".quote-section",
          start: "top 85%",
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [mounted, containerRef, heroTextRef, gridRef]);
}

// ============================================
// MEMOIZED SUB-COMPONENTS
// ============================================

const GrainOverlay = memo(() => (
  <div
    className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
    style={{ backgroundImage: NOISE_SVG }}
    aria-hidden="true"
  />
));
GrainOverlay.displayName = "GrainOverlay";

const DecorativeLines = memo(() => (
  <>
    <div
      className="absolute top-0 left-[20%] w-px h-full opacity-40 deco-line origin-top parallax-line hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main15}, transparent)`,
      }}
      aria-hidden="true"
    />
    <div
      className="absolute top-0 right-[20%] w-px h-full opacity-40 deco-line origin-top parallax-line hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main15}, transparent)`,
      }}
      aria-hidden="true"
    />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-20 deco-line origin-top hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main10}, transparent)`,
      }}
      aria-hidden="true"
    />
  </>
));
DecorativeLines.displayName = "DecorativeLines";

const FloatingGeometry = memo(() => (
  <>
    {/* Concentric circles */}
    <div
      className="absolute top-40 right-[10%] w-40 h-40 opacity-[0.04] float-element hidden lg:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[45, 30, 15].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={COLORS.main}
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
    {/* Rotated squares */}
    <div
      className="absolute bottom-60 left-[8%] w-32 h-32 opacity-[0.04] float-element hidden lg:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="none"
          stroke={COLORS.main}
          strokeWidth="0.5"
          transform="rotate(15 50 50)"
        />
        <rect
          x="25"
          y="25"
          width="50"
          height="50"
          fill="none"
          stroke={COLORS.main}
          strokeWidth="0.5"
          transform="rotate(15 50 50)"
        />
      </svg>
    </div>
  </>
));
FloatingGeometry.displayName = "FloatingGeometry";

const GradientOrb = memo(() => (
  <div
    className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 pointer-events-none"
    style={{
      background: `radial-gradient(circle, ${COLORS.pale} 0%, transparent 70%)`,
    }}
    aria-hidden="true"
  />
));
GradientOrb.displayName = "GradientOrb";

const MastheadBadge = memo(() => (
  <div className="masthead-badge inline-flex items-center gap-4 mb-8 sm:mb-10">
    <div
      className="w-12 sm:w-16 h-px deco-line origin-right"
      style={{ background: DERIVED.main30 }}
      aria-hidden="true"
    />
    <span
      className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-semibold flex items-center gap-3"
      style={STYLES.lightText}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={STYLES.accentBg}
        aria-hidden="true"
      />
      Established 2020
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: COLORS.accent }}
        aria-hidden="true"
      />
    </span>
    <div
      className="w-12 sm:w-16 h-px deco-line origin-left"
      style={{ background: DERIVED.main30 }}
      aria-hidden="true"
    />
  </div>
));
MastheadBadge.displayName = "MastheadBadge";

const HeroTitle = memo(({ textRef }) => {
  const chars = useMemo(
    () =>
      HERO_TITLE.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [],
  );

  return (
    <div ref={textRef} className="overflow-hidden mb-6 sm:mb-8">
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.95] tracking-tight"
        style={STYLES.mainText}
      >
        {chars}
      </h1>
    </div>
  );
});
HeroTitle.displayName = "HeroTitle";

const HeroSubtitle = memo(() => (
  <p
    className="hero-subtitle text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12"
    style={STYLES.lightText}
  >
    A curated collective of exceptional student technologists,
    <span className="font-medium" style={STYLES.mainText}>
      {" "}
      united under the Microsoft standard of excellence.
    </span>
  </p>
));
HeroSubtitle.displayName = "HeroSubtitle";

const MagneticButton = memo(function MagneticButton({
  children,
  className = "",
  style = {},
  onClick,
  ariaLabel,
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || window.innerWidth < 768) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.15,
      y: y * 0.15,
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
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});
MagneticButton.displayName = "MagneticButton";

const HeroCTAs = memo(() => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
    <MagneticButton
      className="hero-cta group inline-flex items-center gap-3 px-8 sm:px-10 py-4 text-white font-semibold tracking-wider text-sm transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        ...STYLES.mainBg,
        "--tw-ring-color": COLORS.main,
      }}
      ariaLabel="Request membership to MLSA program"
    >
      <span className="relative z-10">REQUEST MEMBERSHIP</span>
      <FaArrowRight
        className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
        aria-hidden="true"
      />
    </MagneticButton>

    <MagneticButton
      className="hero-cta group inline-flex items-center gap-3 px-8 sm:px-10 py-4 border font-medium tracking-wider text-sm transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2"
      style={{
        borderColor: DERIVED.main30,
        ...STYLES.mainText,
        "--tw-ring-color": COLORS.accent,
      }}
      ariaLabel="Watch our story video"
    >
      <FaPlay
        className="text-xs"
        style={STYLES.accentText}
        aria-hidden="true"
      />
      OUR STORY
    </MagneticButton>
  </div>
));
HeroCTAs.displayName = "HeroCTAs";

const StatItem = memo(function StatItem({ value, label, center = false }) {
  return (
    <div
      className={`text-center ${center ? "border-x" : ""}`}
      style={{ borderColor: DERIVED.white10 }}
    >
      <p className="text-2xl sm:text-3xl font-light text-white">{value}</p>
      <p
        className="text-[10px] tracking-[0.15em] uppercase mt-1"
        style={{ color: DERIVED.white50 }}
      >
        {label}
      </p>
    </div>
  );
});
StatItem.displayName = "StatItem";

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

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        y: -5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Glare effect
      if (glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        gsap.to(glareRef.current, {
          opacity: 0.06,
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
        perspective: "1000px",
        ...style,
      }}
    >
      {/* Glare overlay */}
      {enableTilt && (
        <div
          ref={glareRef}
          className="absolute inset-0 opacity-0 pointer-events-none z-10"
          style={{ mixBlendMode: "overlay" }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
});
PremiumCard.displayName = "PremiumCard";

// Card: The Standard (Main Feature)
const TheStandardCard = memo(() => (
  <PremiumCard
    className="col-span-4 sm:col-span-8 lg:col-span-6 row-span-3 p-6 sm:p-8 lg:p-10"
    style={STYLES.mainBg}
    enableTilt
  >
    <div className="h-full flex flex-col justify-between relative">
      {/* Decorative Corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
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
            style={{ borderColor: DERIVED.accent50 }}
          >
            <FaCrown style={STYLES.accentText} aria-hidden="true" />
          </div>
          <div
            className="h-px flex-1"
            style={{ background: DERIVED.white15 }}
          />
          <span
            className="text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: DERIVED.accent80 }}
          >
            Elite
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
          The Standard
        </h2>
        <p
          className="leading-relaxed text-sm sm:text-base"
          style={{ color: DERIVED.white60 }}
        >
          Every member represents the pinnacle of student achievement. Selected
          through rigorous evaluation, our ambassadors embody technical
          excellence and visionary leadership.
        </p>
      </div>

      <div
        className="grid grid-cols-3 gap-4 pt-6 border-t"
        style={{ borderColor: DERIVED.white10 }}
      >
        {HERO_STATS.map((stat) => (
          <StatItem key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  </PremiumCard>
));
TheStandardCard.displayName = "TheStandardCard";

// Card: Microsoft Partnership
const MicrosoftCard = memo(() => (
  <PremiumCard
    className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6"
    style={{ ...STYLES.whiteBg, borderColor: DERIVED.main10 }}
    enableTilt
  >
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={STYLES.paleBg}
      >
        <RiMicrosoftFill
          className="text-2xl"
          style={STYLES.mainText}
          aria-hidden="true"
        />
      </div>
      <p className="font-semibold text-sm" style={STYLES.mainText}>
        Microsoft
      </p>
      <p
        className="text-[10px] tracking-[0.2em] uppercase mt-1"
        style={STYLES.lightText}
      >
        Official Partner
      </p>
    </div>
  </PremiumCard>
));
MicrosoftCard.displayName = "MicrosoftCard";

// Card: Recognition
const RecognitionCard = memo(() => (
  <PremiumCard
    className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6"
    style={{ ...STYLES.ivoryBg, borderColor: DERIVED.main08 }}
    enableTilt
  >
    <div className="h-full flex flex-col justify-between">
      <div
        className="w-10 h-10 flex items-center justify-center"
        style={STYLES.paleBg}
      >
        <FaAward
          className="text-lg"
          style={STYLES.accentText}
          aria-hidden="true"
        />
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-light" style={STYLES.mainText}>
          Global
        </p>
        <p className="text-xs tracking-wider" style={STYLES.lightText}>
          Recognition & Prestige
        </p>
      </div>
    </div>
  </PremiumCard>
));
RecognitionCard.displayName = "RecognitionCard";

// Card: Member Privileges
const PrivilegesCard = memo(() => (
  <PremiumCard
    className="col-span-4 sm:col-span-4 lg:col-span-6 row-span-2 p-5 sm:p-6"
    style={{ ...STYLES.whiteBg, borderColor: DERIVED.main10 }}
    enableTilt
  >
    <div className="flex items-center gap-3 mb-5">
      <HiOutlineSparkles style={STYLES.accentText} aria-hidden="true" />
      <p
        className="text-[10px] tracking-[0.2em] uppercase font-semibold"
        style={STYLES.lightText}
      >
        Member Privileges
      </p>
      <div className="h-px flex-1" style={{ background: DERIVED.main10 }} />
    </div>
    <div className="grid grid-cols-2 gap-3" role="list">
      {PRIVILEGES.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 p-2.5 transition-colors"
          style={{ background: DERIVED.pale50 }}
          role="listitem"
        >
          <FaCheck
            className="text-[10px] shrink-0"
            style={STYLES.accentText}
            aria-hidden="true"
          />
          <span className="text-xs sm:text-sm" style={STYLES.mainText}>
            {item}
          </span>
        </div>
      ))}
    </div>
  </PremiumCard>
));
PrivilegesCard.displayName = "PrivilegesCard";

// Card: Apply CTA Banner
const ApplyCTACard = memo(() => (
  <PremiumCard
    className="col-span-4 sm:col-span-8 lg:col-span-6 row-span-1 p-5 sm:p-6"
    style={{
      background: COLORS.pale,
      borderColor: DERIVED.accent20,
    }}
  >
    <div className="h-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div
          className="w-3 h-3 rounded-full animate-pulse shrink-0"
          style={{ background: "#10B981" }}
          aria-hidden="true"
        />
        <div>
          <p
            className="font-semibold text-sm sm:text-base"
            style={STYLES.mainText}
          >
            Applications for 2025
          </p>
          <p className="text-xs sm:text-sm" style={STYLES.lightText}>
            Limited positions • Highly selective
          </p>
        </div>
      </div>
      <button
        className="hidden sm:flex px-6 py-2.5 text-xs font-semibold tracking-wider text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2"
        style={{ ...STYLES.mainBg, "--tw-ring-color": COLORS.main }}
        aria-label="Apply for membership"
      >
        APPLY
      </button>
    </div>
  </PremiumCard>
));
ApplyCTACard.displayName = "ApplyCTACard";

// Card: Next Event
const NextEventCard = memo(() => (
  <PremiumCard
    className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6"
    style={{ ...STYLES.whiteBg, borderColor: DERIVED.main10 }}
    enableTilt
  >
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <HiCalendarDays
            className="text-sm"
            style={STYLES.accentText}
            aria-hidden="true"
          />
          <p
            className="text-[10px] tracking-[0.15em] uppercase font-medium"
            style={STYLES.lightText}
          >
            Next Event
          </p>
        </div>
        <p className="text-lg font-semibold" style={STYLES.mainText}>
          Annual Gala
        </p>
        <p className="text-sm mt-1" style={STYLES.lightText}>
          March 2025 — Seattle
        </p>
      </div>
      <span
        className="inline-block px-3 py-1.5 text-[10px] font-bold tracking-wider w-fit"
        style={{
          background: DERIVED.accent10,
          color: COLORS.accent,
        }}
      >
        MEMBERS ONLY
      </span>
    </div>
  </PremiumCard>
));
NextEventCard.displayName = "NextEventCard";

// Card: Network Access
const NetworkCard = memo(() => (
  <PremiumCard
    className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 p-5 sm:p-6 group cursor-pointer"
    style={{ ...STYLES.ivoryBg, borderColor: DERIVED.main08 }}
    enableTilt
  >
    <div className="h-full flex flex-col justify-between">
      <div
        className="w-10 h-10 flex items-center justify-center transition-colors"
        style={STYLES.paleBg}
      >
        <FaGlobe
          className="text-lg transition-colors group-hover:text-accent"
          style={STYLES.lightText}
          aria-hidden="true"
        />
      </div>
      <div>
        <p className="text-xl font-light" style={STYLES.mainText}>
          Lifetime
        </p>
        <p className="text-xs tracking-wider" style={STYLES.lightText}>
          Network Access
        </p>
      </div>
    </div>
  </PremiumCard>
));
NetworkCard.displayName = "NetworkCard";

const ScrollIndicator = memo(() => (
  <div className="scroll-indicator flex flex-col items-center mt-16 sm:mt-20">
    <span
      className="text-[10px] tracking-[0.25em] uppercase mb-3 font-medium"
      style={STYLES.lightText}
    >
      Scroll to explore
    </span>
    <div
      className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
      style={{ borderColor: DERIVED.main20 }}
    >
      <div
        className="w-1 h-2.5 rounded-full animate-bounce"
        style={{ background: COLORS.accent }}
      />
    </div>
  </div>
));
ScrollIndicator.displayName = "ScrollIndicator";

const QuoteSection = memo(() => (
  <div className="quote-section mt-24 sm:mt-32 text-center">
    <div className="flex justify-center mb-6">
      <FaQuoteLeft
        className="text-2xl opacity-20"
        style={STYLES.lightText}
        aria-hidden="true"
      />
    </div>
    <blockquote
      className="text-xl sm:text-2xl lg:text-3xl font-extralight italic max-w-3xl mx-auto leading-relaxed"
      style={STYLES.lightText}
    >
      "Excellence is not a destination, but a continuous journey of growth,
      innovation, and meaningful impact."
    </blockquote>
    <div className="mt-8 flex items-center justify-center gap-4">
      <div
        className="w-10 h-px"
        style={{ background: DERIVED.main30 }}
        aria-hidden="true"
      />
      <cite
        className="text-xs tracking-[0.25em] uppercase font-semibold not-italic"
        style={STYLES.mainText}
      >
        The Ambassador Creed
      </cite>
      <div
        className="w-10 h-px"
        style={{ background: DERIVED.main30 }}
        aria-hidden="true"
      />
    </div>
  </div>
));
QuoteSection.displayName = "QuoteSection";

// ============================================
// MAIN COMPONENT
// ============================================

export default function HeroPremium() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const heroTextRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom hook for all animations
  useHeroAnimations(containerRef, heroTextRef, gridRef, mounted);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={STYLES.section}
      aria-labelledby="hero-title"
    >
      <GrainOverlay />
      <DecorativeLines />
      <FloatingGeometry />
      <GradientOrb />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Masthead */}
        <header className="text-center mb-14 sm:mb-18 lg:mb-20">
          <MastheadBadge />
          <HeroTitle textRef={heroTextRef} />
          <HeroSubtitle />
          <HeroCTAs />
        </header>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 auto-rows-[100px] sm:auto-rows-[120px] lg:auto-rows-[130px]"
          role="region"
          aria-label="Program highlights"
        >
          <TheStandardCard />
          <MicrosoftCard />
          <RecognitionCard />
          <PrivilegesCard />
          <ApplyCTACard />
          <NextEventCard />
          <NetworkCard />
        </div>

        <ScrollIndicator />
        <QuoteSection />
      </div>
    </section>
  );
}
