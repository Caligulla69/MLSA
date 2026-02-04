import {
  HiLightningBolt,
  HiAcademicCap,
  HiGlobe,
  HiUserGroup,
  HiCode,
  HiSparkles,
  HiCube,
  HiChip,
} from "react-icons/hi";

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Benefits", href: "#benefits" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export const heroStats = [
  { number: "100+", label: "Active Members", icon: HiUserGroup },
  { number: "50+", label: "Events Hosted", icon: HiSparkles },
  { number: "20+", label: "Projects Built", icon: HiCube },
  { number: "5K+", label: "Students Reached", icon: HiGlobe },
];

export const benefits = [
  {
    icon: HiAcademicCap,
    title: "Free Certifications",
    description:
      "Access Microsoft certifications and learning paths at no cost.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: HiLightningBolt,
    title: "Azure Credits",
    description: "$150 monthly Azure credits for your cloud projects.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: HiGlobe,
    title: "Global Network",
    description: "Connect with 100K+ student ambassadors worldwide.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: HiCode,
    title: "Exclusive Tools",
    description: "Access to GitHub Pro, JetBrains, and premium dev tools.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: HiChip,
    title: "Latest Tech",
    description: "Early access to Microsoft products and beta programs.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: HiSparkles,
    title: "Career Growth",
    description: "Stand out with Microsoft credentials on your resume.",
    gradient: "from-pink-500 to-purple-500",
  },
];

export const events = [
  {
    title: "Azure Cloud Workshop",
    date: "Feb 15, 2025",
    time: "2:00 PM",
    type: "Workshop",
    spots: 30,
    gradient: "from-blue-600 to-blue-400",
  },
  {
    title: "AI/ML Hackathon",
    date: "Mar 1-2, 2025",
    time: "9:00 AM",
    type: "Hackathon",
    spots: 100,
    gradient: "from-purple-600 to-purple-400",
  },
  {
    title: "GitHub Actions Masterclass",
    date: "Mar 20, 2025",
    time: "3:00 PM",
    type: "Workshop",
    spots: 50,
    gradient: "from-green-600 to-green-400",
  },
];

export const team = [
  { name: "Ahmed Ali", role: "Chapter Lead", avatar: "🧑‍💻" },
  { name: "Shoaib Ali", role: "Editorial Head", avatar: "✍️" },
  { name: "Sara Khan", role: "Tech Lead", avatar: "👩‍💻" },
  { name: "Ali Hassan", role: "Events Lead", avatar: "🎯" },
  { name: "Fatima Zahra", role: "Design Lead", avatar: "🎨" },
  { name: "Usman Ahmed", role: "Community Lead", avatar: "🤝" },
];
