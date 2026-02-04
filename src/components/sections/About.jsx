// AboutEditorial.jsx - Magazine-style editorial layout
import { useEffect, useRef, memo, useCallback } from "react";
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

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal line reveal
      gsap.from(".h-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Content fade in
      gsap.from(".fade-in", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Parallax images/cards
      gsap.utils.toArray(".parallax-card").forEach((card, i) => {
        gsap.to(card, {
          yPercent: i % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
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

      {/* Large Display Header */}
      <div
        className="relative border-b"
        style={{ borderColor: `${colors.main}10` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            {/* Left - Small Text */}
            <div className="lg:col-span-4 fade-in">
              <div className="flex items-center gap-4 mb-6">
                <RiMicrosoftFill
                  className="text-xl"
                  style={{ color: colors.main }}
                />
                <div
                  className="h-px flex-1"
                  style={{ background: `${colors.main}20` }}
                />
              </div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: colors.light }}
              >
                Official Program
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: colors.main }}
              >
                The Microsoft Learn Student Ambassadors program is a global
                community of campus leaders who are eager to help fellow
                students.
              </p>
            </div>

            {/* Right - Large Typography */}
            <div className="lg:col-span-8">
              <h2
                className="fade-in text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-[0.95] tracking-tight"
                style={{ color: colors.main }}
              >
                Where
                <span
                  className="block font-normal"
                  style={{ color: colors.accent }}
                >
                  Ambition
                </span>
                Meets
                <span className="block font-light">Excellence</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Horizontal Divider with Stats */}
        <div
          className="h-line origin-left border-t"
          style={{ borderColor: `${colors.main}15` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="grid grid-cols-4 divide-x"
              style={{ borderColor: `${colors.main}10` }}
            >
              {[
                { value: "100K+", label: "Members" },
                { value: "100+", label: "Countries" },
                { value: "3%", label: "Accept Rate" },
                { value: "2020", label: "Established" },
              ].map((stat) => (
                <div key={stat.label} className="py-6 text-center">
                  <p
                    className="text-2xl sm:text-3xl font-thin"
                    style={{ color: colors.main }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mt-1"
                    style={{ color: colors.light }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Editorial Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="space-y-16">
            {/* The Journey Section */}
            <div className="fade-in">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ color: colors.accent }}
                >
                  01
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: `${colors.main}15` }}
                />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: colors.light }}
                >
                  The Journey
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-light mb-6"
                style={{ color: colors.main }}
              >
                Four Pillars of Growth
              </h3>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: colors.light }}
              >
                Our program is built on a foundation of continuous learning,
                hands-on building, global connection, and community leadership.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: FaGraduationCap,
                    title: "Learn",
                    desc: "Master cutting-edge technologies",
                  },
                  {
                    icon: FaLaptopCode,
                    title: "Build",
                    desc: "Create real-world solutions",
                  },
                  {
                    icon: FaGlobe,
                    title: "Connect",
                    desc: "Join a global network",
                  },
                  {
                    icon: FaUsers,
                    title: "Lead",
                    desc: "Mentor your community",
                  },
                ].map((item) => (
                  <EditorialFeatureRow
                    key={item.title}
                    {...item}
                    colors={colors}
                  />
                ))}
              </div>
            </div>

            {/* Quote Block */}
            <div
              className="parallax-card p-8 sm:p-10 border-l-2"
              style={{
                background: colors.ivory,
                borderColor: colors.accent,
              }}
            >
              <FaQuoteLeft
                className="text-2xl mb-6"
                style={{ color: `${colors.accent}30` }}
              />
              <blockquote
                className="text-xl sm:text-2xl font-light italic leading-relaxed mb-6"
                style={{ color: colors.main }}
              >
                "Being an ambassador opened doors I never knew existed. The
                network, the resources, the mentorship — it transformed my
                career trajectory."
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ background: `${colors.main}10` }}
                />
                <div>
                  <p
                    className="font-medium text-sm"
                    style={{ color: colors.main }}
                  >
                    Sarah Chen
                  </p>
                  <p className="text-xs" style={{ color: colors.light }}>
                    Gold Ambassador, Stanford '24
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {/* The Standard Card */}
            <div
              className="parallax-card fade-in p-8 sm:p-10 lg:p-12"
              style={{ background: colors.main }}
            >
              <div className="flex items-center gap-3 mb-8">
                <HiOutlineSparkles
                  className="text-xl"
                  style={{ color: colors.accent }}
                />
                <span className="text-xs tracking-[0.2em] uppercase">
                  The Standard
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
                Reserved for the Exceptional
              </h3>
              <p
                className="leading-relaxed mb-8"
                style={{ color: `${colors.accent}90` }}
              >
                With a 3% acceptance rate, our ambassadors represent the
                absolute pinnacle of student talent worldwide. Each member is
                carefully selected for their technical prowess and leadership
                potential.
              </p>

              <div className="space-y-3">
                {[
                  "Technical Excellence Required",
                  "Leadership Potential Assessed",
                  "Community Impact Evaluated",
                  "Continuous Performance Review",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheck
                      className="text-xs"
                      style={{ color: colors.accent }}
                    />
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="fade-in">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ color: colors.accent }}
                >
                  02
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: `${colors.main}15` }}
                />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: colors.light }}
                >
                  Privileges
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-light mb-6"
                style={{ color: colors.main }}
              >
                Member Benefits
              </h3>

              <div className="space-y-4">
                {[
                  { text: "$150/month Azure Credits", highlight: true },
                  { text: "GitHub Enterprise Access", highlight: false },
                  { text: "Microsoft 365 E5 Suite", highlight: false },
                  { text: "Free Certification Vouchers", highlight: true },
                  { text: "LinkedIn Learning Premium", highlight: false },
                  { text: "Global Summit Invitations", highlight: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border group cursor-pointer hover:shadow-sm transition-all"
                    style={{
                      background: item.highlight ? `${colors.pale}50` : "white",
                      borderColor: item.highlight
                        ? `${colors.accent}20`
                        : `${colors.main}10`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: item.highlight
                            ? colors.accent
                            : colors.light,
                        }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors.main }}
                      >
                        {item.text}
                      </span>
                    </div>
                    <HiArrowRight
                      className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: colors.accent }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width CTA */}
      <div
        className="border-t"
        style={{ background: colors.main, borderColor: `${colors.accent}20` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: "#4ADE80" }}
                />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: colors.accent }}
                >
                  Now Accepting Applications
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white">
                Ready to join the elite?
              </h3>
              <p className="mt-2" style={{ color: `${colors.accent}70` }}>
                Applications for Spring 2025 cohort are now open.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white font-medium tracking-wider text-sm transition-all hover:bg-opacity-90"
                style={{ color: colors.main }}
              >
                APPLY NOW
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border font-medium tracking-wider text-sm transition-all hover:bg-white/5"
                style={{ borderColor: `${colors.accent}40`, color: "white" }}
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* University Logos */}
      <div
        className="py-16 px-4 sm:px-6 lg:px-8 border-t"
        style={{ borderColor: `${colors.main}10` }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center text-xs tracking-[0.3em] uppercase mb-10"
            style={{ color: colors.light }}
          >
            Our ambassadors represent leading institutions worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              "MIT",
              "Stanford",
              "Oxford",
              "Cambridge",
              "Harvard",
              "IIT",
              "ETH Zurich",
              "NUS",
            ].map((uni) => (
              <span
                key={uni}
                className="text-lg font-light tracking-wider opacity-30 hover:opacity-60 transition-opacity cursor-default"
                style={{ color: colors.main }}
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Editorial Feature Row
const EditorialFeatureRow = memo(function EditorialFeatureRow({
  icon: Icon,
  title,
  desc,
  colors,
}) {
  return (
    <div
      className="group flex items-center gap-4 p-4 border-b cursor-pointer transition-all hover:pl-6"
      style={{ borderColor: `${colors.main}10` }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center transition-colors"
        style={{ background: `${colors.pale}` }}
      >
        <Icon className="text-sm" style={{ color: colors.accent }} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm" style={{ color: colors.main }}>
          {title}
        </p>
        <p className="text-xs" style={{ color: colors.light }}>
          {desc}
        </p>
      </div>
      <HiArrowRight
        className="text-sm opacity-0 group-hover:opacity-100 transition-all"
        style={{ color: colors.accent }}
      />
    </div>
  );
});
