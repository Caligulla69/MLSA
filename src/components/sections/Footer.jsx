// FooterPremium.jsx - Refined minimal footer (Optimized)
import { useRef, useEffect, memo, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa";
import { RiMicrosoftFill } from "react-icons/ri";
import { HiArrowUp, HiEnvelope, HiMapPin, HiArrowRight } from "react-icons/hi2";

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
  main50: `${COLORS.main}80`,
  accent10: `${COLORS.accent}1A`,
  accent20: `${COLORS.accent}33`,
  accent30: `${COLORS.accent}4D`,
  light20: `${COLORS.light}33`,
  light50: `${COLORS.light}80`,
  pale50: `${COLORS.pale}80`,
});

// Static style objects
const STYLES = Object.freeze({
  footer: { background: COLORS.cream, borderColor: DERIVED.main10 },
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  mainBg: { background: COLORS.main },
  paleBg: { background: COLORS.pale },
  whiteBg: { background: "white" },
});

// Social links - frozen and outside component
const SOCIALS = Object.freeze([
  {
    id: "linkedin",
    icon: FaLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  { id: "github", icon: FaGithub, href: "https://github.com", label: "GitHub" },
  {
    id: "twitter",
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    id: "discord",
    icon: FaDiscord,
    href: "https://discord.com",
    label: "Discord",
  },
  {
    id: "youtube",
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
]);

// Navigation links - frozen and outside component
const NAV_LINKS = Object.freeze([
  { id: "about", label: "About", href: "#about" },
  { id: "benefits", label: "Benefits", href: "#benefits" },
  { id: "events", label: "Events", href: "#events" },
  { id: "team", label: "Team", href: "#team" },
  { id: "contact", label: "Contact", href: "#contact" },
]);

// Resource links
const RESOURCE_LINKS = Object.freeze([
  { id: "docs", label: "Documentation", href: "#" },
  { id: "faq", label: "FAQ", href: "#" },
  { id: "blog", label: "Blog", href: "#" },
  { id: "careers", label: "Careers", href: "#" },
]);

// Legal links
const LEGAL_LINKS = Object.freeze([
  { id: "privacy", label: "Privacy Policy", href: "/privacy" },
  { id: "terms", label: "Terms of Service", href: "/terms" },
  { id: "cookies", label: "Cookie Policy", href: "/cookies" },
]);

// Noise texture SVG
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Current year for copyright
const CURRENT_YEAR = new Date().getFullYear();

// ============================================
// CUSTOM HOOKS
// ============================================

function useFooterAnimations(footerRef) {
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for footer content
      gsap.from(".footer-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
      });

      // Decorative line animation
      gsap.from(".footer-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          once: true,
        },
      });
    }, footer);

    return () => ctx.revert();
  }, [footerRef]);
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

const BrandSection = memo(() => (
  <div className="footer-content">
    {/* Logo */}
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-12 h-12 flex items-center justify-center"
        style={STYLES.mainBg}
      >
        <RiMicrosoftFill className="text-white text-xl" aria-hidden="true" />
      </div>
      <div>
        <p
          className="font-bold text-base tracking-tight"
          style={STYLES.mainText}
        >
          MLSA MUST
        </p>
        <p className="text-xs" style={STYLES.lightText}>
          Official Chapter
        </p>
      </div>
    </div>

    {/* Description */}
    <p
      className="text-sm leading-relaxed max-w-sm mb-6"
      style={STYLES.lightText}
    >
      Empowering students to become technology leaders through learning,
      building, and connecting with Microsoft technologies.
    </p>

    {/* Contact Info */}
    <div className="space-y-3">
      <a
        href="mailto:mlsa@must.edu.pk"
        className="flex items-center gap-3 text-sm group transition-colors"
        style={STYLES.lightText}
      >
        <HiEnvelope
          className="w-4 h-4 shrink-0"
          style={STYLES.accentText}
          aria-hidden="true"
        />
        <span className="group-hover:underline">mlsa@must.edu.pk</span>
      </a>
      <div className="flex items-center gap-3 text-sm" style={STYLES.lightText}>
        <HiMapPin
          className="w-4 h-4 shrink-0"
          style={STYLES.accentText}
          aria-hidden="true"
        />
        <span>MUST Campus, Mirpur, AJK</span>
      </div>
    </div>
  </div>
));
BrandSection.displayName = "BrandSection";

const LinkColumn = memo(({ title, links }) => (
  <div className="footer-content">
    <p
      className="text-[11px] tracking-[0.2em] uppercase mb-5 font-semibold"
      style={STYLES.mainText}
    >
      {title}
    </p>
    <nav aria-label={title}>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="text-sm transition-colors hover:underline underline-offset-2 inline-block"
              style={STYLES.lightText}
              onMouseEnter={(e) => (e.target.style.color = COLORS.accent)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.light)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
));
LinkColumn.displayName = "LinkColumn";

const SocialLink = memo(function SocialLink({ id, icon: Icon, href, label }) {
  const linkRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < 1024) return;
    gsap.to(linkRef.current, {
      y: -3,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(linkRef.current, {
      y: 0,
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
      aria-label={`Follow us on ${label}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-10 h-10 flex items-center justify-center border transition-all duration-300 hover:shadow-md"
      style={{
        ...STYLES.whiteBg,
        borderColor: DERIVED.main10,
        color: COLORS.light,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = COLORS.accent;
        e.currentTarget.style.color = COLORS.accent;
        e.currentTarget.style.background = DERIVED.accent10;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = DERIVED.main10;
        e.currentTarget.style.color = COLORS.light;
        e.currentTarget.style.background = "white";
      }}
    >
      <Icon size={16} aria-hidden="true" />
    </a>
  );
});
SocialLink.displayName = "SocialLink";

const SocialSection = memo(() => (
  <div className="footer-content">
    <p
      className="text-[11px] tracking-[0.2em] uppercase mb-5 font-semibold"
      style={STYLES.mainText}
    >
      Connect With Us
    </p>
    <div
      className="flex flex-wrap gap-2"
      role="list"
      aria-label="Social media links"
    >
      {SOCIALS.map((social) => (
        <SocialLink key={social.id} {...social} />
      ))}
    </div>
  </div>
));
SocialSection.displayName = "SocialSection";

const NewsletterSection = memo(() => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup");
  }, []);

  return (
    <div className="footer-content">
      <p
        className="text-[11px] tracking-[0.2em] uppercase mb-3 font-semibold"
        style={STYLES.mainText}
      >
        Stay Updated
      </p>
      <p className="text-sm mb-4" style={STYLES.lightText}>
        Get the latest updates on events and opportunities.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2.5 border text-sm transition-colors focus:outline-none min-w-0"
          style={{
            ...STYLES.whiteBg,
            borderColor: DERIVED.main15,
            color: COLORS.main,
          }}
          onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
          onBlur={(e) => (e.target.style.borderColor = DERIVED.main15)}
          aria-label="Email address for newsletter"
        />
        <button
          type="submit"
          className="px-4 py-2.5 transition-opacity hover:opacity-90 shrink-0"
          style={{ ...STYLES.mainBg, color: "white" }}
          aria-label="Subscribe to newsletter"
        >
          <HiArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
});
NewsletterSection.displayName = "NewsletterSection";

const BackToTop = memo(() => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
      style={STYLES.lightText}
      aria-label="Back to top of page"
    >
      <span className="group-hover:underline underline-offset-2">
        Back to top
      </span>
      <span
        className="w-8 h-8 flex items-center justify-center border transition-all duration-300 group-hover:shadow-md"
        style={{
          ...STYLES.whiteBg,
          borderColor: DERIVED.main10,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = COLORS.accent;
          e.currentTarget.style.background = DERIVED.accent10;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = DERIVED.main10;
          e.currentTarget.style.background = "white";
        }}
      >
        <HiArrowUp
          className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"
          style={STYLES.accentText}
          aria-hidden="true"
        />
      </span>
    </button>
  );
});
BackToTop.displayName = "BackToTop";

const LegalLinks = memo(() => (
  <nav aria-label="Legal links">
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {LEGAL_LINKS.map((link, index) => (
        <li key={link.id} className="flex items-center gap-6">
          <a
            href={link.href}
            className="text-xs transition-colors hover:underline underline-offset-2"
            style={STYLES.lightText}
            onMouseEnter={(e) => (e.target.style.color = COLORS.accent)}
            onMouseLeave={(e) => (e.target.style.color = COLORS.light)}
          >
            {link.label}
          </a>
          {index < LEGAL_LINKS.length - 1 && (
            <span
              className="hidden sm:inline"
              style={{ color: DERIVED.main20 }}
            >
              •
            </span>
          )}
        </li>
      ))}
    </ul>
  </nav>
));
LegalLinks.displayName = "LegalLinks";

const CopyrightSection = memo(() => (
  <div className="footer-content flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <p style={STYLES.lightText}>
        © {CURRENT_YEAR} MLSA MUST Chapter. All rights reserved.
      </p>
      <LegalLinks />
    </div>
    <BackToTop />
  </div>
));
CopyrightSection.displayName = "CopyrightSection";

const Acknowledgment = memo(() => (
  <div
    className="footer-content mt-8 pt-8 border-t text-center"
    style={{ borderColor: DERIVED.main10 }}
  >
    <p className="text-xs" style={STYLES.lightText}>
      A Microsoft Learn Student Ambassador initiative. Built with{" "}
      <span style={STYLES.accentText}>♥</span> by the MLSA Team.
    </p>
    <div className="flex items-center justify-center gap-2 mt-3">
      <RiMicrosoftFill
        className="text-sm"
        style={STYLES.lightText}
        aria-hidden="true"
      />
      <span className="text-xs" style={{ color: DERIVED.light50 }}>
        Powered by Microsoft
      </span>
    </div>
  </div>
));
Acknowledgment.displayName = "Acknowledgment";

// ============================================
// MAIN COMPONENT
// ============================================

export default function FooterPremium() {
  const footerRef = useRef(null);

  // Custom hook for animations
  useFooterAnimations(footerRef);

  // Memoized social links
  const socialLinks = useMemo(
    () => SOCIALS.map((social) => <SocialLink key={social.id} {...social} />),
    [],
  );

  return (
    <footer
      ref={footerRef}
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t overflow-hidden"
      style={STYLES.footer}
      role="contentinfo"
      aria-label="Site footer"
    >
      <GrainOverlay />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12 lg:mb-16">
          {/* Brand - Takes more space */}
          <div className="lg:col-span-4">
            <BrandSection />
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <LinkColumn title="Navigation" links={NAV_LINKS} />
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2">
            <LinkColumn title="Resources" links={RESOURCE_LINKS} />
          </div>

          {/* Social & Newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <SocialSection />
            <NewsletterSection />
          </div>
        </div>

        {/* Divider */}
        <div
          className="footer-line h-px mb-8 origin-left"
          style={{ background: DERIVED.main10 }}
          aria-hidden="true"
        />

        {/* Copyright & Legal */}
        <CopyrightSection />

        {/* Acknowledgment */}
        <Acknowledgment />
      </div>
    </footer>
  );
}
