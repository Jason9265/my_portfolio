"use client";
import React, { useState, useEffect } from 'react';

const ProjectShowcase = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution built with MERN stack featuring secure payments and real-time inventory management",
      image: "/api/placeholder/800/400",
      video: null,
      url: "https://example.com/ecommerce",
      tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"]
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "AI-powered platform that generates unique content using advanced language models",
      image: "/api/placeholder/800/400",
      video: null,
      url: "https://example.com/ai-generator",
      tags: ["Python", "React", "OpenAI", "FastAPI"]
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Real-time collaborative task management platform with team features",
      image: "/api/placeholder/800/400",
      video: null,
      url: "https://example.com/task-manager",
      tags: ["React", "Firebase", "Material-UI", "Node.js"]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerKey, setTimerKey] = useState(0); // Add timer key for resetting

  useEffect(() => {
    let timer;
    if (isPlaying) {
      // Reset and start the timer
      timer = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % projects.length);
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, projects.length, timerKey]); // Add timerKey to dependencies

  const handleTabClick = (index) => {
    setActiveIndex(index);
    setTimerKey(prev => prev + 1); // Increment timer key to reset the timer
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Project Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => handleTabClick(index)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              activeIndex === index
                ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* Project Display */}
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`transition-opacity duration-500 ${
              activeIndex === index ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              {/* Media Container */}
              <div className="relative aspect-video">
                {project.video ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4 text-gray-200">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-emerald-600 bg-opacity-30 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        ))}

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition-colors"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProjectShowcase;