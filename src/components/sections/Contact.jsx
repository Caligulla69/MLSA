// ContactPremium.jsx - Elegant premium contact form
import { useState, useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiEnvelope,
  HiMapPin,
  HiPhone,
  HiPaperAirplane,
  HiArrowRight,
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

export default function ContactPremium() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.from(".reveal-left", {
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".reveal-right", {
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Decorative line animation
      gsap.from(".contact-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Add form submission logic
  };

  const contactInfo = [
    {
      icon: HiEnvelope,
      label: "Email",
      value: "mlsa@must.edu.pk",
      href: "mailto:mlsa@must.edu.pk",
    },
    {
      icon: HiMapPin,
      label: "Location",
      value: "MUST Campus, Mirpur, AJK",
      href: "#",
    },
    {
      icon: HiPhone,
      label: "Phone",
      value: "+92 XXX XXXXXXX",
      href: "tel:+92XXXXXXXXX",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
        className="absolute top-0 left-1/3 w-px h-full opacity-50"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.main}10, transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="reveal-left inline-flex items-center gap-4 mb-8">
            <div
              className="w-12 h-px contact-line origin-left"
              style={{ background: colors.main }}
            />
            <span
              className="text-xs tracking-[0.4em] uppercase font-medium"
              style={{ color: colors.light }}
            >
              Get in Touch
            </span>
            <div
              className="w-12 h-px contact-line origin-right"
              style={{ background: colors.main }}
            />
          </div>

          <h2
            className="reveal-left text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight"
            style={{ color: colors.main }}
          >
            Let's{" "}
            <span className="font-normal" style={{ color: colors.accent }}>
              Connect
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact Info */}
          <div className="reveal-left">
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: colors.light }}
            >
              Have questions about the program? Interested in collaboration?
              We'd love to hear from you.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-12">
              {contactInfo.map((item, i) => (
                <ContactInfoCard
                  key={item.label}
                  {...item}
                  index={i}
                  colors={colors}
                />
              ))}
            </div>

            {/* Office Hours */}
            <div
              className="p-6 border"
              style={{
                background: colors.ivory,
                borderColor: `${colors.main}10`,
              }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ color: colors.light }}
              >
                Office Hours
              </p>
              <p className="font-medium" style={{ color: colors.main }}>
                Monday – Friday
              </p>
              <p style={{ color: colors.light }}>9:00 AM – 5:00 PM (PKT)</p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="reveal-right">
            <div
              className="p-8 sm:p-10 lg:p-12 border"
              style={{ background: "white", borderColor: `${colors.main}10` }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <FormField
                  label="Name"
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  focused={focused === "name"}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  colors={colors}
                />

                {/* Email Field */}
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  focused={focused === "email"}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  colors={colors}
                />

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ color: colors.light }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your inquiry..."
                    rows={5}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full px-5 py-4 border transition-all duration-300 resize-none"
                    style={{
                      background: colors.ivory,
                      borderColor:
                        focused === "message"
                          ? colors.accent
                          : `${colors.main}15`,
                      color: colors.main,
                      outline: "none",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-medium tracking-wider text-sm transition-all hover:opacity-90"
                  style={{ background: colors.main, color: "white" }}
                >
                  SEND MESSAGE
                  <HiPaperAirplane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {/* Privacy Note */}
                <p
                  className="text-xs text-center"
                  style={{ color: colors.light }}
                >
                  By submitting, you agree to our{" "}
                  <a
                    href="#"
                    className="underline hover:no-underline"
                    style={{ color: colors.accent }}
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Info Card
const ContactInfoCard = memo(function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  index,
  colors,
}) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      x: 8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex items-center gap-4 p-4 border transition-colors cursor-pointer"
      style={{
        background: "white",
        borderColor: `${colors.main}10`,
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center transition-colors"
        style={{ background: colors.pale }}
      >
        <Icon className="w-5 h-5" style={{ color: colors.accent }} />
      </div>
      <div className="flex-1">
        <p
          className="text-xs tracking-wider uppercase"
          style={{ color: colors.light }}
        >
          {label}
        </p>
        <p className="font-medium" style={{ color: colors.main }}>
          {value}
        </p>
      </div>
      <HiArrowRight
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: colors.accent }}
      />
    </a>
  );
});

// Form Field Component
const FormField = memo(function FormField({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  focused,
  onFocus,
  onBlur,
  colors,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs tracking-[0.15em] uppercase mb-3"
        style={{ color: colors.light }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        required
        className="w-full px-5 py-4 border transition-all duration-300"
        style={{
          background: colors.ivory,
          borderColor: focused ? colors.accent : `${colors.main}15`,
          color: colors.main,
          outline: "none",
        }}
      />
    </div>
  );
});
