// TeamPremium.jsx - Enhanced 3D team grid with Unsplash images
import { useEffect, useRef, memo, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaGithub, FaTwitter, FaQuoteLeft } from "react-icons/fa";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";

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

// Team data with Unsplash images
const teamLeaders = [
  {
    name: "Ahmed Ali",
    role: "Chapter Lead/President",
    bio: "Passionate about empowering students through technology and community building.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    tier: "Gold",
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    name: "Huzaifa Imran",
    role: "Tech Lead",
    bio: "Full-stack developer with a love for cloud architecture and mentoring.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    tier: "Gold",
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
];

const teamMembers = [
  {
    name: "Shoaib Ali",
    role: "Chairman Editorial Board",
    image: "/People/shoaib.png",
    tier: "Beta",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Fatima Zahra",
    role: "Community Lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Usman Shah",
    role: "Content Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Ayesha Malik",
    role: "Design Lead",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Ali Hassan",
    role: "Dev Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Zainab Iqbal",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "#",
    github: "#",
  },
];

export default function TeamPremium() {
  const sectionRef = useRef(null);
  const leaderCardsRef = useRef([]);
  const memberCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with character reveal
      gsap.from(".team-header", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Leader cards with stagger
      leaderCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateY: -15,
          scale: 0.9,
          duration: 1,
          delay: 0.3 + i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      });

      // Member cards with wave effect
      memberCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.85,
          duration: 0.8,
          delay: 0.6 + i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          },
        });
      });

      // Floating decorative elements
      gsap.to(".float-element", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Decorative lines
      gsap.from(".deco-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: colors.cream }}
    >
      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Lines */}
      <div
        className="absolute top-0 left-[20%] w-px h-full opacity-30 deco-line origin-top"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}20, transparent)`,
        }}
      />
      <div
        className="absolute top-0 right-[20%] w-px h-full opacity-30 deco-line origin-top"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}20, transparent)`,
        }}
      />

      {/* Floating Geometric Elements */}
      <div className="absolute top-40 right-16 w-32 h-32 opacity-[0.04] float-element hidden lg:block">
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
        className="absolute bottom-40 left-16 w-24 h-24 opacity-[0.04] float-element hidden lg:block"
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
          />
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            fill="none"
            stroke={colors.main}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="team-header inline-flex items-center gap-4 mb-8">
            <div
              className="w-16 h-px origin-right"
              style={{ background: colors.main }}
            />
            <span
              className="text-xs tracking-[0.4em] uppercase font-medium"
              style={{ color: colors.light }}
            >
              The Leadership
            </span>
            <div
              className="w-16 h-px origin-left"
              style={{ background: colors.main }}
            />
          </div>

          <h2
            className="team-header text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tight leading-[1.1]"
            style={{ color: colors.main }}
          >
            Meet the{" "}
            <span className="font-normal" style={{ color: colors.accent }}>
              Visionaries
            </span>
          </h2>

          <p
            className="team-header mt-6 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.light }}
          >
            The exceptional individuals who lead our community with passion,
            expertise, and an unwavering commitment to excellence.
          </p>
        </div>

        {/* Leadership Cards - Featured */}
        <div className="mb-20 sm:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <HiSparkles style={{ color: colors.accent }} />
            <span
              className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{ color: colors.light }}
            >
              Core Leadership
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `${colors.main}15` }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {teamLeaders.map((leader, i) => (
              <LeaderCard
                key={leader.name}
                ref={(el) => (leaderCardsRef.current[i] = el)}
                member={leader}
                colors={colors}
              />
            ))}
          </div>
        </div>

        {/* Team Members Grid */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span
              className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{ color: colors.light }}
            >
              Team Members
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `${colors.main}15` }}
            />
            <span
              className="text-xs tracking-wider"
              style={{ color: colors.light }}
            >
              {teamMembers.length} Members
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {teamMembers.map((member, i) => (
              <MemberCard
                key={member.name}
                ref={(el) => (memberCardsRef.current[i] = el)}
                member={member}
                colors={colors}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Join CTA Section */}
        <div
          className="mt-20 sm:mt-28 p-8 sm:p-12 lg:p-16 border relative overflow-hidden"
          style={{ background: colors.ivory, borderColor: `${colors.main}10` }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="team-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="1" fill={colors.main} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#team-pattern)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-light mb-3"
                style={{ color: colors.main }}
              >
                Ready to join our{" "}
                <span className="font-normal" style={{ color: colors.accent }}>
                  elite team
                </span>
                ?
              </h3>
              <p style={{ color: colors.light }} className="text-lg">
                We're always looking for passionate individuals to lead and
                inspire.
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 font-medium tracking-wider text-sm text-white transition-all hover:gap-5"
              style={{ background: colors.main }}
            >
              APPLY FOR MEMBERSHIP
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Leader Card Component - Featured with 3D effect
const LeaderCard = memo(function LeaderCard({ member, colors }, ref) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const glareRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    // Update glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    gsap.to(imageRef.current, {
      scale: 1.08,
      x: (x - centerX) / 15,
      y: (y - centerY) / 15,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(glareRef.current, {
      opacity: 0.15,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
      duration: 0.3,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(imageRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(glareRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  }, []);

  const tierConfig = {
    Gold: {
      bg: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
      text: "#B45309",
      border: "#F59E0B",
      glow: "rgba(245, 158, 11, 0.3)",
    },
    Beta: {
      bg: colors.pale,
      text: colors.accent,
      border: colors.accent,
      glow: `${colors.accent}30`,
    },
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (ref) ref(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border overflow-hidden cursor-pointer"
      style={{
        background: "white",
        borderColor: `${colors.main}10`,
        transformStyle: "preserve-3d",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      }}
    >
      {/* Glare Effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-20"
        style={{ mixBlendMode: "overlay" }}
      />

      <div className="grid md:grid-cols-2">
        {/* Image Section */}
        <div
          className="relative h-64 md:h-auto overflow-hidden"
          style={{ background: colors.ivory }}
        >
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: colors.pale }}
            />
          )}

          <img
            ref={imageRef}
            src={member.image}
            alt={member.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          />

          {/* Image Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, ${colors.main}40 0%, transparent 50%)`,
            }}
          />

          {/* Tier Badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: tierConfig[member.tier].bg,
              color: tierConfig[member.tier].text,
              boxShadow: `0 4px 15px ${tierConfig[member.tier].glow}`,
            }}
          >
            {member.tier} Ambassador
          </div>
        </div>

        {/* Content Section */}
        <div
          ref={contentRef}
          className="p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: colors.accent }} />
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: colors.light }}
              >
                {member.role}
              </span>
            </div>

            <h3
              className="text-2xl sm:text-3xl font-light mb-4"
              style={{ color: colors.main }}
            >
              {member.name}
            </h3>

            <div className="relative mb-6">
              <FaQuoteLeft
                className="absolute -top-2 -left-1 opacity-10"
                style={{ color: colors.main, fontSize: "24px" }}
              />
              <p
                className="text-sm leading-relaxed pl-4"
                style={{ color: colors.light }}
              >
                {member.bio}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <SocialLink
              href={member.linkedin}
              icon={FaLinkedin}
              colors={colors}
              label="LinkedIn"
            />
            <SocialLink
              href={member.github}
              icon={FaGithub}
              colors={colors}
              label="GitHub"
            />
            <SocialLink
              href={member.twitter}
              icon={FaTwitter}
              colors={colors}
              label="Twitter"
            />

            <div className="ml-auto">
              <span
                className="text-xs font-medium tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: colors.accent }}
              >
                VIEW PROFILE
                <HiArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${colors.accent}, ${colors.main})`,
        }}
      />
    </div>
  );
});

// Member Card Component - Compact 3D card
const MemberCard = memo(function MemberCard({ member, colors, index }, ref) {
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 640) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    gsap.to(imageContainerRef.current, {
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(imageContainerRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  }, []);

  const tierConfig = {
    Gold: {
      bg: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
      text: "#B45309",
    },
    Beta: {
      bg: colors.pale,
      text: colors.accent,
    },
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (ref) ref(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden border"
        style={{
          background: "white",
          borderColor: `${colors.main}10`,
          boxShadow: isHovered
            ? "0 25px 50px rgba(0,0,0,0.12)"
            : "0 4px 15px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Image Container */}
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={{ background: colors.ivory }}
        >
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: colors.pale }}
            />
          )}

          <div ref={imageContainerRef} className="w-full h-full">
            <img
              src={member.image}
              alt={member.name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Hover Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0"
            style={{
              background: `linear-gradient(to top, ${colors.main}90 0%, ${colors.main}40 40%, transparent 100%)`,
            }}
          >
            {/* Social Links */}
            <div className="flex gap-2">
              <MiniSocialLink href={member.linkedin} icon={FaLinkedin} />
              <MiniSocialLink href={member.github} icon={FaGithub} />
            </div>
          </div>

          {/* Tier Badge */}
          <div
            className="absolute top-3 right-3 w-2 h-2 rounded-full"
            style={{
              background: member.tier === "Gold" ? "#F59E0B" : colors.accent,
              boxShadow: `0 0 10px ${member.tier === "Gold" ? "#F59E0B" : colors.accent}`,
            }}
          />
        </div>

        {/* Info Section */}
        <div className="p-4 text-center">
          <h3
            className="text-sm font-medium mb-1 truncate"
            style={{ color: colors.main }}
          >
            {member.name}
          </h3>
          <p className="text-xs truncate" style={{ color: colors.light }}>
            {member.role}
          </p>

          {/* Tier Tag */}
          <div
            className="mt-3 inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase"
            style={{
              background: tierConfig[member.tier].bg,
              color: tierConfig[member.tier].text,
            }}
          >
            {member.tier}
          </div>
        </div>
      </div>

      {/* 3D Shadow Layer */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-300"
        style={{
          background: colors.main,
          opacity: isHovered ? 0.1 : 0,
          transform: "translateY(8px) translateZ(-10px)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
});

// Social Link Component
const SocialLink = memo(function SocialLink({
  href,
  icon: Icon,
  colors,
  label,
}) {
  const linkRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    gsap.to(linkRef.current, {
      y: -3,
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(linkRef.current, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      aria-label={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-10 h-10 flex items-center justify-center border transition-colors"
      style={{
        background: "white",
        borderColor: `${colors.main}15`,
        color: colors.light,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = colors.accent;
        e.currentTarget.style.color = colors.accent;
        e.currentTarget.style.background = colors.pale;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = `${colors.main}15`;
        e.currentTarget.style.color = colors.light;
        e.currentTarget.style.background = "white";
      }}
    >
      <Icon size={16} />
    </a>
  );
});

// Mini Social Link for hover overlay
const MiniSocialLink = memo(function MiniSocialLink({ href, icon: Icon }) {
  return (
    <a
      href={href}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white hover:scale-110 transition-all"
    >
      <Icon size={14} />
    </a>
  );
});
