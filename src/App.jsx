// App.jsx - Fixed
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Benefits from "./components/sections/Benefits";
import Events from "./components/sections/Events";
import Team from "./components/sections/Team";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        {/* Make sure each component uses the id internally OR wrap them */}
        <div id="about">
          <About />
        </div>
        <div id="benefits">
          <Benefits />
        </div>
        <div id="events">
          <Events />
        </div>
        <div id="team">
          <Team />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
