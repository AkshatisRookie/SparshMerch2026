"use client";

import { useState, useEffect } from "react";
import MerchSection from "./components/MerchSection";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Services } from "./components/Services";
import Credits from "./components/Credits";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "Home" },
    { id: "merch", label: "Merch" },
    { id: "services", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020205] via-[#0d0d18] to-[#020205]">
      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        sections={sections}
      />

      {/* Content Sections */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <Home scrollToSection={scrollToSection} />
      </section>

      <section
        id="merch"
        className="min-h-screen flex items-center justify-center px-4 bg-black/20"
      >
        <MerchSection />
      </section>

      <section
        id="services"
        className="min-h-screen flex items-center justify-center px-4"
      >
        <Services />
      </section>
      {/* Credits Section */}
      <div className="">
        <Credits />
      </div>
    </div>
  );
}
