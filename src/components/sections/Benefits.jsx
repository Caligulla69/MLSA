// BenefitsPremium.jsx - Cinematic editorial scroll experience (Optimized)
import { useEffect, useRef, memo, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiAcademicCap,
  HiGlobeAmericas,
  HiCpuChip,
  HiRocketLaunch,
  HiArrowRight,
  HiSparkles,
} from "react-icons/hi2";
import { FaCheck, FaMicrosoft } from "react-icons/fa";

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
  main10: `${COLORS.main}1A`,
  main15: `${COLORS.main}26`,
  main20: `${COLORS.main}33`,
  main30: `${COLORS.main}4D`,
  main40: `${COLORS.main}66`,
  main50: `${COLORS.main}80`,
  accent10: `${COLORS.accent}1A`,
  accent15: `${COLORS.accent}26`,
  accent20: `${COLORS.accent}33`,
  accent30: `${COLORS.accent}4D`,
  accent40: `${COLORS.accent}66`,
  accent50: `${COLORS.accent}80`,
  light20: `${COLORS.light}33`,
  light30: `${COLORS.light}4D`,
  pale50: `${COLORS.pale}80`,
  pale80: `${COLORS.pale}CC`,
});

// Benefits data - frozen and outside component
const BENEFITS = Object.freeze([
  {
    id: "learn",
    icon: HiAcademicCap,
    title: "Learn",
    highlight: "Without Limits",
    description:
      "Access exclusive Microsoft Learn paths, industry certifications, and private workshops led by Microsoft engineers.",
    stat: "500+",
    statLabel: "Learning Paths",
    features: [
      "Microsoft Learn Premium Access",
      "Private Expert Workshops",
      "Industry Certification Prep",
    ],
  },
  {
    id: "build",
    icon: HiCpuChip,
    title: "Build",
    highlight: "Enterprise Grade",
    description:
      "$150 monthly Azure credits to architect and deploy production-ready applications at scale.",
    stat: "$1,800",
    statLabel: "Annual Credits",
    features: [
      "Azure Cloud Credits",
      "GitHub Enterprise Access",
      "VS Code Pro Extensions",
    ],
  },
  {
    id: "connect",
    icon: HiGlobeAmericas,
    title: "Connect",
    highlight: "Globally",
    description:
      "Join an elite network of 100,000+ student technologists across 100+ countries worldwide.",
    stat: "100+",
    statLabel: "Countries",
    features: [
      "Global Ambassador Network",
      "Regional Chapter Access",
      "Annual Summit Invitation",
    ],
  },
  {
    id: "launch",
    icon: HiRocketLaunch,
    title: "Launch",
    highlight: "Your Career",
    description:
      "Direct pathways to internships, full-time roles, and exclusive recruitment events at Microsoft.",
    stat: "85%",
    statLabel: "Placement Rate",
    features: [
      "1:1 Career Mentorship",
      "Resume & Portfolio Reviews",
      "Mock Interview Sessions",
    ],
  },
]);

// Static style objects
const STYLES = Object.freeze({
  section: { background: COLORS.cream },
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  ivoryBg: { background: COLORS.ivory },
  paleBg: { background: COLORS.pale },
  mainBg: { background: COLORS.main },
  creamBg: { background: COLORS.cream },
});

// Noise texture SVG
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ============================================
// CUSTOM HOOKS
// ============================================

function useScrollAnimations(containerRef, heroRef, cardsRef) {
  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero text animation with 3D effect
      const heroChars = gsap.utils.toArray(".hero-char");
      if (heroChars.length > 0) {
        gsap.from(heroChars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.02,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: hero,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Hero subtitle fade in
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          once: true,
        },
      });

      // Scroll indicator fade out
      gsap.to(".scroll-indicator", {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      // Cards with staggered reveal and parallax
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.set(card, { willChange: "transform, opacity" });

        // Entrance animation
        gsap.from(card, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
            onComplete: () => gsap.set(card, { willChange: "auto" }),
          },
        });

        // Parallax effect
        gsap.to(card, {
          yPercent: i % 2 === 0 ? -5 : 5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // Decorative lines
      gsap.from(".deco-line", {
        scaleY: 0,
        duration: 2,
        ease: "power4.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          once: true,
        },
      });

      // Progress bar
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, heroRef, cardsRef]);
}

// ============================================
// MEMOIZED SUB-COMPONENTS
// ============================================

const GrainOverlay = memo(() => (
  <div
    className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
    style={{ backgroundImage: NOISE_SVG }}
    aria-hidden="true"
  />
));
GrainOverlay.displayName = "GrainOverlay";

const ProgressBar = memo(() => (
  <div
    className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left progress-bar"
    style={{
      background: COLORS.accent,
      transform: "scaleX(0)",
    }}
    aria-hidden="true"
  />
));
ProgressBar.displayName = "ProgressBar";

const DecorativeLines = memo(() => (
  <>
    <div
      className="absolute top-0 left-1/4 w-px h-full origin-top deco-line hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main10}, transparent)`,
      }}
      aria-hidden="true"
    />
    <div
      className="absolute top-0 right-1/4 w-px h-full origin-top deco-line hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main10}, transparent)`,
      }}
      aria-hidden="true"
    />
  </>
));
DecorativeLines.displayName = "DecorativeLines";

const FloatingGeometry = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Concentric circles - top right */}
    <div className="absolute top-40 right-16 w-72 h-72 opacity-[0.03] hidden lg:block">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[45, 35, 25, 15].map((r) => (
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

    {/* Grid pattern - bottom left */}
    <div className="absolute bottom-60 left-8 w-40 h-40 opacity-[0.025] hidden lg:block">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={COLORS.main}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>

    {/* Cross mark - mid right */}
    <div className="absolute top-1/2 right-8 w-8 h-8 opacity-[0.06] hidden xl:block">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M12 2 L12 22 M2 12 L22 12"
          stroke={COLORS.main}
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    </div>
  </div>
));
FloatingGeometry.displayName = "FloatingGeometry";

const ScrollIndicator = memo(() => (
  <div className="scroll-indicator mt-16 flex flex-col items-center gap-4">
    <span
      className="text-[11px] tracking-[0.3em] uppercase font-medium"
      style={STYLES.lightText}
    >
      Scroll to explore
    </span>
    <div
      className="relative w-6 h-10 rounded-full border flex items-start justify-center p-2"
      style={{ borderColor: DERIVED.main30 }}
    >
      <div
        className="w-1 h-2.5 rounded-full animate-bounce"
        style={{ background: COLORS.accent }}
      />
    </div>
  </div>
));
ScrollIndicator.displayName = "ScrollIndicator";

const HeroBadge = memo(() => (
  <div className="inline-flex items-center gap-3 mb-12">
    <div className="w-12 h-px" style={{ background: DERIVED.main20 }} />
    <div
      className="flex items-center gap-3 px-5 py-2.5 border"
      style={{ borderColor: DERIVED.main15, background: DERIVED.pale50 }}
    >
      <HiSparkles
        className="text-sm"
        style={STYLES.accentText}
        aria-hidden="true"
      />
      <span
        className="text-[10px] tracking-[0.35em] uppercase font-semibold"
        style={STYLES.accentText}
      >
        Member Benefits
      </span>
    </div>
    <div className="w-12 h-px" style={{ background: DERIVED.main20 }} />
  </div>
));
HeroBadge.displayName = "HeroBadge";

const HeroStats = memo(() => (
  <div
    className="hero-subtitle flex flex-wrap justify-center gap-12 mt-14 pt-10 border-t"
    style={{ borderColor: DERIVED.main10 }}
  >
    {[
      { value: "500+", label: "Resources" },
      { value: "$1.8K", label: "Annual Value" },
      { value: "100+", label: "Countries" },
    ].map((item) => (
      <div key={item.label} className="text-center">
        <p
          className="text-2xl sm:text-3xl font-extralight tracking-tight"
          style={STYLES.mainText}
        >
          {item.value}
        </p>
        <p
          className="text-[10px] tracking-[0.2em] uppercase mt-2 font-medium"
          style={STYLES.lightText}
        >
          {item.label}
        </p>
      </div>
    ))}
  </div>
));
HeroStats.displayName = "HeroStats";

const HeroSection = memo(({ heroRef }) => {
  const titleLine1 = "Unlock Your";
  const titleLine2 = "Potential";

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
    >
      <div className="text-center max-w-4xl mx-auto">
        <HeroBadge />

        {/* Main Heading */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-[0.9] tracking-tight mb-8"
          style={STYLES.mainText}
        >
          <span className="block" style={{ perspective: "1000px" }}>
            {titleLine1.split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span className="block font-normal mt-1" style={STYLES.accentText}>
            {titleLine2.split("").map((char, i) => (
              <span
                key={`h-${i}`}
                className="hero-char inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="hero-subtitle text-lg sm:text-xl font-light max-w-xl mx-auto leading-relaxed"
          style={STYLES.lightText}
        >
          Discover the exclusive privileges reserved for members of our{" "}
          <span className="font-medium" style={STYLES.mainText}>
            elite community
          </span>
          .
        </p>

        <HeroStats />
        <ScrollIndicator />
      </div>
    </div>
  );
});
HeroSection.displayName = "HeroSection";

const FeatureItem = memo(({ feature }) => (
  <div
    className="group flex items-center gap-4 py-3 px-4 transition-all duration-300 hover:bg-white cursor-pointer border-b last:border-b-0"
    style={{ borderColor: DERIVED.main10 }}
    role="listitem"
  >
    <div
      className="w-7 h-7 flex items-center justify-center shrink-0 transition-colors duration-300"
      style={{ background: DERIVED.accent10 }}
    >
      <FaCheck
        className="text-[10px]"
        style={STYLES.accentText}
        aria-hidden="true"
      />
    </div>
    <span className="text-sm font-medium flex-1" style={STYLES.mainText}>
      {feature}
    </span>
    <HiArrowRight
      className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
      style={STYLES.accentText}
      aria-hidden="true"
    />
  </div>
));
FeatureItem.displayName = "FeatureItem";

const StatCard = memo(({ stat, label }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    gsap.to(card, {
      rotateX: (y - rect.height / 2) / 30,
      rotateY: (rect.width / 2 - x) / 30,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-12 sm:p-14 lg:p-16 border transition-shadow duration-500 hover:shadow-xl"
      style={{
        background: COLORS.ivory,
        borderColor: DERIVED.main10,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Subtle spotlight on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${DERIVED.accent10}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
          <path
            d="M100 0 L100 100 L0 100"
            fill="none"
            stroke={COLORS.main}
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Stat value */}
      <div
        className="relative text-7xl sm:text-8xl lg:text-9xl font-thin tracking-tight"
        style={{ ...STYLES.mainText, transform: "translateZ(30px)" }}
      >
        {stat}
      </div>

      {/* Label */}
      <div
        className="relative mt-4 flex items-center gap-3"
        style={{ transform: "translateZ(15px)" }}
      >
        <div className="w-6 h-[2px]" style={{ background: COLORS.accent }} />
        <span
          className="text-xs tracking-[0.2em] uppercase font-medium"
          style={STYLES.lightText}
        >
          {label}
        </span>
      </div>
    </div>
  );
});
StatCard.displayName = "StatCard";

const BenefitCard = memo(function BenefitCard({ benefit, index }, ref) {
  const isEven = index % 2 === 0;
  const Icon = benefit.icon;

  return (
    <article
      ref={ref}
      className="mb-28 sm:mb-36 lg:mb-44 last:mb-0"
      aria-labelledby={`benefit-${benefit.id}-title`}
    >
      <div
        className={`grid lg:grid-cols-2 gap-14 lg:gap-20 items-center ${
          !isEven ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Text Content */}
        <div className={!isEven ? "lg:order-2" : ""}>
          {/* Section number */}
          <div className="flex items-center gap-4 mb-10">
            <span
              className="text-xs tracking-[0.2em] uppercase font-semibold"
              style={STYLES.accentText}
            >
              0{index + 1}
            </span>
            <div
              className="h-px flex-1"
              style={{ background: DERIVED.main15 }}
            />
          </div>

          {/* Icon */}
          <div className="mb-8">
            <div
              className="inline-flex w-14 h-14 items-center justify-center border"
              style={{
                background: COLORS.pale,
                borderColor: DERIVED.accent30,
              }}
            >
              <Icon
                className="w-6 h-6"
                style={STYLES.accentText}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Title */}
          <h2
            id={`benefit-${benefit.id}-title`}
            className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-2 tracking-tight"
            style={{ color: DERIVED.main40 }}
          >
            {benefit.title}
          </h2>
          <p
            className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-8"
            style={STYLES.accentText}
          >
            {benefit.highlight}
          </p>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-md"
            style={STYLES.lightText}
          >
            {benefit.description}
          </p>

          {/* Features */}
          <div
            className="border"
            style={{ borderColor: DERIVED.main10, background: DERIVED.pale50 }}
            role="list"
            aria-label={`${benefit.title} features`}
          >
            {benefit.features.map((feature, i) => (
              <FeatureItem key={i} feature={feature} />
            ))}
          </div>
        </div>

        {/* Stat Card */}
        <div
          className={`${!isEven ? "lg:order-1" : ""} flex justify-center lg:justify-start`}
        >
          <StatCard stat={benefit.stat} label={benefit.statLabel} />
        </div>
      </div>
    </article>
  );
});
BenefitCard.displayName = "BenefitCard";

const CTASection = memo(() => (
  <div
    className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t overflow-hidden"
    style={{ ...STYLES.mainBg, borderColor: DERIVED.accent20 }}
  >
    {/* Subtle background pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.pale} 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }}
      aria-hidden="true"
    />

    {/* Accent glow */}
    <div
      className="absolute top-0 left-1/3 w-80 h-80 blur-[120px] opacity-15"
      style={{ background: COLORS.accent }}
      aria-hidden="true"
    />

    <div className="relative max-w-4xl mx-auto text-center">
      {/* Status badge */}
      <div
        className="inline-flex items-center gap-3 mb-8 px-4 py-2 border"
        style={{ borderColor: DERIVED.accent30 }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#4ADE80" }}
          aria-hidden="true"
        />
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-medium"
          style={STYLES.accentText}
        >
          Applications Open
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
        Ready to unlock your{" "}
        <span className="font-normal" style={STYLES.accentText}>
          full potential
        </span>
        ?
      </h2>
      <p
        className="text-base sm:text-lg max-w-xl mx-auto mb-12"
        style={{ color: DERIVED.light30 }}
      >
        Join over 100,000 student leaders transforming their careers through
        Microsoft.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white font-medium tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#16253B]"
          style={STYLES.mainText}
        >
          APPLY NOW
          <HiArrowRight
            className="group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </button>
        <button
          className="group inline-flex items-center justify-center gap-3 px-10 py-4 border font-medium tracking-wider text-sm text-white transition-all duration-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white"
          style={{ borderColor: DERIVED.accent40 }}
        >
          <FaMicrosoft className="text-base" aria-hidden="true" />
          LEARN MORE
        </button>
      </div>

      {/* University mentions */}
      <div
        className="mt-16 pt-8 border-t flex flex-wrap justify-center gap-x-10 gap-y-3"
        style={{ borderColor: DERIVED.accent20 }}
      >
        {["MIT", "Stanford", "Oxford", "Cambridge", "Harvard", "IIT"].map(
          (uni) => (
            <span
              key={uni}
              className="text-sm font-light tracking-wider transition-opacity hover:opacity-60 cursor-default"
              style={{ color: DERIVED.light30 }}
            >
              {uni}
            </span>
          ),
        )}
      </div>
    </div>
  </div>
));
CTASection.displayName = "CTASection";

// ============================================
// MAIN COMPONENT
// ============================================

export default function Benefits() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  // Custom hook for all scroll animations
  useScrollAnimations(containerRef, heroRef, cardsRef);

  // Memoized card refs setter
  const setCardRef = useCallback((el, i) => {
    cardsRef.current[i] = el;
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={STYLES.section}
      aria-labelledby="benefits-heading"
    >
      <ProgressBar />
      <GrainOverlay />
      <DecorativeLines />
      <FloatingGeometry />

      {/* Hero Section */}
      <HeroSection heroRef={heroRef} />

      {/* Benefits Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        {BENEFITS.map((benefit, i) => (
          <BenefitCard
            key={benefit.id}
            ref={(el) => setCardRef(el, i)}
            benefit={benefit}
            index={i}
          />
        ))}
      </div>

      {/* CTA Section */}
      <CTASection />
    </section>
  );
}
