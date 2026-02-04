// TeamPremium.jsx - Enhanced 3D team grid (Optimized)
import { useEffect, useRef, memo, useCallback, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaGithub, FaTwitter, FaQuoteLeft } from "react-icons/fa";
import { HiArrowRight, HiSparkles, HiUserGroup } from "react-icons/hi2";

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
  main02: `${COLORS.main}05`,
  main05: `${COLORS.main}0D`,
  main08: `${COLORS.main}14`,
  main10: `${COLORS.main}1A`,
  main15: `${COLORS.main}26`,
  main20: `${COLORS.main}33`,
  main30: `${COLORS.main}4D`,
  main40: `${COLORS.main}66`,
  main90: `${COLORS.main}E6`,
  accent10: `${COLORS.accent}1A`,
  accent20: `${COLORS.accent}33`,
  accent30: `${COLORS.accent}4D`,
  light50: `${COLORS.light}80`,
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

// Tier configurations
const TIER_CONFIG = Object.freeze({
  Gold: {
    bg: COLORS.ivory,
    text: COLORS.main,
    border: COLORS.main,
    dot: COLORS.accent,
  },
  Beta: {
    bg: COLORS.pale,
    text: COLORS.accent,
    border: COLORS.accent,
    dot: COLORS.accent,
  },
  Alpha: {
    bg: DERIVED.main10,
    text: COLORS.main,
    border: COLORS.main,
    dot: COLORS.light,
  },
});

// Team data - frozen and outside component
const TEAM_LEADERS = Object.freeze([
  {
    id: "ahmed-ali",
    name: "Ahmed Ali",
    role: "Chapter Lead / President",
    bio: "Passionate about empowering students through technology and community building. Leading the chapter with vision and dedication.",
    image: "/People/ahmed.jpeg",
    tier: "Gold",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: "huzaifa-imran",
    name: "Huzaifa Imran",
    role: "Tech Lead",
    bio: "Full-stack developer with a love for cloud architecture and mentoring. Building the technical foundation of our community.",
    image: "/People/huzaifa.jpeg",
    tier: "Gold",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
]);

const TEAM_MEMBERS = Object.freeze([
  {
    id: "shoaib-ali",
    name: "Shoaib Ali",
    role: "Chairman Editorial Board",
    image: "/People/shoaib.png",
    tier: "Beta",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "ayaz-ahmed",
    name: "Ayaz Ahmed",
    role: "Creative Lead",
    image: "/People/ayaz.jpeg",
    tier: "Beta",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "usman-shah",
    name: "Usman Shah",
    role: "Content Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "ayesha-malik",
    name: "Ayesha Malik",
    role: "Design Lead",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "ali-hassan",
    name: "Ali Hassan",
    role: "Dev Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "zainab-iqbal",
    name: "Zainab Iqbal",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    tier: "Beta",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
]);

// Social link configurations
const SOCIAL_ICONS = Object.freeze({
  linkedin: { icon: FaLinkedin, label: "LinkedIn" },
  github: { icon: FaGithub, label: "GitHub" },
  twitter: { icon: FaTwitter, label: "Twitter" },
});

// Noise texture SVG
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ============================================
// CUSTOM HOOKS
// ============================================

function useTeamAnimations(sectionRef, leaderCardsRef, memberCardsRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".team-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Leader cards with stagger
      leaderCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotateY: -10,
          scale: 0.95,
          duration: 1,
          delay: 0.2 + i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            once: true,
          },
        });
      });

      // Member cards with wave effect
      memberCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          delay: 0.4 + i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            once: true,
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
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      // CTA section
      gsap.from(".team-cta", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-cta",
          start: "top 85%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, leaderCardsRef, memberCardsRef]);
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
      className="absolute top-0 left-[20%] w-px h-full opacity-30 deco-line origin-top hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main20}, transparent)`,
      }}
      aria-hidden="true"
    />
    <div
      className="absolute top-0 right-[20%] w-px h-full opacity-30 deco-line origin-top hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main20}, transparent)`,
      }}
      aria-hidden="true"
    />
  </>
));
DecorativeLines.displayName = "DecorativeLines";

const FloatingGeometry = memo(() => (
  <>
    <div
      className="absolute top-40 right-16 w-32 h-32 opacity-[0.04] float-element hidden lg:block"
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
    <div
      className="absolute bottom-40 left-16 w-24 h-24 opacity-[0.04] float-element hidden lg:block"
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
        />
        <rect
          x="25"
          y="25"
          width="50"
          height="50"
          fill="none"
          stroke={COLORS.main}
          strokeWidth="0.5"
        />
      </svg>
    </div>
  </>
));
FloatingGeometry.displayName = "FloatingGeometry";

const SectionHeader = memo(() => (
  <header className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
    {/* Badge */}
    <div className="team-header inline-flex items-center gap-4 mb-8">
      <div
        className="w-12 sm:w-16 h-px origin-right"
        style={{ background: DERIVED.main30 }}
        aria-hidden="true"
      />
      <span
        className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-semibold"
        style={STYLES.lightText}
      >
        The Leadership
      </span>
      <div
        className="w-12 sm:w-16 h-px origin-left"
        style={{ background: DERIVED.main30 }}
        aria-hidden="true"
      />
    </div>

    {/* Title */}
    <h1
      className="team-header text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tight leading-[1.05]"
      style={STYLES.mainText}
    >
      Meet the{" "}
      <span className="font-normal" style={STYLES.accentText}>
        Visionaries
      </span>
    </h1>

    {/* Description */}
    <p
      className="team-header mt-6 text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed"
      style={STYLES.lightText}
    >
      The exceptional individuals who lead our community with passion,
      expertise, and an unwavering commitment to excellence.
    </p>
  </header>
));
SectionHeader.displayName = "SectionHeader";

const SectionDivider = memo(({ icon: Icon, label, count }) => (
  <div className="flex items-center gap-4 mb-10">
    {Icon && <Icon style={STYLES.accentText} aria-hidden="true" />}
    <span
      className="text-[11px] tracking-[0.2em] uppercase font-semibold"
      style={STYLES.lightText}
    >
      {label}
    </span>
    <div className="h-px flex-1" style={{ background: DERIVED.main15 }} />
    {count !== undefined && (
      <span className="text-xs tracking-wider" style={STYLES.lightText}>
        {count} Members
      </span>
    )}
  </div>
));
SectionDivider.displayName = "SectionDivider";

const SocialLink = memo(function SocialLink({ href, icon: Icon, label }) {
  const linkRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < 768) return;
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${label} profile`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
      style={{
        ...STYLES.whiteBg,
        borderColor: DERIVED.main15,
        color: COLORS.light,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = COLORS.accent;
        e.currentTarget.style.color = COLORS.accent;
        e.currentTarget.style.background = COLORS.pale;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = DERIVED.main15;
        e.currentTarget.style.color = COLORS.light;
        e.currentTarget.style.background = "white";
      }}
    >
      <Icon size={16} aria-hidden="true" />
    </a>
  );
});
SocialLink.displayName = "SocialLink";

const MiniSocialLink = memo(function MiniSocialLink({
  href,
  icon: Icon,
  label,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${label} profile`}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 transition-all duration-300 hover:bg-white hover:scale-110"
      style={{ color: COLORS.main }}
    >
      <Icon size={14} aria-hidden="true" />
    </a>
  );
});
MiniSocialLink.displayName = "MiniSocialLink";

const TierBadge = memo(({ tier, variant = "default" }) => {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.Beta;

  if (variant === "dot") {
    return (
      <div
        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
        style={{
          background: config.dot,
          boxShadow: `0 0 8px ${config.dot}`,
        }}
        aria-label={`${tier} tier member`}
      />
    );
  }

  return (
    <span
      className="inline-block px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase"
      style={{
        background: config.bg,
        color: config.text,
      }}
    >
      {tier} Ambassador
    </span>
  );
});
TierBadge.displayName = "TierBadge";

const ImageWithSkeleton = memo(({ src, alt, onLoad, loaded, className }) => (
  <>
    {!loaded && (
      <div
        className="absolute inset-0 animate-pulse"
        style={STYLES.paleBg}
        aria-hidden="true"
      />
    )}
    <img
      src={src}
      alt={alt}
      onLoad={onLoad}
      loading="lazy"
      className={`w-full h-full object-cover transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className || ""}`}
    />
  </>
));
ImageWithSkeleton.displayName = "ImageWithSkeleton";

// Leader Card Component - Featured with 3D effect
const LeaderCard = memo(function LeaderCard({ member }, ref) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
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

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    // Update glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: 1.05,
      x: (x - centerX) / 20,
      y: (y - centerY) / 20,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(glareRef.current, {
      opacity: 0.1,
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

  // Combine refs
  const setRefs = useCallback(
    (el) => {
      cardRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    },
    [ref],
  );

  return (
    <article
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border overflow-hidden cursor-pointer"
      style={{
        ...STYLES.whiteBg,
        borderColor: DERIVED.main10,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      }}
      aria-labelledby={`leader-${member.id}-name`}
    >
      {/* Glare Effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-20"
        style={{ mixBlendMode: "overlay" }}
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2">
        {/* Image Section */}
        <div
          className="relative h-64 md:h-auto md:min-h-[320px] overflow-hidden"
          style={STYLES.ivoryBg}
        >
          <div ref={imageRef} className="w-full h-full">
            <ImageWithSkeleton
              src={member.image}
              alt={`Portrait of ${member.name}`}
              onLoad={() => setImageLoaded(true)}
              loaded={imageLoaded}
            />
          </div>

          {/* Image Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${DERIVED.main40} 0%, transparent 50%)`,
            }}
            aria-hidden="true"
          />

          {/* Tier Badge */}
          <div className="absolute top-4 left-4">
            <TierBadge tier={member.tier} />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Role */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: COLORS.accent }} />
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-medium"
                style={STYLES.lightText}
              >
                {member.role}
              </span>
            </div>

            {/* Name */}
            <h2
              id={`leader-${member.id}-name`}
              className="text-2xl sm:text-3xl font-light mb-4"
              style={STYLES.mainText}
            >
              {member.name}
            </h2>

            {/* Bio */}
            <div className="relative mb-6">
              <FaQuoteLeft
                className="absolute -top-1 -left-1 text-xl opacity-10"
                style={STYLES.mainText}
                aria-hidden="true"
              />
              <p
                className="text-sm leading-relaxed pl-5"
                style={STYLES.lightText}
              >
                {member.bio}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {member.linkedin && (
              <SocialLink
                href={member.linkedin}
                icon={FaLinkedin}
                label="LinkedIn"
              />
            )}
            {member.github && (
              <SocialLink href={member.github} icon={FaGithub} label="GitHub" />
            )}
            {member.twitter && (
              <SocialLink
                href={member.twitter}
                icon={FaTwitter}
                label="Twitter"
              />
            )}

            <div className="ml-auto">
              <span
                className="text-xs font-medium tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={STYLES.accentText}
              >
                VIEW PROFILE
                <HiArrowRight aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${COLORS.accent}, ${COLORS.main})`,
        }}
        aria-hidden="true"
      />
    </article>
  );
});
LeaderCard.displayName = "LeaderCard";

// Member Card Component - Compact 3D card
const MemberCard = memo(function MemberCard({ member, index }, ref) {
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

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(imageContainerRef.current, {
      scale: 1.08,
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

  // Combine refs
  const setRefs = useCallback(
    (el) => {
      cardRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    },
    [ref],
  );

  const cardShadow = useMemo(
    () => ({
      boxShadow: isHovered
        ? "0 25px 50px rgba(0,0,0,0.1)"
        : "0 4px 15px rgba(0,0,0,0.03)",
      transition: "box-shadow 0.3s ease",
    }),
    [isHovered],
  );

  return (
    <article
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
      aria-labelledby={`member-${member.id}-name`}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden border"
        style={{
          ...STYLES.whiteBg,
          borderColor: DERIVED.main10,
          ...cardShadow,
        }}
      >
        {/* Image Container */}
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={STYLES.ivoryBg}
        >
          <div ref={imageContainerRef} className="w-full h-full">
            <ImageWithSkeleton
              src={member.image}
              alt={`Portrait of ${member.name}`}
              onLoad={() => setImageLoaded(true)}
              loaded={imageLoaded}
            />
          </div>

          {/* Hover Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0"
            style={{
              background: `linear-gradient(to top, ${DERIVED.main90} 0%, ${DERIVED.main40} 40%, transparent 100%)`,
            }}
            aria-hidden="true"
          >
            {/* Social Links */}
            <div className="flex gap-2">
              {member.linkedin && (
                <MiniSocialLink
                  href={member.linkedin}
                  icon={FaLinkedin}
                  label="LinkedIn"
                />
              )}
              {member.github && (
                <MiniSocialLink
                  href={member.github}
                  icon={FaGithub}
                  label="GitHub"
                />
              )}
            </div>
          </div>

          {/* Tier Dot */}
          <TierBadge tier={member.tier} variant="dot" />
        </div>

        {/* Info Section */}
        <div className="p-4 text-center">
          <h3
            id={`member-${member.id}-name`}
            className="text-sm font-semibold mb-1 truncate"
            style={STYLES.mainText}
          >
            {member.name}
          </h3>
          <p className="text-xs truncate" style={STYLES.lightText}>
            {member.role}
          </p>

          {/* Tier Tag */}
          <div className="mt-3">
            <span
              className="inline-block px-2 py-1 text-[9px] font-bold tracking-wider uppercase"
              style={{
                background: TIER_CONFIG[member.tier]?.bg || COLORS.pale,
                color: TIER_CONFIG[member.tier]?.text || COLORS.accent,
              }}
            >
              {member.tier}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Shadow Layer */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-300 rounded"
        style={{
          background: COLORS.main,
          opacity: isHovered ? 0.08 : 0,
          transform: "translateY(8px) translateZ(-10px)",
          filter: "blur(12px)",
        }}
        aria-hidden="true"
      />
    </article>
  );
});
MemberCard.displayName = "MemberCard";

const JoinCTA = memo(() => (
  <div
    className="team-cta mt-20 sm:mt-28 p-8 sm:p-12 lg:p-16 border relative overflow-hidden"
    style={{ ...STYLES.ivoryBg, borderColor: DERIVED.main10 }}
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
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
            <circle cx="20" cy="20" r="1" fill={COLORS.main} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#team-pattern)" />
      </svg>
    </div>

    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="text-center lg:text-left">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-light mb-3"
          style={STYLES.mainText}
        >
          Ready to join our{" "}
          <span className="font-normal" style={STYLES.accentText}>
            elite team
          </span>
          ?
        </h2>
        <p className="text-base sm:text-lg" style={STYLES.lightText}>
          We're always looking for passionate individuals to lead and inspire.
        </p>
      </div>

      <a
        href="#contact"
        className="group inline-flex items-center gap-3 px-8 py-4 font-semibold tracking-wider text-sm text-white transition-all duration-300 hover:gap-5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          ...STYLES.mainBg,
          "--tw-ring-color": COLORS.main,
        }}
      >
        APPLY FOR MEMBERSHIP
        <HiArrowRight
          className="transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </div>
  </div>
));
JoinCTA.displayName = "JoinCTA";

// ============================================
// MAIN COMPONENT
// ============================================

export default function TeamPremium() {
  const sectionRef = useRef(null);
  const leaderCardsRef = useRef([]);
  const memberCardsRef = useRef([]);

  // Custom hook for all animations
  useTeamAnimations(sectionRef, leaderCardsRef, memberCardsRef);

  // Memoized ref setters
  const setLeaderRef = useCallback((el, i) => {
    leaderCardsRef.current[i] = el;
  }, []);

  const setMemberRef = useCallback((el, i) => {
    memberCardsRef.current[i] = el;
  }, []);

  // Memoized leader cards
  const leaderCards = useMemo(
    () =>
      TEAM_LEADERS.map((leader, i) => (
        <LeaderCard
          key={leader.id}
          ref={(el) => setLeaderRef(el, i)}
          member={leader}
        />
      )),
    [setLeaderRef],
  );

  // Memoized member cards
  const memberCards = useMemo(
    () =>
      TEAM_MEMBERS.map((member, i) => (
        <MemberCard
          key={member.id}
          ref={(el) => setMemberRef(el, i)}
          member={member}
          index={i}
        />
      )),
    [setMemberRef],
  );

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={STYLES.section}
      aria-labelledby="team-heading"
    >
      <GrainOverlay />
      <DecorativeLines />
      <FloatingGeometry />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        {/* Leadership Cards - Featured */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <SectionDivider icon={HiSparkles} label="Core Leadership" />
          <div
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
            role="list"
            aria-label="Leadership team"
          >
            {leaderCards}
          </div>
        </div>

        {/* Team Members Grid */}
        <div>
          <SectionDivider
            icon={HiUserGroup}
            label="Team Members"
            count={TEAM_MEMBERS.length}
          />
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6"
            role="list"
            aria-label="Team members"
          >
            {memberCards}
          </div>
        </div>

        {/* Join CTA Section */}
        <JoinCTA />
      </div>
    </section>
  );
}
