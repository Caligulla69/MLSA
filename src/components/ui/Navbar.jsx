// NavbarPremium.jsx - Fixed button visibility issue
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { gsap } from "gsap";
import { HiMenuAlt4, HiX, HiArrowRight } from "react-icons/hi";
import { RiMicrosoftFill } from "react-icons/ri";

// Brand Colors
const colors = {
  accent: "#0A5FA8",
  main: "#16253B",
  light: "#3F5F8C",
  pale: "#E6EEF6",
  cream: "#FBFAF8",
  ivory: "#EEECE6",
};

const navigation = [
  { name: "About", href: "#about" },
  { name: "Benefits", href: "#benefits" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function NavbarPremium() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navRef = useRef(null);
  const navLinksRef = useRef([]);
  const ctaButtonsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const backdropRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const mobileCTARef = useRef(null);

  // Scroll handler & active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navigation.map((item) => item.href.replace("#", ""));
      let currentSection = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial navbar animation - runs once on mount
  useEffect(() => {
    if (isAnimated) return;

    // Set initial hidden states
    gsap.set(navRef.current, { y: -100, opacity: 0 });

    navLinksRef.current.forEach((link) => {
      if (link) gsap.set(link, { y: -20, opacity: 0 });
    });

    ctaButtonsRef.current.forEach((btn) => {
      if (btn) gsap.set(btn, { y: -20, opacity: 0 });
    });

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => setIsAnimated(true),
    });

    // Animate navbar container
    tl.to(
      navRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      },
      0.3,
    );

    // Animate nav links with stagger
    tl.to(
      navLinksRef.current.filter(Boolean),
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
      },
      0.6,
    );

    // Animate CTA buttons with stagger
    tl.to(
      ctaButtonsRef.current.filter(Boolean),
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      },
      0.8,
    );

    return () => {
      tl.kill();
    };
  }, [isAnimated]);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileOpen) return;
    if (!mobileMenuRef.current || !backdropRef.current) return;

    // Animate backdrop
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );

    // Animate menu panel
    gsap.fromTo(
      mobileMenuRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.4, ease: "power3.out" },
    );

    // Animate links with stagger
    const validLinks = mobileLinksRef.current.filter(Boolean);
    validLinks.forEach((link, i) => {
      gsap.fromTo(
        link,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.15 + i * 0.05,
          ease: "power3.out",
        },
      );
    });

    // Animate CTA button
    if (mobileCTARef.current) {
      gsap.fromTo(
        mobileCTARef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.4, ease: "power3.out" },
      );
    }
  }, [mobileOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  // Smooth scroll navigation handler
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  // Handle desktop navigation
  const handleNavigation = useCallback(
    (e, href) => {
      e.preventDefault();
      const sectionId = href.replace("#", "");

      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        scrollToSection(sectionId);
      }
    },
    [scrollToSection],
  );

  // Close mobile menu with animation
  const closeMobileMenu = useCallback((callback) => {
    if (!mobileMenuRef.current || !backdropRef.current) {
      setMobileOpen(false);
      if (callback) callback();
      return;
    }

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(mobileMenuRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => {
        setMobileOpen(false);
        if (callback) callback();
      },
    });
  }, []);

  // Handle mobile navigation
  const handleMobileNavigation = useCallback(
    (e, href) => {
      e.preventDefault();
      e.stopPropagation();

      const sectionId = href.replace("#", "");

      closeMobileMenu(() => {
        setTimeout(() => {
          if (sectionId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            scrollToSection(sectionId);
          }
        }, 50);
      });
    },
    [closeMobileMenu, scrollToSection],
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    },
    [closeMobileMenu],
  );

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? `rgba(251, 250, 248, 0.97)` : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? `1px solid rgba(22, 37, 59, 0.08)`
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.04)" : "none",
          // Initial hidden state handled by GSAP, but also set here as fallback
          opacity: isAnimated ? 1 : 0,
          transform: isAnimated ? "translateY(0)" : "translateY(-100px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavigation(e, "#home")}
              className="flex items-center gap-3 group relative z-10"
            >
              <div
                className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                style={{ background: colors.main }}
              >
                <RiMicrosoftFill className="text-white text-lg" />
              </div>
              <div className="hidden sm:block">
                <p
                  className="font-semibold text-sm tracking-wide"
                  style={{ color: colors.main }}
                >
                  MLSA
                </p>
                <p
                  className="text-[10px] tracking-widest uppercase"
                  style={{ color: colors.light }}
                >
                  MUST Chapter
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item, i) => (
                <DesktopNavLink
                  key={item.name}
                  ref={(el) => (navLinksRef.current[i] = el)}
                  {...item}
                  colors={colors}
                  isActive={activeSection === item.href.replace("#", "")}
                  onNavigate={handleNavigation}
                  isAnimated={isAnimated}
                />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                ref={(el) => (ctaButtonsRef.current[0] = el)}
                className="px-5 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden group"
                style={{
                  color: colors.main,
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateY(0)" : "translateY(-20px)",
                }}
              >
                <span className="relative z-10">Sign In</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: colors.accent }}
                />
              </button>
              <button
                ref={(el) => (ctaButtonsRef.current[1] = el)}
                className="group relative px-6 py-2.5 text-sm font-medium tracking-wider text-white flex items-center gap-2 overflow-hidden transition-all duration-300"
                style={{
                  background: colors.main,
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateY(0)" : "translateY(-20px)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  JOIN NOW
                  <HiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span
                  className="absolute inset-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  style={{ background: colors.accent }}
                />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black/5 active:scale-95"
              style={{ color: colors.main }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <HiMenuAlt4 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[85vw] flex flex-col shadow-2xl overflow-hidden"
            style={{
              background: colors.cream,
              borderLeft: `1px solid rgba(22, 37, 59, 0.08)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div
              className="flex items-center justify-between p-5 border-b flex-shrink-0"
              style={{ borderColor: `rgba(22, 37, 59, 0.08)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: colors.main }}
                >
                  <RiMicrosoftFill className="text-white" />
                </div>
                <span
                  className="font-semibold text-sm"
                  style={{ color: colors.main }}
                >
                  MLSA MUST
                </span>
              </div>
              <button
                onClick={() => closeMobileMenu()}
                className="w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-95"
                style={{ color: colors.light }}
                aria-label="Close menu"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-4 px-3 overflow-y-auto overscroll-contain">
              {navigation.map((item, i) => (
                <a
                  key={item.name}
                  ref={(el) => (mobileLinksRef.current[i] = el)}
                  href={item.href}
                  onClick={(e) => handleMobileNavigation(e, item.href)}
                  className="flex items-center justify-between px-4 py-4 mx-1 mb-1 rounded-lg text-lg font-light transition-all duration-200 cursor-pointer select-none active:scale-[0.98] group"
                  style={{
                    color:
                      activeSection === item.href.replace("#", "")
                        ? colors.accent
                        : colors.main,
                    background:
                      activeSection === item.href.replace("#", "")
                        ? colors.pale
                        : "transparent",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                      style={{
                        background:
                          activeSection === item.href.replace("#", "")
                            ? colors.accent
                            : "transparent",
                      }}
                    />
                    {item.name}
                  </span>
                  <HiArrowRight
                    className="text-sm transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:translate-x-1"
                    style={{ color: colors.accent }}
                  />
                </a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div
              ref={mobileCTARef}
              className="p-5 border-t flex-shrink-0"
              style={{
                borderColor: `rgba(22, 37, 59, 0.08)`,
                background: colors.ivory,
              }}
            >
              <button
                className="w-full py-4 text-sm font-medium tracking-wider text-white flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                style={{ background: colors.main }}
                onClick={() => closeMobileMenu()}
              >
                JOIN NOW
                <HiArrowRight className="text-sm" />
              </button>
              <p
                className="text-center text-xs mt-3"
                style={{ color: colors.light }}
              >
                Free membership • Limited spots
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Desktop Nav Link Component
const DesktopNavLink = memo(function DesktopNavLink(
  { name, href, colors, isActive, onNavigate, isAnimated },
  ref,
) {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);
  const dotRef = useRef(null);

  // Combine refs
  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(linkRef.current);
      } else {
        ref.current = linkRef.current;
      }
    }
  }, [ref]);

  // Update active state visuals
  useEffect(() => {
    if (!underlineRef.current || !dotRef.current) return;

    if (isActive) {
      gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.2 });
    } else {
      gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
  }, [isActive]);

  const handleMouseEnter = useCallback(() => {
    if (!isActive && underlineRef.current && dotRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (linkRef.current) {
      gsap.to(linkRef.current, { y: -2, duration: 0.2, ease: "power2.out" });
    }
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    if (!isActive && underlineRef.current && dotRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
    if (linkRef.current) {
      gsap.to(linkRef.current, { y: 0, duration: 0.2, ease: "power2.out" });
    }
  }, [isActive]);

  const handleClick = useCallback(
    (e) => {
      onNavigate(e, href);
    },
    [onNavigate, href],
  );

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none"
      style={{
        color: isActive ? colors.main : colors.light,
        opacity: isAnimated ? 1 : 0,
        transform: isAnimated ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      {/* Active Dot */}
      <span
        ref={dotRef}
        className="absolute left-1 top-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: colors.accent,
          transform: "translateY(-50%) scale(0)",
          opacity: 0,
        }}
      />

      <span className="relative">
        {name}
        {/* Underline */}
        <span
          ref={underlineRef}
          className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left pointer-events-none"
          style={{
            background: colors.accent,
            transform: "scaleX(0)",
          }}
        />
      </span>
    </a>
  );
});

// Add forwardRef wrapper
import { forwardRef } from "react";

const DesktopNavLinkWithRef = forwardRef((props, ref) => (
  <DesktopNavLink {...props} ref={ref} />
));
