// BenefitsPremium.jsx - Cinematic editorial scroll experience
import { useEffect, useRef, memo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiAcademicCap,
  HiGlobeAmericas,
  HiCpuChip,
  HiRocketLaunch,
  HiArrowRight,
  HiArrowDown,
} from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// Brand Colors
const colors = {
  accent: "#0A5FA8", // deep royal blue, confident & refined
  main: "#16253B", // near-navy with richness, not flat
  light: "#3F5F8C", // muted steel blue, understated
  pale: "#E6EEF6", // cool, elegant light background
  cream: "#FBFAF8", // soft luxury white
  ivory: "#EEECE6", // warm stone ivory
};

export default function Benefits() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef([]);

  const benefits = [
    {
      icon: HiAcademicCap,
      title: "Learn",
      highlight: "Without Limits",
      description:
        "Access exclusive Microsoft Learn paths, industry certifications, and private workshops led by Microsoft engineers.",
      stat: "500+",
      statLabel: "Learning Paths",
      features: [
        "Microsoft Learn Access",
        "Private Workshops",
        "Certification Prep",
      ],
    },
    {
      icon: HiCpuChip,
      title: "Build",
      highlight: "Enterprise Grade",
      description:
        "$150 monthly Azure credits to architect and deploy production-ready applications at scale.",
      stat: "$1,800",
      statLabel: "Annual Credits",
      features: [
        "Azure Cloud Credits",
        "GitHub Enterprise",
        "VS Code Extensions",
      ],
    },
    {
      icon: HiGlobeAmericas,
      title: "Connect",
      highlight: "Globally",
      description:
        "Join an elite network of 100,000+ student technologists across 100+ countries worldwide.",
      stat: "100+",
      statLabel: "Countries",
      features: ["Global Network", "Regional Chapters", "Annual Summit Access"],
    },
    {
      icon: HiRocketLaunch,
      title: "Launch",
      highlight: "Your Career",
      description:
        "Direct pathways to internships, full-time roles, and exclusive recruitment events at Microsoft.",
      stat: "85%",
      statLabel: "Placement Rate",
      features: ["Career Mentorship", "Resume Reviews", "Interview Prep"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from(".hero-char", {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        },
      });

      // Scroll indicator fade out
      gsap.to(".scroll-indicator", {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      // Cards staggered reveal
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
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
        scaleX: 0,
        duration: 1.5,
        ease: "power4.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ background: colors.cream }}
    >
      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Elements */}
      <div
        className="absolute top-0 left-1/4 w-px h-full origin-top deco-line"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}10, transparent)`,
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-px h-full origin-top deco-line"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}10, transparent)`,
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute top-40 right-20 w-64 h-64 opacity-[0.03] hidden lg:block">
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
            r="35"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-4 mb-10">
            <div className="w-12 h-px" style={{ background: colors.main }} />
            <span
              className="text-xs tracking-[0.4em] uppercase font-medium"
              style={{ color: colors.light }}
            >
              Member Benefits
            </span>
            <div className="w-12 h-px" style={{ background: colors.main }} />
          </div>

          {/* Main Heading */}
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-[0.95] tracking-tight mb-8"
            style={{ color: colors.main }}
          >
            {"Unlock Your".split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            <span className="font-normal" style={{ color: colors.accent }}>
              {"Potential".split("").map((char, i) => (
                <span
                  key={`p-${i}`}
                  className="hero-char inline-block"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>

          <p
            className="text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.light }}
          >
            Discover the exclusive privileges reserved for members of our elite
            community.
          </p>

          {/* Scroll Indicator */}
          <div
            className="scroll-indicator mt-16 flex flex-col items-center gap-3"
            style={{ color: colors.light }}
          >
            <span className="text-xs tracking-[0.3em] uppercase">
              Scroll to explore
            </span>
            <div
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
              style={{ borderColor: `${colors.main}30` }}
            >
              <div
                className="w-1 h-2 rounded-full animate-bounce"
                style={{ background: colors.accent }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {benefits.map((benefit, i) => (
          <BenefitCard
            key={benefit.title}
            ref={(el) => (cardsRef.current[i] = el)}
            benefit={benefit}
            index={i}
            colors={colors}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div
        className="relative py-14 sm:py-22 px-4 sm:px-6 lg:px-8 border-t"
        style={{ background: colors.main, borderColor: `${colors.accent}20` }}
      ></div>
    </section>
  );
}

// Benefit Card Component
const BenefitCard = memo(function BenefitCard({ benefit, index, colors }, ref) {
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="mb-24 sm:mb-32 lg:mb-40 last:mb-0">
      <div
        className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Text Content */}
        <div className={!isEven ? "lg:order-2" : ""}>
          <div className="flex items-center gap-4 mb-8">
            <span
              className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{ color: colors.accent }}
            >
              0{index + 1}
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `${colors.main}15` }}
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center border"
              style={{
                background: colors.pale,
                borderColor: `${colors.accent}30`,
              }}
            >
              <benefit.icon
                className="w-6 h-6"
                style={{ color: colors.accent }}
              />
            </div>
          </div>

          <h3
            className="text-4xl sm:text-5xl lg:text-6xl font-thin mb-2"
            style={{ color: `${colors.main}40` }}
          >
            {benefit.title}
          </h3>
          <p
            className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-6"
            style={{ color: colors.accent }}
          >
            {benefit.highlight}
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            style={{ color: colors.light }}
          >
            {benefit.description}
          </p>

          {/* Features List */}
          <div className="space-y-3">
            {benefit.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 flex items-center justify-center"
                  style={{ background: `${colors.accent}10` }}
                >
                  <FaCheck
                    className="text-xs"
                    style={{ color: colors.accent }}
                  />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.main }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat Card */}
        <div className={`${!isEven ? "lg:order-1" : ""} flex justify-center`}>
          <StatCard
            stat={benefit.stat}
            label={benefit.statLabel}
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
});

// Stat Card Component
const StatCard = memo(function StatCard({ stat, label, colors }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(card, {
      rotateX: (y - rect.height / 2) / 30,
      rotateY: (rect.width / 2 - x) / 30,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
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
      className="relative p-12 sm:p-16 border"
      style={{
        background: colors.ivory,
        borderColor: `${colors.main}10`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
          <path
            d="M100 0 L100 100 L0 100"
            fill="none"
            stroke={colors.main}
            strokeWidth="1"
          />
        </svg>
      </div>

      <div
        className="text-7xl sm:text-8xl lg:text-9xl font-thin tracking-tight"
        style={{ color: colors.main }}
      >
        {stat}
      </div>
      <div
        className="mt-4 text-sm tracking-[0.2em] uppercase"
        style={{ color: colors.light }}
      >
        {label}
      </div>

      {/* Subtle Glow */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.accent}05 0%, transparent 70%)`,
        }}
      />
    </div>
  );
});
