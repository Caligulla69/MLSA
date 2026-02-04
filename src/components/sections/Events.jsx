// EventsPremium.jsx - Editorial event cards (Optimized)
import { useEffect, useRef, memo, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiCalendarDays,
  HiClock,
  HiUserGroup,
  HiArrowRight,
  HiMapPin,
  HiSignal,
  HiSparkles,
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

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
  accent15: `${COLORS.accent}26`,
  accent20: `${COLORS.accent}33`,
  accent30: `${COLORS.accent}4D`,
  light20: `${COLORS.light}33`,
  light50: `${COLORS.light}80`,
  pale50: `${COLORS.pale}80`,
  pale80: `${COLORS.pale}CC`,
});

// Static style objects
const STYLES = Object.freeze({
  section: { background: COLORS.ivory },
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  ivoryBg: { background: COLORS.ivory },
  paleBg: { background: COLORS.pale },
  mainBg: { background: COLORS.main },
  creamBg: { background: COLORS.cream },
  whiteBg: { background: "white" },
});

// Event types configuration
const EVENT_TYPES = Object.freeze({
  workshop: { label: "Workshop", icon: HiSparkles },
  hackathon: { label: "Hackathon", icon: HiSignal },
  techtalk: { label: "Tech Talk", icon: HiUserGroup },
  meetup: { label: "Meetup", icon: HiMapPin },
  conference: { label: "Conference", icon: HiCalendarDays },
});

// Sample events data - frozen and outside component
const EVENTS = Object.freeze([
  {
    id: "azure-workshop-2025",
    title: "Azure Cloud Workshop",
    description:
      "Hands-on session covering Azure fundamentals, deployments, and best practices for cloud architecture.",
    type: "workshop",
    date: "February 15, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual",
    isVirtual: true,
    spots: 50,
    spotsRemaining: 23,
    featured: true,
    speakers: ["John Doe", "Jane Smith"],
  },
  {
    id: "aiml-hackathon-2025",
    title: "AI/ML Hackathon",
    description:
      "48-hour innovation challenge focused on building AI-powered solutions for real-world problems.",
    type: "hackathon",
    date: "March 1-2, 2025",
    time: "48 Hours",
    location: "MUST Campus",
    isVirtual: false,
    spots: 100,
    spotsRemaining: 67,
    featured: false,
    speakers: ["Microsoft Engineers"],
  },
  {
    id: "cloud-architecture-talk",
    title: "Tech Talk: Cloud Architecture",
    description:
      "Expert insights on designing scalable, resilient cloud systems with real-world case studies.",
    type: "techtalk",
    date: "March 10, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Virtual",
    isVirtual: true,
    spots: 200,
    spotsRemaining: 142,
    featured: false,
    speakers: ["Sarah Chen"],
  },
  {
    id: "devops-workshop-2025",
    title: "DevOps & CI/CD Masterclass",
    description:
      "Learn modern DevOps practices, GitHub Actions, and Azure DevOps for seamless deployments.",
    type: "workshop",
    date: "March 20, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Virtual",
    isVirtual: true,
    spots: 75,
    spotsRemaining: 31,
    featured: false,
    speakers: ["Alex Kumar"],
  },
]);

// Filter options
const FILTER_OPTIONS = Object.freeze([
  { id: "all", label: "All Events" },
  { id: "workshop", label: "Workshops" },
  { id: "hackathon", label: "Hackathons" },
  { id: "techtalk", label: "Tech Talks" },
]);

// Noise texture SVG
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ============================================
// CUSTOM HOOKS
// ============================================

function useScrollAnimations(sectionRef, cardsRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".events-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Filter buttons
      gsap.from(".filter-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      // Cards staggered reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            once: true,
          },
        });
      });

      // CTA section
      gsap.from(".events-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-cta",
          start: "top 85%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, cardsRef]);
}

function useEventFilter(events) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") return events;
    return events.filter((event) => event.type === activeFilter);
  }, [events, activeFilter]);

  return { activeFilter, setActiveFilter, filteredEvents };
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

const DecorativeElements = memo(() => (
  <>
    {/* Vertical accent line */}
    <div
      className="absolute top-0 right-1/4 w-px h-full hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main10}, transparent)`,
      }}
      aria-hidden="true"
    />
    {/* Corner decoration */}
    <div
      className="absolute top-20 left-8 w-24 h-24 opacity-[0.03] hidden xl:block"
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
          x="20"
          y="20"
          width="60"
          height="60"
          fill="none"
          stroke={COLORS.main}
          strokeWidth="0.3"
        />
      </svg>
    </div>
  </>
));
DecorativeElements.displayName = "DecorativeElements";

const SectionHeader = memo(({ onViewAll }) => (
  <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
    <div>
      {/* Badge */}
      <div className="events-header inline-flex items-center gap-3 mb-6">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: COLORS.accent }}
          aria-hidden="true"
        />
        <span
          className="text-[11px] tracking-[0.3em] uppercase font-semibold"
          style={STYLES.lightText}
        >
          Upcoming Events
        </span>
        <div className="w-8 h-px" style={{ background: DERIVED.main20 }} />
      </div>

      {/* Title */}
      <h1
        className="events-header text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight"
        style={STYLES.mainText}
      >
        Exclusive{" "}
        <span className="font-normal" style={STYLES.accentText}>
          Gatherings
        </span>
      </h1>

      {/* Description */}
      <p
        className="events-header mt-5 text-base sm:text-lg max-w-xl leading-relaxed"
        style={STYLES.lightText}
      >
        Join our curated workshops, hackathons, and tech talks designed for
        ambitious minds.
      </p>
    </div>

    {/* View All Button */}
    <button
      onClick={onViewAll}
      className="events-header group inline-flex items-center gap-3 px-8 py-4 border font-medium tracking-wider text-sm transition-all duration-300 hover:shadow-md self-start lg:self-auto"
      style={{
        borderColor: DERIVED.main20,
        ...STYLES.mainText,
        background: "white",
      }}
      aria-label="View all events"
    >
      VIEW ALL EVENTS
      <HiArrowRight
        className="group-hover:translate-x-1 transition-transform"
        aria-hidden="true"
      />
    </button>
  </header>
));
SectionHeader.displayName = "SectionHeader";

const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div
    className="flex flex-wrap gap-2 mb-10 p-1 border inline-flex"
    style={{ borderColor: DERIVED.main10, background: DERIVED.pale50 }}
    role="tablist"
    aria-label="Filter events by type"
  >
    {FILTER_OPTIONS.map((option) => {
      const isActive = activeFilter === option.id;
      return (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`filter-btn px-5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
            isActive ? "shadow-sm" : ""
          }`}
          style={{
            background: isActive ? "white" : "transparent",
            color: isActive ? COLORS.main : COLORS.light,
          }}
          role="tab"
          aria-selected={isActive}
          aria-controls="events-grid"
        >
          {option.label}
        </button>
      );
    })}
  </div>
));
FilterTabs.displayName = "FilterTabs";

const EventMeta = memo(({ icon: Icon, children }) => (
  <div className="flex items-center gap-3 text-sm" style={STYLES.lightText}>
    <Icon
      className="w-4 h-4 shrink-0"
      style={STYLES.accentText}
      aria-hidden="true"
    />
    <span>{children}</span>
  </div>
));
EventMeta.displayName = "EventMeta";

const SpotsIndicator = memo(({ spots, spotsRemaining }) => {
  const percentage = (spotsRemaining / spots) * 100;
  const isLow = percentage < 30;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span style={STYLES.lightText}>Availability</span>
        <span
          className="font-medium"
          style={{ color: isLow ? "#DC2626" : COLORS.main }}
        >
          {spotsRemaining} / {spots} spots
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: DERIVED.main10 }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: isLow ? "#DC2626" : COLORS.accent,
          }}
        />
      </div>
    </div>
  );
});
SpotsIndicator.displayName = "SpotsIndicator";

const RegisterButton = memo(({ eventId, featured }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = useMemo(
    () => ({
      borderColor: COLORS.main,
      color: isHovered ? "white" : COLORS.main,
      background: isHovered ? COLORS.main : "transparent",
    }),
    [isHovered],
  );

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full py-3.5 border font-semibold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
      style={buttonStyles}
      aria-label={`Register for event`}
    >
      REGISTER NOW
      <HiArrowUpRight
        className={`w-4 h-4 transition-transform duration-300 ${
          isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
        }`}
        aria-hidden="true"
      />
    </button>
  );
});
RegisterButton.displayName = "RegisterButton";

const EventCard = memo(function EventCard({ event, index }, ref) {
  const cardRef = useRef(null);
  const eventType = EVENT_TYPES[event.type] || EVENT_TYPES.workshop;
  const TypeIcon = eventType.icon;

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < 1024) return;
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      duration: 0.4,
      ease: "power2.out",
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group border overflow-hidden flex flex-col"
      style={{
        ...STYLES.whiteBg,
        borderColor: DERIVED.main10,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
      aria-labelledby={`event-title-${event.id}`}
    >
      {/* Card Header */}
      <div
        className="relative p-6 border-b"
        style={{
          background: event.featured ? COLORS.main : COLORS.pale,
          borderColor: DERIVED.main10,
        }}
      >
        {/* Badges Row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
              style={{
                background: event.featured ? DERIVED.accent20 : "white",
                color: event.featured ? COLORS.accent : COLORS.main,
              }}
            >
              <TypeIcon className="w-3 h-3" aria-hidden="true" />
              {eventType.label}
            </span>

            {/* Virtual badge */}
            {event.isVirtual && (
              <span
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium tracking-wide uppercase"
                style={{
                  background: event.featured
                    ? DERIVED.accent10
                    : DERIVED.main05,
                  color: event.featured ? COLORS.pale : COLORS.light,
                }}
              >
                <HiSignal className="w-3 h-3" aria-hidden="true" />
                Virtual
              </span>
            )}
          </div>

          {event.featured && (
            <span
              className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
              style={{ background: COLORS.accent, color: "white" }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          id={`event-title-${event.id}`}
          className="text-xl font-semibold leading-tight"
          style={{ color: event.featured ? "white" : COLORS.main }}
        >
          {event.title}
        </h2>

        {/* Description */}
        <p
          className="mt-2 text-sm leading-relaxed line-clamp-2"
          style={{
            color: event.featured ? DERIVED.pale80 : COLORS.light,
          }}
        >
          {event.description}
        </p>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <EventMeta icon={HiCalendarDays}>{event.date}</EventMeta>
          <EventMeta icon={HiClock}>{event.time}</EventMeta>
          <EventMeta icon={HiMapPin}>{event.location}</EventMeta>
        </div>

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-6">
            <p
              className="text-[10px] tracking-[0.15em] uppercase font-medium mb-2"
              style={STYLES.lightText}
            >
              Speakers
            </p>
            <p className="text-sm font-medium" style={STYLES.mainText}>
              {event.speakers.join(", ")}
            </p>
          </div>
        )}

        {/* Spots Indicator */}
        <div className="mt-auto mb-5">
          <SpotsIndicator
            spots={event.spots}
            spotsRemaining={event.spotsRemaining}
          />
        </div>

        {/* Register Button */}
        <RegisterButton eventId={event.id} featured={event.featured} />
      </div>
    </article>
  );
});
EventCard.displayName = "EventCard";

const EmptyState = memo(() => (
  <div
    className="col-span-full py-16 text-center"
    role="status"
    aria-live="polite"
  >
    <div
      className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full"
      style={{ background: DERIVED.pale50 }}
    >
      <HiCalendarDays className="w-8 h-8" style={STYLES.lightText} />
    </div>
    <h3 className="text-lg font-medium mb-2" style={STYLES.mainText}>
      No events found
    </h3>
    <p className="text-sm max-w-sm mx-auto" style={STYLES.lightText}>
      There are no upcoming events in this category. Check back soon or view all
      events.
    </p>
  </div>
));
EmptyState.displayName = "EmptyState";

const CTASection = memo(() => (
  <div
    className="events-cta mt-16 border overflow-hidden"
    style={{ borderColor: DERIVED.main10 }}
  >
    <div className="grid lg:grid-cols-2">
      {/* Left - Host an event */}
      <div className="p-8 sm:p-10" style={STYLES.creamBg}>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ background: DERIVED.accent10 }}
          >
            <HiSparkles className="w-5 h-5" style={STYLES.accentText} />
          </div>
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-semibold"
            style={STYLES.lightText}
          >
            Collaboration
          </span>
        </div>
        <h3 className="text-xl font-medium mb-3" style={STYLES.mainText}>
          Want to host an event with us?
        </h3>
        <p className="text-sm mb-6 leading-relaxed" style={STYLES.lightText}>
          Partner with MLSA MUST to organize workshops, hackathons, or tech
          talks for the student community.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 font-medium text-sm group"
          style={STYLES.accentText}
        >
          Get in touch
          <HiArrowRight
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </a>
      </div>

      {/* Right - Newsletter */}
      <div className="p-8 sm:p-10" style={STYLES.paleBg}>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ background: "white" }}
          >
            <HiCalendarDays className="w-5 h-5" style={STYLES.accentText} />
          </div>
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-semibold"
            style={STYLES.lightText}
          >
            Stay Updated
          </span>
        </div>
        <h3 className="text-xl font-medium mb-3" style={STYLES.mainText}>
          Never miss an event
        </h3>
        <p className="text-sm mb-6 leading-relaxed" style={STYLES.lightText}>
          Subscribe to get notified about upcoming events, workshops, and
          exclusive opportunities.
        </p>
        <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border text-sm transition-colors focus:outline-none"
            style={{
              background: "white",
              borderColor: DERIVED.main15,
              color: COLORS.main,
            }}
            aria-label="Email address for event notifications"
          />
          <button
            type="submit"
            className="px-6 py-3 font-medium text-sm tracking-wider transition-opacity hover:opacity-90"
            style={{ background: COLORS.main, color: "white" }}
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  </div>
));
CTASection.displayName = "CTASection";

const EventsCounter = memo(({ total, filtered }) => (
  <div
    className="flex items-center gap-2 text-sm mb-6"
    style={STYLES.lightText}
    aria-live="polite"
  >
    <span>
      Showing{" "}
      <span className="font-medium" style={STYLES.mainText}>
        {filtered}
      </span>{" "}
      of{" "}
      <span className="font-medium" style={STYLES.mainText}>
        {total}
      </span>{" "}
      events
    </span>
  </div>
));
EventsCounter.displayName = "EventsCounter";

// ============================================
// MAIN COMPONENT
// ============================================

export default function EventsPremium() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const { activeFilter, setActiveFilter, filteredEvents } =
    useEventFilter(EVENTS);

  // Custom hook for scroll animations
  useScrollAnimations(sectionRef, cardsRef);

  // Handlers
  const handleViewAll = useCallback(() => {
    setActiveFilter("all");
  }, [setActiveFilter]);

  const handleFilterChange = useCallback(
    (filter) => {
      setActiveFilter(filter);
    },
    [setActiveFilter],
  );

  // Memoized card refs setter
  const setCardRef = useCallback((el, i) => {
    cardsRef.current[i] = el;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={STYLES.section}
      aria-labelledby="events-heading"
    >
      <GrainOverlay />
      <DecorativeElements />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader onViewAll={handleViewAll} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <EventsCounter
            total={EVENTS.length}
            filtered={filteredEvents.length}
          />
        </div>

        {/* Events Grid */}
        <div
          id="events-grid"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-label="Events list"
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <EventCard
                key={event.id}
                ref={(el) => setCardRef(el, i)}
                event={event}
                index={i}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* CTA Section */}
        <CTASection />
      </div>
    </section>
  );
}
