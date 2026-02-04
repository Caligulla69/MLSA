// FooterPremium.jsx - Refined minimal footer
import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiMicrosoftFill } from "react-icons/ri";

// Brand Colors
const colors = {
  accent: "#0A5FA8", // deep royal blue, confident & refined
  main: "#16253B", // near-navy with richness, not flat
  light: "#3F5F8C", // muted steel blue, understated
  pale: "#E6EEF6", // cool, elegant light background
  cream: "#FBFAF8", // soft luxury white
  ivory: "#EEECE6", // warm stone ivory
};

const socials = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

const links = [
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#benefits" },
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function FooterPremium() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{ background: colors.cream, borderColor: `${colors.main}10` }}
    >
      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="footer-content grid lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: colors.main }}
              >
                <RiMicrosoftFill className="text-white text-lg" />
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: colors.main }}
                >
                  MLSA MUST
                </p>
                <p className="text-xs" style={{ color: colors.light }}>
                  Official Chapter
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: colors.light }}
            >
              Empowering students to become technology leaders through learning,
              building, and connecting with Microsoft technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:text-center">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-6 font-medium"
              style={{ color: colors.main }}
            >
              Quick Links
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-center">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors hover:underline"
                  style={{ color: colors.light }}
                  onMouseEnter={(e) => (e.target.style.color = colors.accent)}
                  onMouseLeave={(e) => (e.target.style.color = colors.light)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="lg:text-right">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-6 font-medium"
              style={{ color: colors.main }}
            >
              Connect
            </p>
            <div className="flex gap-3 lg:justify-end">
              {socials.map((social) => (
                <SocialLink key={social.label} {...social} colors={colors} />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="footer-content h-px mb-8"
          style={{ background: `${colors.main}10` }}
        />

        {/* Bottom Section */}
        <div className="footer-content flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p style={{ color: colors.light }}>
            © 2025 MLSA MUST Chapter. All rights reserved.
          </p>
          <p style={{ color: colors.light }}>
            Made with <span style={{ color: colors.accent }}>♥</span> by the
            MLSA Team
          </p>
        </div>
      </div>
    </footer>
  );
}

// Social Link Component
const SocialLink = memo(function SocialLink({
  icon: Icon,
  href,
  label,
  colors,
}) {
  const linkRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(linkRef.current, {
      y: -3,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(linkRef.current, {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

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
        borderColor: `${colors.main}10`,
        color: colors.light,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = colors.accent;
        e.currentTarget.style.color = colors.accent;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = `${colors.main}10`;
        e.currentTarget.style.color = colors.light;
      }}
    >
      <Icon size={16} />
    </a>
  );
});
