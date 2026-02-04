// EventsPremium.jsx - Editorial event cards
import { useEffect, useRef, memo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiCalendarDays,
  HiClock,
  HiUserGroup,
  HiArrowRight,
  HiMapPin,
} from "react-icons/hi2";

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

// Sample events data
const events = [
  {
    title: "Azure Cloud Workshop",
    type: "Workshop",
    date: "February 15, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual",
    spots: 50,
    featured: true,
  },
  {
    title: "AI/ML Hackathon",
    type: "Hackathon",
    date: "March 1-2, 2025",
    time: "48 Hours",
    location: "MUST Campus",
    spots: 100,
    featured: false,
  },
  {
    title: "Tech Talk: Cloud Architecture",
    type: "Tech Talk",
    date: "March 10, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Virtual",
    spots: 200,
    featured: false,
  },
];

export default function EventsPremium() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".events-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Cards staggered reveal
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: colors.ivory }}
    >
      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div className="events-header inline-flex items-center gap-4 mb-6">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: colors.accent }}
              />
              <span
                className="text-xs tracking-[0.3em] uppercase font-medium"
                style={{ color: colors.light }}
              >
                Upcoming Events
              </span>
            </div>

            <h2
              className="events-header text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight"
              style={{ color: colors.main }}
            >
              Exclusive{" "}
              <span className="font-normal" style={{ color: colors.accent }}>
                Gatherings
              </span>
            </h2>

            <p
              className="events-header mt-4 text-lg max-w-xl"
              style={{ color: colors.light }}
            >
              Join our curated workshops, hackathons, and tech talks designed
              for ambitious minds.
            </p>
          </div>

          <button
            className="events-header group inline-flex items-center gap-3 px-8 py-4 border font-medium tracking-wider text-sm transition-all hover:bg-opacity-5"
            style={{
              borderColor: `${colors.main}20`,
              color: colors.main,
            }}
          >
            VIEW ALL EVENTS
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <EventCard
              key={event.title}
              ref={(el) => (cardsRef.current[i] = el)}
              event={event}
              colors={colors}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 p-8 sm:p-10 border text-center"
          style={{ background: colors.cream, borderColor: `${colors.main}10` }}
        >
          <p className="text-lg mb-4" style={{ color: colors.main }}>
            Want to host an event with us?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-medium"
            style={{ color: colors.accent }}
          >
            Get in touch
            <HiArrowRight className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Event Card Component
const EventCard = memo(function EventCard({ event, colors }, ref) {
  const cardRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
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

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (ref) ref(el);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group border overflow-hidden cursor-pointer"
      style={{
        background: "white",
        borderColor: `${colors.main}10`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        className="relative p-6 border-b"
        style={{
          background: event.featured ? colors.main : colors.pale,
          borderColor: `${colors.main}10`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: event.featured ? `${colors.accent}20` : "white",
              color: event.featured ? colors.accent : colors.main,
            }}
          >
            {event.type}
          </span>
          {event.featured && (
            <span
              className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
              style={{ background: `${colors.accent}`, color: "white" }}
            >
              Featured
            </span>
          )}
        </div>

        <h3
          className="text-xl font-medium transition-colors"
          style={{ color: event.featured ? "white" : colors.main }}
        >
          {event.title}
        </h3>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <div
            className="flex items-center gap-3 text-sm"
            style={{ color: colors.light }}
          >
            <HiCalendarDays style={{ color: colors.accent }} />
            <span>{event.date}</span>
          </div>
          <div
            className="flex items-center gap-3 text-sm"
            style={{ color: colors.light }}
          >
            <HiClock style={{ color: colors.accent }} />
            <span>{event.time}</span>
          </div>
          <div
            className="flex items-center gap-3 text-sm"
            style={{ color: colors.light }}
          >
            <HiMapPin style={{ color: colors.accent }} />
            <span>{event.location}</span>
          </div>
          <div
            className="flex items-center gap-3 text-sm"
            style={{ color: colors.light }}
          >
            <HiUserGroup style={{ color: colors.accent }} />
            <span>{event.spots} spots available</span>
          </div>
        </div>

        <button
          className="w-full py-3 border font-medium text-sm tracking-wider transition-all group-hover:bg-opacity-100"
          style={{
            borderColor: colors.main,
            color: colors.main,
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = colors.main;
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = colors.main;
          }}
        >
          REGISTER NOW
        </button>
      </div>
    </div>
  );
});
