// AboutEditorial.jsx - Magazine-style editorial layout (Optimized)
import { useEffect, useRef, memo, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import { RiMicrosoftFill } from "react-icons/ri";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaGlobe,
  FaUsers,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";

// Register plugin once at module level
gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONSTANTS - Moved outside component to prevent recreation
// ============================================

const COLORS = Object.freeze({
  accent: "#0A5FA8",
  main: "#16253B",
  light: "#3F5F8C",
  pale: "#E6EEF6",
  cream: "#FBFAF8",
  ivory: "#EEECE6",
});

// Pre-computed derived colors to avoid template literal recreation
const DERIVED = Object.freeze({
  main10: `${COLORS.main}10`,
  main15: `${COLORS.main}15`,
  main20: `${COLORS.main}20`,
  accent20: `${COLORS.accent}20`,
  accent30: `${COLORS.accent}30`,
  accent40: `${COLORS.accent}40`,
  accent70: `${COLORS.accent}70`,
  accent90: `${COLORS.accent}90`,
  pale50: `${COLORS.pale}50`,
});

// Static data - frozen for immutability
const STATS = Object.freeze([
  { value: "100K+", label: "Members" },
  { value: "100+", label: "Countries" },
  { value: "3%", label: "Accept Rate" },
  { value: "2020", label: "Established" },
]);

const PILLARS = Object.freeze([
  {
    icon: FaGraduationCap,
    title: "Learn",
    desc: "Master cutting-edge technologies",
  },
  { icon: FaLaptopCode, title: "Build", desc: "Create real-world solutions" },
  { icon: FaGlobe, title: "Connect", desc: "Join a global network" },
  { icon: FaUsers, title: "Lead", desc: "Mentor your community" },
]);

const STANDARDS = Object.freeze([
  "Technical Excellence Required",
  "Leadership Potential Assessed",
  "Community Impact Evaluated",
  "Continuous Performance Review",
]);

const BENEFITS = Object.freeze([
  { text: "$150/month Azure Credits", highlight: true },
  { text: "GitHub Enterprise Access", highlight: false },
  { text: "Microsoft 365 E5 Suite", highlight: false },
  { text: "Free Certification Vouchers", highlight: true },
  { text: "LinkedIn Learning Premium", highlight: false },
  { text: "Global Summit Invitations", highlight: true },
]);

const UNIVERSITIES = Object.freeze([
  "MIT",
  "Stanford",
  "Oxford",
  "Cambridge",
  "Harvard",
  "IIT",
  "ETH Zurich",
  "NUS",
]);

// Noise texture constant
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Pre-computed style objects
const STATIC_STYLES = Object.freeze({
  section: { background: COLORS.cream },
  grain: { backgroundImage: NOISE_SVG },
  headerBorder: { borderColor: DERIVED.main10 },
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  mainBg: { background: COLORS.main },
  ivoryBg: { background: COLORS.ivory },
});

// Animation config
const ANIM_CONFIG = Object.freeze({
  line: { scaleX: 0, duration: 1.5, ease: "power4.inOut", stagger: 0.1 },
  fade: { opacity: 0, y: 40, duration: 1, stagger: 0.1, ease: "power3.out" },
});

// ============================================
// CUSTOM HOOKS
// ============================================

function useScrollAnimations(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Horizontal line reveal - using batch for better performance
      ScrollTrigger.batch(".h-line", {
        onEnter: (batch) => {
          gsap.from(batch, { ...ANIM_CONFIG.line });
        },
        start: "top 70%",
        once: true,
      });

      // Content fade in
      ScrollTrigger.batch(".fade-in", {
        onEnter: (batch) => {
          gsap.from(batch, { ...ANIM_CONFIG.fade });
        },
        start: "top 80%",
        once: true,
      });

      // Parallax effect with will-change optimization
      gsap.utils.toArray(".parallax-card").forEach((card, i) => {
        gsap.set(card, { willChange: "transform" });

        gsap.to(card, {
          yPercent: i % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            onLeave: () => gsap.set(card, { willChange: "auto" }),
            onLeaveBack: () => gsap.set(card, { willChange: "auto" }),
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

// ============================================
// MEMOIZED SUB-COMPONENTS
// ============================================

const GrainOverlay = memo(() => (
  <div
    className="absolute inset-0 opacity-20 pointer-events-none"
    style={STATIC_STYLES.grain}
    aria-hidden="true"
  />
));
GrainOverlay.displayName = "GrainOverlay";

const StatItem = memo(({ value, label }) => (
  <div className="py-6 text-center">
    <p
      className="text-2xl sm:text-3xl font-thin"
      style={STATIC_STYLES.mainText}
    >
      {value}
    </p>
    <p
      className="text-[10px] tracking-[0.2em] uppercase mt-1"
      style={STATIC_STYLES.lightText}
    >
      {label}
    </p>
  </div>
));
StatItem.displayName = "StatItem";

const SectionDivider = memo(({ number, label }) => (
  <div className="flex items-center gap-4 mb-8">
    <span
      className="text-xs tracking-[0.2em] uppercase font-medium"
      style={STATIC_STYLES.accentText}
    >
      {number}
    </span>
    <div className="h-px flex-1" style={{ background: DERIVED.main15 }} />
    <span
      className="text-xs tracking-[0.2em] uppercase"
      style={STATIC_STYLES.lightText}
    >
      {label}
    </span>
  </div>
));
SectionDivider.displayName = "SectionDivider";

const FeatureRow = memo(({ icon: Icon, title, desc }) => (
  <div
    className="group flex items-center gap-4 p-4 border-b cursor-pointer transition-[padding] duration-300 hover:pl-6"
    style={{ borderColor: DERIVED.main10 }}
    role="listitem"
  >
    <div
      className="w-10 h-10 flex items-center justify-center shrink-0"
      style={{ background: COLORS.pale }}
    >
      <Icon
        className="text-sm"
        style={STATIC_STYLES.accentText}
        aria-hidden="true"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm" style={STATIC_STYLES.mainText}>
        {title}
      </p>
      <p className="text-xs truncate" style={STATIC_STYLES.lightText}>
        {desc}
      </p>
    </div>
    <HiArrowRight
      className="text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      style={STATIC_STYLES.accentText}
      aria-hidden="true"
    />
  </div>
));
FeatureRow.displayName = "FeatureRow";

const BenefitRow = memo(({ text, highlight }) => {
  const style = useMemo(
    () => ({
      background: highlight ? DERIVED.pale50 : "white",
      borderColor: highlight ? DERIVED.accent20 : DERIVED.main10,
    }),
    [highlight],
  );

  const dotStyle = useMemo(
    () => ({
      background: highlight ? COLORS.accent : COLORS.light,
    }),
    [highlight],
  );

  return (
    <div
      className="flex items-center justify-between p-4 border group cursor-pointer transition-shadow hover:shadow-sm"
      style={style}
      role="listitem"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-2 h-2 rounded-full shrink-0" style={dotStyle} />
        <span
          className="text-sm font-medium truncate"
          style={STATIC_STYLES.mainText}
        >
          {text}
        </span>
      </div>
      <HiArrowRight
        className="text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
        style={STATIC_STYLES.accentText}
        aria-hidden="true"
      />
    </div>
  );
});
BenefitRow.displayName = "BenefitRow";

const QuoteCard = memo(() => (
  <figure
    className="parallax-card p-8 sm:p-10 border-l-2"
    style={{ ...STATIC_STYLES.ivoryBg, borderColor: COLORS.accent }}
  >
    <FaQuoteLeft
      className="text-2xl mb-6"
      style={{ color: DERIVED.accent30 }}
      aria-hidden="true"
    />
    <blockquote
      className="text-xl sm:text-2xl font-light italic leading-relaxed mb-6"
      style={STATIC_STYLES.mainText}
    >
      "Being an ambassador opened doors I never knew existed. The network, the
      resources, the mentorship — it transformed my career trajectory."
    </blockquote>
    <figcaption className="flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-full shrink-0"
        style={{ background: DERIVED.main10 }}
        aria-hidden="true"
      />
      <div>
        <cite
          className="font-medium text-sm not-italic"
          style={STATIC_STYLES.mainText}
        >
          Sarah Chen
        </cite>
        <p className="text-xs" style={STATIC_STYLES.lightText}>
          Gold Ambassador, Stanford '24
        </p>
      </div>
    </figcaption>
  </figure>
));
QuoteCard.displayName = "QuoteCard";

const StandardsCard = memo(() => (
  <div
    className="parallax-card fade-in p-8 sm:p-10 lg:p-12"
    style={STATIC_STYLES.mainBg}
  >
    <div className="flex items-center gap-3 mb-8">
      <HiOutlineSparkles
        className="text-xl"
        style={STATIC_STYLES.accentText}
        aria-hidden="true"
      />
      <span className="text-xs tracking-[0.2em] uppercase text-white">
        The Standard
      </span>
    </div>

    <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
      Reserved for the Exceptional
    </h3>
    <p className="leading-relaxed mb-8" style={{ color: DERIVED.accent90 }}>
      With a 3% acceptance rate, our ambassadors represent the absolute pinnacle
      of student talent worldwide. Each member is carefully selected for their
      technical prowess and leadership potential.
    </p>

    <ul className="space-y-3" role="list">
      {STANDARDS.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <FaCheck
            className="text-xs shrink-0"
            style={STATIC_STYLES.accentText}
            aria-hidden="true"
          />
          <span className="text-sm text-white">{item}</span>
        </li>
      ))}
    </ul>
  </div>
));
StandardsCard.displayName = "StandardsCard";

const UniversityList = memo(() => (
  <div
    className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
    role="list"
    aria-label="Partner universities"
  >
    {UNIVERSITIES.map((uni) => (
      <span
        key={uni}
        className="text-lg font-light tracking-wider opacity-30 hover:opacity-60 transition-opacity cursor-default select-none"
        style={STATIC_STYLES.mainText}
        role="listitem"
      >
        {uni}
      </span>
    ))}
  </div>
));
UniversityList.displayName = "UniversityList";

// ============================================
// MAIN COMPONENT
// ============================================

export default function About() {
  const sectionRef = useRef(null);

  // Custom hook for animations
  useScrollAnimations(sectionRef);

  // Memoized handlers
  const handleApply = useCallback(() => {
    // Navigation or modal logic
    window.open("/apply", "_blank");
  }, []);

  const handleLearnMore = useCallback(() => {
    // Scroll or navigation logic
    document
      .getElementById("learn-more")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Memoized stats rendering
  const statsSection = useMemo(
    () => (
      <div
        className="grid grid-cols-2 sm:grid-cols-4 divide-x"
        style={{ borderColor: DERIVED.main10 }}
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    ),
    [],
  );

  // Memoized pillars rendering
  const pillarsSection = useMemo(
    () => (
      <div className="space-y-4" role="list" aria-label="Program pillars">
        {PILLARS.map((item) => (
          <FeatureRow key={item.title} {...item} />
        ))}
      </div>
    ),
    [],
  );

  // Memoized benefits rendering
  const benefitsSection = useMemo(
    () => (
      <div className="space-y-4" role="list" aria-label="Member benefits">
        {BENEFITS.map((item, i) => (
          <BenefitRow key={i} {...item} />
        ))}
      </div>
    ),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={STATIC_STYLES.section}
      aria-labelledby="about-heading"
    >
      <GrainOverlay />

      {/* Header */}
      <header className="relative border-b" style={STATIC_STYLES.headerBorder}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            {/* Left - Intro */}
            <div className="lg:col-span-4 fade-in">
              <div className="flex items-center gap-4 mb-6">
                <RiMicrosoftFill
                  className="text-xl shrink-0"
                  style={STATIC_STYLES.mainText}
                  aria-hidden="true"
                />
                <div
                  className="h-px flex-1"
                  style={{ background: DERIVED.main20 }}
                />
              </div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={STATIC_STYLES.lightText}
              >
                Official Program
              </p>
              <p
                className="text-sm leading-relaxed"
                style={STATIC_STYLES.mainText}
              >
                The Microsoft Learn Student Ambassadors program is a global
                community of campus leaders who are eager to help fellow
                students.
              </p>
            </div>

            {/* Right - Headline */}
            <div className="lg:col-span-8">
              <h1
                id="about-heading"
                className="fade-in text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-[0.95] tracking-tight"
                style={STATIC_STYLES.mainText}
              >
                Where
                <span
                  className="block font-normal"
                  style={STATIC_STYLES.accentText}
                >
                  Ambition
                </span>
                Meets
                <span className="block font-light">Excellence</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Stats Divider */}
        <div
          className="h-line origin-left border-t"
          style={STATIC_STYLES.headerBorder}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {statsSection}
          </div>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="space-y-16">
            <article className="fade-in">
              <SectionDivider number="01" label="The Journey" />
              <h2
                className="text-3xl sm:text-4xl font-light mb-6"
                style={STATIC_STYLES.mainText}
              >
                Four Pillars of Growth
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={STATIC_STYLES.lightText}
              >
                Our program is built on a foundation of continuous learning,
                hands-on building, global connection, and community leadership.
              </p>
              {pillarsSection}
            </article>

            <QuoteCard />
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            <StandardsCard />

            <article className="fade-in">
              <SectionDivider number="02" label="Privileges" />
              <h2
                className="text-3xl sm:text-4xl font-light mb-6"
                style={STATIC_STYLES.mainText}
              >
                Member Benefits
              </h2>
              {benefitsSection}
            </article>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="border-t"
        style={{ ...STATIC_STYLES.mainBg, borderColor: DERIVED.accent20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: "#4ADE80" }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={STATIC_STYLES.accentText}
                >
                  Now Accepting Applications
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                Ready to join the elite?
              </h2>
              <p className="mt-2" style={{ color: DERIVED.accent70 }}>
                Applications for Spring 2025 cohort are now open.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={handleApply}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white font-medium tracking-wider text-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#16253B]"
                style={STATIC_STYLES.mainText}
              >
                APPLY NOW
                <HiArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border font-medium tracking-wider text-sm text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                style={{ borderColor: DERIVED.accent40 }}
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Universities Footer */}
      <footer
        className="py-16 px-4 sm:px-6 lg:px-8 border-t"
        style={{ borderColor: DERIVED.main10 }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center text-xs tracking-[0.3em] uppercase mb-10"
            style={STATIC_STYLES.lightText}
          >
            Our ambassadors represent leading institutions worldwide
          </p>
          <UniversityList />
        </div>
      </footer>
    </section>
  );
}
