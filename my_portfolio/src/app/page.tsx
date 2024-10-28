import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import Image from "next/image";
import ExperienceCard from "@/components/experienceCard";
import SocialLink from "@/components/socialLink";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TableOfContents from "@/components/tableOfContents";

const Home = () => {
  return (
    <div className="min-h-screen relative pt-16">
      <TableOfContents />

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div id="hero" className="flex items-center space-x-20 justify-center">
          <div>
            <Image
              src="/zebra-square.jpg"
              alt="Jason Feng"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-xl">Hello, I'm</p>
            <h1 className="text-5xl font-bold">Jason Feng</h1>
            <p className="text-2xl text-gray-600">Full Stack Developer</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="/Jason Feng.pdf"
                download="Jason Feng.pdf"
                className="px-6 py-2 border border-gray-300 rounded-full hover:bg-slate-800 hover:text-slate-100 hover:border-transparent transition"
              >
                Download CV
              </a>
            </div>
            <div className="flex space-x-4 mt-4">
              <SocialLink
                href="https://www.linkedin.com/in/jason-jiansong-feng/"
                icon={<Linkedin size={24} />}
              />
              <SocialLink
                href="https://github.com/Jason9265"
                icon={<Github size={24} />}
              />
              <SocialLink
                href="mailto:jason.fjs2@gmail.com"
                icon={<Mail size={24} />}
              />
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div id="about" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">About Me</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Experience</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ExperienceCard
              title="Senior Full Stack Developer"
              company="Company Name"
              duration="2020 - Present"
              description="Led development of scalable web applications using MERN stack"
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
            <h2 className="text-3xl font-bold mb-4 text-black">Projects</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>

        {/* What I'm Learning Section */}
        <div id="learning" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">What I'm Learning Now</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>
        
        {/* Talk to me Section */}
        <div id="connects" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Talk To Me</h2>
            <div className="h-1 w-20 bg-emerald-600 mx-auto"></div>
          </div>
        </div>
      </main>

      <ScrollToTopButton />
    </div>
  );
};

export default Home;
