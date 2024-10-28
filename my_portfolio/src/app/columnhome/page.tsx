import {
  Terminal,
  UserCircle,
  Briefcase,
  FolderGit2,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import ExperienceCard from "@/components/experienceCard";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const Columnhome = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-2/12 p-8 border-r border-gray-800 bg-black flex flex-col">
        <div className="flex flex-col items-center space-y-4 mb-16">
          <div className="w-40 h-40 relative">
            <Image
              src="/zebra-square.jpg"
              alt="Jason Feng"
              fill
              className="rounded-full object-cover bg-purple-600"
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
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <Terminal size={20} />
            <span>Home</span>
          </a>
          <a
            href="#about"
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <UserCircle size={20} />
            <span>About Me</span>
          </a>
          <a
            href="#experience"
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <Briefcase size={20} />
            <span>Experience</span>
          </a>
          <a
            href="#projects"
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <FolderGit2 size={20} />
            <span>Projects</span>
          </a>
          <a
            href="#learning"
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <BookOpen size={20} />
            <span>Learning</span>
          </a>
          <a
            href="#contact"
            className="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-lg hover:bg-gray-800"
          >
            <MessageSquare size={20} />
            <span>Talk To Me</span>
          </a>
        </nav>
      </div>

      {/* Main Content - changed from ml-64 to ml-[16.666667%] to match the 2/12 width */}
      <div className="ml-[16.666667%] p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12"></div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-5xl font-bold mb-2">100+</h3>
            <p className="text-gray-400">Completed Projects</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-5xl font-bold mb-2">2+</h3>
            <p className="text-gray-400">Years Developing Experience</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg col-span-1 row-span-2">
            <h3 className="text-3xl font-bold mb-4">
              Your ultimate webflow partner
            </h3>
            <p className="text-gray-400 mb-4">
              Eliminate the hassle of dealing with developers lacking design
              sensibility, and trust in someone who possesses the expertise,
              passion, and vision to realize your ideas as you've imagined them.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-5xl font-bold mb-2">50+</h3>
            <p className="text-gray-400">Satisfied Clients</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <h3 className="text-5xl font-bold mb-2">AWS Certifications</h3>
            <p className="text-gray-400"></p>
          </div>
        </div>

        {/* About Me Section */}
        <div id="about" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">About Me</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Experience</h2>
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
              title="Full Stack Developer"
              company="Previous Company"
              duration="2018 - 2020"
              description="Developed and maintained multiple web applications"
            />
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Projects</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>

        {/* What I'm Learning Section */}
        <div id="learning" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              What I'm Learning Now
            </h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>

        {/* Talk to me Section */}
        <div id="contact" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Talk To Me</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default Columnhome;
