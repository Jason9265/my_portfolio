import {
  Terminal,
  UserCircle,
  Briefcase,
  FolderGit2,
  BookOpen,
  MessageSquare,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import ExperienceCard from "@/components/experienceCard";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ChatBox from "@/components/ChatBox";
import ProjectShowcase from "@/components/ProjectShowcase";

const Columnhome = () => {
  return (
    <div className="min-h-screen text-gray-900">
      {/* Left Sidebar */}
      <div className="fixed h-screen p-8 flex flex-col bg-gray-200">
        <div className="flex flex-col items-center space-y-4 mb-16">
          <div className="w-40 h-40 relative">
            <div className="absolute w-full h-full bg-emerald-600 rounded-full animate-spin-slow">
              {Array.from("FULL STACK DEVELOPER  •  JASON FENG  •  ").map((letter, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${i * (360 / 40)}deg)`,
                  }}
                >
                  <span
                    className="absolute text-white text-sm"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: '-2px'
                    }}
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>
            <Image
              src="/jason-square.jpg"
              alt="Jason Feng"
              fill
              className="rounded-full object-cover p-4"
            />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-4xl tracking-wide">Jason Feng</h1>
            <p className="text-lg text-gray-400">Full Stack Developer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 w-full">
          <a
            href="#home"
            className="flex items-center space-x-3 text-gray-400 hover:text-emerald-600 w-full p-2 rounded-lg "
          >
            <Terminal size={20} />
            <span>Home</span>
          </a>
          <a
            href="#about"
            className="flex items-center space-x-3 text-gray-400 hover:text-emerald-600 w-full p-2 rounded-lg "
          >
            <UserCircle size={20} />
            <span>About Me</span>
          </a>
          <a
            href="#experience"
            className="flex items-center space-x-3 text-gray-400 hover:text-emerald-600 w-full p-2 rounded-lg "
          >
            <Briefcase size={20} />
            <span>Experience</span>
          </a>
          <a
            href="#projects"
            className="flex items-center space-x-3 text-gray-400 hover:text-emerald-600 w-full p-2 rounded-lg "
          >
            <FolderGit2 size={20} />
            <span>Projects</span>
          </a>
          <a
            href="#contact"
            className="flex items-center space-x-3 text-gray-400 hover:text-emerald-600 w-full p-2 rounded-lg "
          >
            <MessageSquare size={20} />
            <span>Talk To Me</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12"></div>

        {/* Stats Grid */}
        <div id="home" className="grid grid-cols-3 gap-6 mb-12">
          <div className=" p-8 rounded-lg border border-gray-300">
            <h3 className="text-5xl font-bold mb-2">20+</h3>
            <p className="text-gray-400">Completed Projects</p>
          </div>
          <div className=" p-8 rounded-lg border border-gray-300">
            <h3 className="text-5xl font-bold mb-2">2+</h3>
            <p className="text-gray-400">Years Developing Experience</p>
          </div>
          <div className=" p-8 rounded-lg col-span-1 row-span-2 border border-gray-300">
            <h3 className="text-3xl font-bold mb-4">
              Your ultimate webflow partner
            </h3>
            <p className="text-gray-400 mb-4">
              Eliminate the hassle of dealing with developers lacking design
              sensibility, and trust in someone who possesses the expertise,
              passion, and vision to realize your ideas as you've imagined them.
            </p>
          </div>
          <div className=" p-8 rounded-lg border border-gray-300">
            <h3 className="text-5xl font-bold mb-2">AWS Certifications</h3>
          </div>
          <div className=" p-8 rounded-lg border border-gray-300">
            <h3 className="text-5xl font-bold mb-2">Master UoA</h3>
            <p className="text-gray-400">Computing and Innovation</p>
          </div>
        </div>

        {/* About Me Section */}
        <div id="about" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">About Me</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Main Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">Full-Stack Developer</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                As a Full-Stack Developer with 2 years of experience, I bring a solid foundation in web design processes and a proven track record of delivering high-quality code and innovative solutions within agile development teams.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                My enhanced proficiency in TypeScript and JavaScript allows me to create dynamic and captivating web elements that elevate user experiences. I'm a fast learner with passion for transforming technical ideas into real-world products.
              </p>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <p className="text-emerald-700 italic">
                  "Hosting MERN Adelaide meetup and happy to see you on tech lover party."
                </p>
              </div>
            </div>

            {/* Right Column - Skills & Details */}
            <div className="space-y-6">
              {/* Skills Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Agile'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meetup */}
              <a href="https://www.meetup.com/en-AU/adelaide-mern-developers-meetup-group/" className="p-6">
                <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="text-emerald-600 mr-2" size={20} />
                    <h3 className="text-lg font-semibold">MERN Stack Meetup</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Join our monthly MERN stack meetup every second Friday! Let's explore MongoDB, Express.js, React, and Node.js together.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Experience</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ExperienceCard
              title="Programmer"
              company="YNW Web & Apps"
              duration="Aug 2024 - Present"
              description="Led development of scalable web applications using MERN stack"
            />
            <ExperienceCard
              title="Software Developer"
              company="Greenest Sustain & Cultivx"
              duration="Jan 2024 - presesnt"
              description="Developed and maintained multiple web applications"
            />
            <ExperienceCard
              title="PHP Programmer"
              company="Op2ma"
              duration="Oct 2022 - Dec 2023"
              description="Developed and maintained multiple web applications"
            />
            <ExperienceCard
              title="Software Developer"
              company="iFLYTEK"
              duration="Feb 2020 - Jul 2020"
              description="Developed and maintained multiple web applications"
            />
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Projects</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
          <ProjectShowcase />
        </div>

        {/* Talk to me Section */}
        <div id="contact" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Talk To Me</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:jason.fjs2@gmail.com"
                className="flex items-center p-4 border rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                <div className="p-3 bg-emerald-100 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">jason.fjs2@gmail.com</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/jason-jiansong-feng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                <div className="p-3 bg-emerald-100 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">LinkedIn</h3>
                  <p className="text-gray-600">https://www.linkedin.com/in/jason-jiansong-feng</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Jason9265"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                <div className="p-3 bg-emerald-100 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="text-gray-600">https://github.com/Jason9265</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ChatBox />
      <ScrollToTopButton />
    </div>
  );
};

export default Columnhome;
