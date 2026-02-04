// ContactPremium.jsx - Elegant premium contact form (Optimized)
import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiEnvelope,
  HiMapPin,
  HiPhone,
  HiPaperAirplane,
  HiArrowRight,
  HiCheck,
  HiClock,
  HiSparkles,
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
  section: { background: COLORS.cream },
  mainText: { color: COLORS.main },
  lightText: { color: COLORS.light },
  accentText: { color: COLORS.accent },
  ivoryBg: { background: COLORS.ivory },
  paleBg: { background: COLORS.pale },
  mainBg: { background: COLORS.main },
  whiteBg: { background: "white" },
});

// Contact information - frozen and outside component
const CONTACT_INFO = Object.freeze([
  {
    id: "email",
    icon: HiEnvelope,
    label: "Email",
    value: "mlsa@must.edu.pk",
    href: "mailto:mlsa@must.edu.pk",
    description: "We typically respond within 24 hours",
  },
  {
    id: "location",
    icon: HiMapPin,
    label: "Location",
    value: "MUST Campus, Mirpur, AJK",
    href: "https://maps.google.com",
    description: "Visit us at the main campus",
  },
  {
    id: "phone",
    icon: HiPhone,
    label: "Phone",
    value: "+92 XXX XXXXXXX",
    href: "tel:+92XXXXXXXXX",
    description: "Available during office hours",
  },
]);

// Form field configurations
const FORM_FIELDS = Object.freeze({
  name: {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    autoComplete: "name",
    minLength: 2,
    maxLength: 100,
  },
  email: {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  subject: {
    id: "subject",
    label: "Subject",
    type: "text",
    placeholder: "What's this about?",
    autoComplete: "off",
    minLength: 5,
    maxLength: 150,
  },
});

// Initial form state
const INITIAL_FORM_STATE = Object.freeze({
  name: "",
  email: "",
  subject: "",
  message: "",
});

// Noise texture SVG
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ============================================
// CUSTOM HOOKS
// ============================================

function useScrollAnimations(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content reveal
      gsap.from(".reveal-left", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Right content reveal
      gsap.from(".reveal-right", {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Decorative line animation
      gsap.from(".contact-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
        },
      });

      // Fade up elements
      gsap.from(".fade-up", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}

function useForm(initialState) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const updateField = useCallback(
    (field, value) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    },
    [errors],
  );

  const touchField = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!form.name.trim() || form.name.length < 2) {
      newErrors.name = "Please enter your name";
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.subject.trim() || form.subject.length < 5) {
      newErrors.subject = "Please enter a subject";
    }

    if (!form.message.trim() || form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const resetForm = useCallback(() => {
    setForm(initialState);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }, [initialState]);

  return {
    form,
    errors,
    touched,
    status,
    setStatus,
    updateField,
    touchField,
    validateForm,
    resetForm,
  };
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
    {/* Vertical line */}
    <div
      className="absolute top-0 left-1/3 w-px h-full hidden lg:block"
      style={{
        background: `linear-gradient(to bottom, transparent, ${DERIVED.main10}, transparent)`,
      }}
      aria-hidden="true"
    />
    {/* Corner accent */}
    <div
      className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] hidden xl:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M100 0 L100 100 L0 100"
          fill="none"
          stroke={COLORS.main}
          strokeWidth="0.5"
        />
        <path
          d="M100 20 L100 100 L20 100"
          fill="none"
          stroke={COLORS.main}
          strokeWidth="0.3"
        />
      </svg>
    </div>
    {/* Bottom left accent */}
    <div
      className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.02] hidden xl:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[40, 30, 20].map((r) => (
          <circle
            key={r}
            cx="0"
            cy="100"
            r={r}
            fill="none"
            stroke={COLORS.main}
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  </>
));
DecorativeElements.displayName = "DecorativeElements";

const SectionHeader = memo(() => (
  <header className="text-center mb-16 sm:mb-20 lg:mb-24">
    {/* Badge */}
    <div className="reveal-left inline-flex items-center gap-4 mb-8">
      <div
        className="w-12 h-px contact-line origin-left"
        style={{ background: DERIVED.main30 }}
        aria-hidden="true"
      />
      <span
        className="text-[11px] tracking-[0.35em] uppercase font-semibold"
        style={STYLES.lightText}
      >
        Get in Touch
      </span>
      <div
        className="w-12 h-px contact-line origin-right"
        style={{ background: DERIVED.main30 }}
        aria-hidden="true"
      />
    </div>

    {/* Title */}
    <h1
      className="reveal-left text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tight mb-6"
      style={STYLES.mainText}
    >
      Let's{" "}
      <span className="font-normal" style={STYLES.accentText}>
        Connect
      </span>
    </h1>

    {/* Subtitle */}
    <p
      className="reveal-left text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
      style={STYLES.lightText}
    >
      Have a question or want to collaborate? We'd love to hear from you.
    </p>
  </header>
));
SectionHeader.displayName = "SectionHeader";

const ContactInfoCard = memo(function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  description,
}) {
  const cardRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < 1024) return;
    gsap.to(cardRef.current, {
      x: 6,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex items-start gap-4 p-5 border transition-all duration-300 hover:shadow-md hover:border-transparent"
      style={{
        ...STYLES.whiteBg,
        borderColor: DERIVED.main10,
      }}
      aria-label={`${label}: ${value}`}
    >
      <div
        className="w-12 h-12 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-opacity-80"
        style={STYLES.paleBg}
      >
        <Icon
          className="w-5 h-5"
          style={STYLES.accentText}
          aria-hidden="true"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1"
          style={STYLES.lightText}
        >
          {label}
        </p>
        <p className="font-medium truncate" style={STYLES.mainText}>
          {value}
        </p>
        <p className="text-xs mt-1 opacity-70" style={STYLES.lightText}>
          {description}
        </p>
      </div>
      <HiArrowRight
        className="w-4 h-4 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1"
        style={STYLES.accentText}
        aria-hidden="true"
      />
    </a>
  );
});
ContactInfoCard.displayName = "ContactInfoCard";

const OfficeHours = memo(() => (
  <div
    className="p-6 border fade-up"
    style={{
      ...STYLES.ivoryBg,
      borderColor: DERIVED.main10,
    }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-8 h-8 flex items-center justify-center"
        style={{ background: DERIVED.accent10 }}
      >
        <HiClock
          className="w-4 h-4"
          style={STYLES.accentText}
          aria-hidden="true"
        />
      </div>
      <p
        className="text-[10px] tracking-[0.2em] uppercase font-semibold"
        style={STYLES.lightText}
      >
        Office Hours
      </p>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium" style={STYLES.mainText}>
          Monday – Friday
        </span>
        <span className="text-sm" style={STYLES.lightText}>
          9:00 AM – 5:00 PM
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium" style={STYLES.mainText}>
          Saturday
        </span>
        <span className="text-sm" style={STYLES.lightText}>
          10:00 AM – 2:00 PM
        </span>
      </div>
      <div className="flex justify-between items-center opacity-60">
        <span className="font-medium" style={STYLES.mainText}>
          Sunday
        </span>
        <span className="text-sm" style={STYLES.lightText}>
          Closed
        </span>
      </div>
    </div>
    <p
      className="text-xs mt-4 pt-4 border-t"
      style={{
        color: COLORS.light,
        borderColor: DERIVED.main10,
      }}
    >
      All times in Pakistan Standard Time (PKT)
    </p>
  </div>
));
OfficeHours.displayName = "OfficeHours";

const FormField = memo(function FormField({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  isFocused,
  onFocus,
}) {
  const { id, label, type, placeholder, autoComplete, minLength, maxLength } =
    field;
  const showError = touched && error;

  const inputStyles = useMemo(
    () => ({
      background: COLORS.ivory,
      borderColor: showError
        ? "#DC2626"
        : isFocused
          ? COLORS.accent
          : DERIVED.main15,
      color: COLORS.main,
      outline: "none",
    }),
    [showError, isFocused],
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center justify-between text-[11px] tracking-[0.15em] uppercase font-medium"
        style={STYLES.lightText}
      >
        <span>{label}</span>
        {showError && (
          <span className="text-[10px] normal-case tracking-normal text-red-600">
            {error}
          </span>
        )}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onFocus={() => onFocus(id)}
        onBlur={() => onBlur(id)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        required
        aria-invalid={showError ? "true" : "false"}
        aria-describedby={showError ? `${id}-error` : undefined}
        className="w-full px-5 py-4 border transition-all duration-300 text-sm"
        style={inputStyles}
      />
    </div>
  );
});
FormField.displayName = "FormField";

const TextAreaField = memo(function TextAreaField({
  value,
  error,
  touched,
  onChange,
  onBlur,
  isFocused,
  onFocus,
}) {
  const showError = touched && error;

  const textareaStyles = useMemo(
    () => ({
      background: COLORS.ivory,
      borderColor: showError
        ? "#DC2626"
        : isFocused
          ? COLORS.accent
          : DERIVED.main15,
      color: COLORS.main,
      outline: "none",
    }),
    [showError, isFocused],
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor="message"
        className="flex items-center justify-between text-[11px] tracking-[0.15em] uppercase font-medium"
        style={STYLES.lightText}
      >
        <span>Message</span>
        {showError && (
          <span className="text-[10px] normal-case tracking-normal text-red-600">
            {error}
          </span>
        )}
      </label>
      <textarea
        id="message"
        name="message"
        value={value}
        onChange={(e) => onChange("message", e.target.value)}
        onFocus={() => onFocus("message")}
        onBlur={() => onBlur("message")}
        placeholder="Tell us about your inquiry or project idea..."
        rows={5}
        required
        minLength={10}
        maxLength={2000}
        aria-invalid={showError ? "true" : "false"}
        className="w-full px-5 py-4 border transition-all duration-300 resize-none text-sm"
        style={textareaStyles}
      />
      <p className="text-[10px] text-right" style={{ color: DERIVED.light50 }}>
        {value.length}/2000
      </p>
    </div>
  );
});
TextAreaField.displayName = "TextAreaField";

const SubmitButton = memo(function SubmitButton({ status }) {
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const buttonContent = useMemo(() => {
    if (isSuccess) {
      return (
        <>
          <HiCheck className="w-5 h-5" />
          MESSAGE SENT
        </>
      );
    }
    if (isSubmitting) {
      return (
        <>
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          SENDING...
        </>
      );
    }
    return (
      <>
        SEND MESSAGE
        <HiPaperAirplane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </>
    );
  }, [isSubmitting, isSuccess]);

  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold tracking-wider text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background: isSuccess ? "#059669" : COLORS.main,
        color: "white",
        "--tw-ring-color": COLORS.accent,
      }}
    >
      {buttonContent}
    </button>
  );
});
SubmitButton.displayName = "SubmitButton";

const ContactForm = memo(function ContactForm() {
  const {
    form,
    errors,
    touched,
    status,
    setStatus,
    updateField,
    touchField,
    validateForm,
    resetForm,
  } = useForm(INITIAL_FORM_STATE);

  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = useCallback((field) => {
    setFocusedField(field);
  }, []);

  const handleBlur = useCallback(
    (field) => {
      setFocusedField(null);
      touchField(field);
    },
    [touchField],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Touch all fields to show validation
      Object.keys(form).forEach(touchField);

      if (!validateForm()) {
        return;
      }

      setStatus("submitting");

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Form submitted:", form);
        setStatus("success");

        // Reset after success
        setTimeout(() => {
          resetForm();
        }, 3000);
      } catch (error) {
        setStatus("error");
        console.error("Submission error:", error);
      }
    },
    [form, touchField, validateForm, setStatus, resetForm],
  );

  return (
    <div
      className="p-8 sm:p-10 lg:p-12 border relative overflow-hidden"
      style={{ ...STYLES.whiteBg, borderColor: DERIVED.main10 }}
    >
      {/* Form header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ background: DERIVED.accent10 }}
        >
          <HiSparkles
            className="w-5 h-5"
            style={STYLES.accentText}
            aria-hidden="true"
          />
        </div>
        <div>
          <h2 className="font-medium" style={STYLES.mainText}>
            Send us a message
          </h2>
          <p className="text-xs" style={STYLES.lightText}>
            We'll get back to you within 24 hours
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name & Email Row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            field={FORM_FIELDS.name}
            value={form.name}
            error={errors.name}
            touched={touched.name}
            onChange={updateField}
            onBlur={handleBlur}
            isFocused={focusedField === "name"}
            onFocus={handleFocus}
          />
          <FormField
            field={FORM_FIELDS.email}
            value={form.email}
            error={errors.email}
            touched={touched.email}
            onChange={updateField}
            onBlur={handleBlur}
            isFocused={focusedField === "email"}
            onFocus={handleFocus}
          />
        </div>

        {/* Subject */}
        <FormField
          field={FORM_FIELDS.subject}
          value={form.subject}
          error={errors.subject}
          touched={touched.subject}
          onChange={updateField}
          onBlur={handleBlur}
          isFocused={focusedField === "subject"}
          onFocus={handleFocus}
        />

        {/* Message */}
        <TextAreaField
          value={form.message}
          error={errors.message}
          touched={touched.message}
          onChange={updateField}
          onBlur={handleBlur}
          isFocused={focusedField === "message"}
          onFocus={handleFocus}
        />

        {/* Submit Button */}
        <SubmitButton status={status} />

        {/* Privacy Note */}
        <p className="text-[11px] text-center" style={STYLES.lightText}>
          By submitting, you agree to our{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:no-underline transition-all"
            style={STYLES.accentText}
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="/terms"
            className="underline underline-offset-2 hover:no-underline transition-all"
            style={STYLES.accentText}
          >
            Terms of Service
          </a>
        </p>
      </form>

      {/* Success overlay */}
      {status === "success" && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white/95 animate-fadeIn"
          role="alert"
        >
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
              style={{ background: "#D1FAE5" }}
            >
              <HiCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium mb-2" style={STYLES.mainText}>
              Message Sent!
            </h3>
            <p className="text-sm" style={STYLES.lightText}>
              We'll be in touch soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
ContactForm.displayName = "ContactForm";

const QuickActions = memo(() => (
  <div
    className="mt-8 p-6 border fade-up"
    style={{ borderColor: DERIVED.main10, background: DERIVED.pale50 }}
  >
    <p
      className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-4"
      style={STYLES.lightText}
    >
      Quick Actions
    </p>
    <div className="flex flex-wrap gap-3">
      {[
        { label: "Schedule a Call", href: "#" },
        { label: "Join Discord", href: "#" },
        { label: "Follow on LinkedIn", href: "#" },
      ].map((action) => (
        <a
          key={action.label}
          href={action.href}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border transition-all duration-300 hover:shadow-sm"
          style={{
            ...STYLES.whiteBg,
            borderColor: DERIVED.main15,
            ...STYLES.mainText,
          }}
        >
          {action.label}
          <HiArrowRight className="w-3 h-3" style={STYLES.accentText} />
        </a>
      ))}
    </div>
  </div>
));
QuickActions.displayName = "QuickActions";

// ============================================
// MAIN COMPONENT
// ============================================

export default function ContactPremium() {
  const sectionRef = useRef(null);

  // Custom hook for scroll animations
  useScrollAnimations(sectionRef);

  // Memoized contact info rendering
  const contactCards = useMemo(
    () => (
      <div className="space-y-4">
        {CONTACT_INFO.map((info) => (
          <ContactInfoCard key={info.id} {...info} />
        ))}
      </div>
    ),
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={STYLES.section}
      aria-labelledby="contact-heading"
    >
      {/* CSS for custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <GrainOverlay />
      <DecorativeElements />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <div className="reveal-left space-y-8">
            <p
              className="text-lg leading-relaxed max-w-md"
              style={STYLES.lightText}
            >
              Have questions about the Microsoft Learn Student Ambassadors
              program? Interested in collaboration? We'd love to hear from you.
            </p>

            {/* Contact Cards */}
            <div className="fade-up">{contactCards}</div>

            {/* Office Hours */}
            <OfficeHours />

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Right - Form */}
          <div className="reveal-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
