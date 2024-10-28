"use client";

import { useEffect, useState } from "react";

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "learning", label: "What I'm Learning" },
    { id: "connects", label: "Talk To Me" },
  ];

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-20% 0px -35% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 space-y-4 hidden lg:block">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          className={`cursor-pointer transition-all duration-200 flex items-center space-x-2 ${
            activeSection === id
              ? "text-emerald-600 font-medium translate-x-2"
              : "text-gray-500 hover:text-gray-800"
          }`}
          onClick={() => scrollToSection(id)}
        >
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              activeSection === id ? "bg-emerald-600" : "bg-gray-500"
            }`}
          />
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
