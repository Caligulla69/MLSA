// NavbarPremium.jsx - Premium navigation (Optimized)
import {
  useState,
  useEffect,
  useRef,
  memo,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { gsap } from "gsap";
import { HiMenuAlt4, HiX, HiArrowRight } from "react-icons/hi";
import { RiMicrosoftFill } from "react-icons/ri";

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
  main08: `rgba(22, 37, 59, 0.08)`,
  main10: `${COLORS.main}1A`,
  main15: `${COLORS.main}26`,
  cream97: `rgba(251, 250, 248, 0.97)`,
  black05: `rgba(0, 0, 0, 0.05)`,
  black30: `rgba(0, 0, 0, 0.30)`,
  shadow: `0 4px 30px rgba(0, 0, 0, 0.04)`,
});

// Static style objects
const STYLES = Object.freeze({
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  mainBg: { background: COLORS.main },
  paleBg: { background: COLORS.pale },
  creamBg: { background: COLORS.cream },
  ivoryBg: { background: COLORS.ivory },
});

// Navigation links - frozen and outside component
const NAVIGATION = Object.freeze([
  { id: "about", name: "About", href: "#about" },
  { id: "benefits", name: "Benefits", href: "#benefits" },
  { id: "events", name: "Events", href: "#events" },
  { id: "team", name: "Team", href: "#team" },
  { id: "contact", name: "Contact", href: "#contact" },
]);

// Animation configurations
const ANIM_CONFIG = Object.freeze({
  navReveal: { y: -100, opacity: 0, duration: 1, ease: "power4.out" },
  linkReveal: { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" },
  menuSlide: { duration: 0.4, ease: "power3.out" },
  menuClose: { duration: 0.3, ease: "power3.in" },
});

// ============================================
// CUSTOM HOOKS
// ============================================

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      let currentSection = "";
      for (const item of NAVIGATION) {
        const sectionId = item.href.replace("#", "");
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

  return { scrolled, activeSection };
}

function useNavbarAnimation(navRef, navLinksRef, ctaButtonsRef) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isAnimated) return;

    const nav = navRef.current;
    const links = navLinksRef.current.filter(Boolean);
    const buttons = ctaButtonsRef.current.filter(Boolean);

    // Set initial hidden states
    gsap.set(nav, { y: -100, opacity: 0 });
    links.forEach((link) => gsap.set(link, { y: -20, opacity: 0 }));
    buttons.forEach((btn) => gsap.set(btn, { y: -20, opacity: 0 }));

    // Create animation timeline
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => setIsAnimated(true),
    });

    tl.to(nav, { y: 0, opacity: 1, ...ANIM_CONFIG.navReveal }, 0);
    tl.to(
      links,
      { y: 0, opacity: 1, stagger: 0.05, ...ANIM_CONFIG.linkReveal },
      0.6,
    );
    tl.to(
      buttons,
      { y: 0, opacity: 1, stagger: 0.1, ...ANIM_CONFIG.linkReveal },
      0.8,
    );

    return () => tl.kill();
  }, [isAnimated, navRef, navLinksRef, ctaButtonsRef]);

  return isAnimated;
}

function useMobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const backdropRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const mobileCTARef = useRef(null);

  // Animate menu open
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    const backdrop = backdropRef.current;
    const links = mobileLinksRef.current.filter(Boolean);
    const cta = mobileCTARef.current;

    if (!menu || !backdrop) return;

    // Animate backdrop
    gsap.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );

    // Animate menu panel
    gsap.fromTo(menu, { x: "100%" }, { x: "0%", ...ANIM_CONFIG.menuSlide });

    // Animate links
    links.forEach((link, i) => {
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

    // Animate CTA
    if (cta) {
      gsap.fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.4, ease: "power3.out" },
      );
    }
  }, [mobileOpen]);

  // Prevent body scroll
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

  const closeMobileMenu = useCallback((callback) => {
    const menu = mobileMenuRef.current;
    const backdrop = backdropRef.current;

    if (!menu || !backdrop) {
      setMobileOpen(false);
      callback?.();
      return;
    }

    gsap.to(backdrop, { opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.to(menu, {
      x: "100%",
      ...ANIM_CONFIG.menuClose,
      onComplete: () => {
        setMobileOpen(false);
        callback?.();
      },
    });
  }, []);

  return {
    mobileOpen,
    setMobileOpen,
    mobileMenuRef,
    backdropRef,
    mobileLinksRef,
    mobileCTARef,
    closeMobileMenu,
  };
}

function useNavigation(navRef, closeMobileMenu) {
  const scrollToSection = useCallback(
    (sectionId) => {
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
    },
    [navRef],
  );

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

  return { handleNavigation, handleMobileNavigation };
}

// ============================================
// MEMOIZED SUB-COMPONENTS
// ============================================

const Logo = memo(({ onNavigate }) => (
  <a
    href="#home"
    onClick={(e) => onNavigate(e, "#home")}
    className="flex items-center gap-3 group relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
    style={{ "--tw-ring-color": COLORS.accent }}
    aria-label="MLSA MUST - Go to homepage"
  >
    <div
      className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
      style={STYLES.mainBg}
    >
      <RiMicrosoftFill className="text-white text-lg" aria-hidden="true" />
    </div>
    <div className="hidden sm:block">
      <p
        className="font-semibold text-sm tracking-wide"
        style={STYLES.mainText}
      >
        MLSA
      </p>
      <p
        className="text-[10px] tracking-widest uppercase"
        style={STYLES.lightText}
      >
        MUST Chapter
      </p>
    </div>
  </a>
));
Logo.displayName = "Logo";

const DesktopNavLink = memo(
  forwardRef(function DesktopNavLink(
    { name, href, isActive, onNavigate, isAnimated },
    ref,
  ) {
    const linkRef = useRef(null);
    const underlineRef = useRef(null);
    const dotRef = useRef(null);

    // Sync forwarded ref
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

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(e, href);
        }
      },
      [onNavigate, href],
    );

    return (
      <a
        ref={linkRef}
        href={href}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
        style={{
          color: isActive ? COLORS.main : COLORS.light,
          opacity: isAnimated ? 1 : 0,
          transform: isAnimated ? "translateY(0)" : "translateY(-20px)",
          "--tw-ring-color": COLORS.accent,
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {/* Active Dot */}
        <span
          ref={dotRef}
          className="absolute left-1 top-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            background: COLORS.accent,
            transform: "translateY(-50%) scale(0)",
            opacity: 0,
          }}
          aria-hidden="true"
        />

        <span className="relative">
          {name}
          {/* Underline */}
          <span
            ref={underlineRef}
            className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left pointer-events-none"
            style={{
              background: COLORS.accent,
              transform: "scaleX(0)",
            }}
            aria-hidden="true"
          />
        </span>
      </a>
    );
  }),
);
DesktopNavLink.displayName = "DesktopNavLink";

const DesktopCTAButtons = memo(
  forwardRef(function DesktopCTAButtons({ isAnimated }, ref) {
    const buttonsRef = useRef([]);

    // Sync forwarded ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(buttonsRef.current);
        } else {
          ref.current = buttonsRef.current;
        }
      }
    }, [ref]);

    return (
      <div className="hidden lg:flex items-center gap-4">
        {/* Sign In Button */}
        <button
          ref={(el) => (buttonsRef.current[0] = el)}
          className="px-5 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
          style={{
            color: COLORS.main,
            opacity: isAnimated ? 1 : 0,
            transform: isAnimated ? "translateY(0)" : "translateY(-20px)",
            "--tw-ring-color": COLORS.accent,
          }}
        >
          <span className="relative z-10">Sign In</span>
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            style={{ background: COLORS.accent }}
            aria-hidden="true"
          />
        </button>

        {/* Join Now Button */}
        <button
          ref={(el) => (buttonsRef.current[1] = el)}
          className="group relative px-6 py-2.5 text-sm font-semibold tracking-wider text-white flex items-center gap-2 overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: COLORS.main,
            opacity: isAnimated ? 1 : 0,
            transform: isAnimated ? "translateY(0)" : "translateY(-20px)",
            "--tw-ring-color": COLORS.accent,
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            JOIN NOW
            <HiArrowRight
              className="text-sm group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </span>
          <span
            className="absolute inset-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
            style={{ background: COLORS.accent }}
            aria-hidden="true"
          />
        </button>
      </div>
    );
  }),
);
DesktopCTAButtons.displayName = "DesktopCTAButtons";

const MobileMenuButton = memo(({ onClick, isOpen }) => (
  <button
    className="lg:hidden relative z-10 w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-black/5 active:scale-95 focus:outline-none focus-visible:ring-2"
    style={{ color: COLORS.main, "--tw-ring-color": COLORS.accent }}
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    <HiMenuAlt4 size={24} aria-hidden="true" />
  </button>
));
MobileMenuButton.displayName = "MobileMenuButton";

const MobileNavLink = memo(
  forwardRef(function MobileNavLink({ item, isActive, onNavigate }, ref) {
    return (
      <a
        ref={ref}
        href={item.href}
        onClick={(e) => onNavigate(e, item.href)}
        className="flex items-center justify-between px-4 py-4 mx-1 mb-1 rounded-lg text-lg font-light transition-all duration-200 cursor-pointer select-none active:scale-[0.98] group focus:outline-none focus-visible:ring-2"
        style={{
          color: isActive ? COLORS.accent : COLORS.main,
          background: isActive ? COLORS.pale : "transparent",
          "--tw-ring-color": COLORS.accent,
        }}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full transition-all duration-200"
            style={{
              background: isActive ? COLORS.accent : "transparent",
            }}
            aria-hidden="true"
          />
          {item.name}
        </span>
        <HiArrowRight
          className="text-sm transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:translate-x-1"
          style={STYLES.accentText}
          aria-hidden="true"
        />
      </a>
    );
  }),
);
MobileNavLink.displayName = "MobileNavLink";

const MobileMenu = memo(function MobileMenu({
  isOpen,
  activeSection,
  onClose,
  onNavigate,
  mobileMenuRef,
  backdropRef,
  mobileLinksRef,
  mobileCTARef,
}) {
  const handleBackdropClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose],
  );

  const handleMenuClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: DERIVED.black30 }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[85vw] flex flex-col shadow-2xl overflow-hidden"
        style={{
          background: COLORS.cream,
          borderLeft: `1px solid ${DERIVED.main08}`,
        }}
        onClick={handleMenuClick}
      >
        {/* Mobile Header */}
        <div
          className="flex items-center justify-between p-5 border-b flex-shrink-0"
          style={{ borderColor: DERIVED.main08 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center"
              style={STYLES.mainBg}
            >
              <RiMicrosoftFill className="text-white" aria-hidden="true" />
            </div>
            <span className="font-semibold text-sm" style={STYLES.mainText}>
              MLSA MUST
            </span>
          </div>
          <button
            onClick={() => onClose()}
            className="w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-black/5 active:scale-95 focus:outline-none focus-visible:ring-2"
            style={{ color: COLORS.light, "--tw-ring-color": COLORS.accent }}
            aria-label="Close menu"
          >
            <HiX size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className="flex-1 py-4 px-3 overflow-y-auto overscroll-contain"
          aria-label="Mobile navigation"
        >
          {NAVIGATION.map((item, i) => (
            <MobileNavLink
              key={item.id}
              ref={(el) => (mobileLinksRef.current[i] = el)}
              item={item}
              isActive={activeSection === item.id}
              onNavigate={onNavigate}
            />
          ))}
        </nav>

        {/* Mobile CTA */}
        <div
          ref={mobileCTARef}
          className="p-5 border-t flex-shrink-0"
          style={{
            borderColor: DERIVED.main08,
            ...STYLES.ivoryBg,
          }}
        >
          <button
            className="w-full py-4 text-sm font-semibold tracking-wider text-white flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ ...STYLES.mainBg, "--tw-ring-color": COLORS.accent }}
            onClick={() => onClose()}
          >
            JOIN NOW
            <HiArrowRight className="text-sm" aria-hidden="true" />
          </button>
          <p className="text-center text-xs mt-3" style={STYLES.lightText}>
            Free membership • Limited spots
          </p>
        </div>
      </div>
    </div>
  );
});
MobileMenu.displayName = "MobileMenu";

// ============================================
// MAIN COMPONENT
// ============================================

export default function NavbarPremium() {
  const navRef = useRef(null);
  const navLinksRef = useRef([]);
  const ctaButtonsRef = useRef([]);

  // Custom hooks
  const { scrolled, activeSection } = useScrollState();
  const isAnimated = useNavbarAnimation(navRef, navLinksRef, ctaButtonsRef);
  const {
    mobileOpen,
    setMobileOpen,
    mobileMenuRef,
    backdropRef,
    mobileLinksRef,
    mobileCTARef,
    closeMobileMenu,
  } = useMobileMenu();
  const { handleNavigation, handleMobileNavigation } = useNavigation(
    navRef,
    closeMobileMenu,
  );

  // Memoized header styles
  const headerStyles = useMemo(
    () => ({
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? DERIVED.cream97 : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled
        ? `1px solid ${DERIVED.main08}`
        : "1px solid transparent",
      boxShadow: scrolled ? DERIVED.shadow : "none",
      opacity: isAnimated ? 1 : 0,
      transform: isAnimated ? "translateY(0)" : "translateY(-100px)",
    }),
    [scrolled, isAnimated],
  );

  // Memoized desktop nav links
  const desktopNavLinks = useMemo(
    () =>
      NAVIGATION.map((item, i) => (
        <DesktopNavLink
          key={item.id}
          ref={(el) => (navLinksRef.current[i] = el)}
          name={item.name}
          href={item.href}
          isActive={activeSection === item.id}
          onNavigate={handleNavigation}
          isAnimated={isAnimated}
        />
      )),
    [activeSection, handleNavigation, isAnimated],
  );

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={headerStyles}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Logo onNavigate={handleNavigation} />

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {desktopNavLinks}
            </nav>

            {/* Desktop CTA Buttons */}
            <DesktopCTAButtons ref={ctaButtonsRef} isAnimated={isAnimated} />

            {/* Mobile Menu Button */}
            <MobileMenuButton
              onClick={() => setMobileOpen(true)}
              isOpen={mobileOpen}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        activeSection={activeSection}
        onClose={closeMobileMenu}
        onNavigate={handleMobileNavigation}
        mobileMenuRef={mobileMenuRef}
        backdropRef={backdropRef}
        mobileLinksRef={mobileLinksRef}
        mobileCTARef={mobileCTARef}
      />
    </>
  );
}
