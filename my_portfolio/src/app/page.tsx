import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import Header from "@/components/header";
import ExperienceCard from "@/components/experienceCard";
import SocialLink from "@/components/socialLink";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-emerald-500">Hello World</span>, I'm Jason
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8">
            Full Stack Developer
          </p>
          <Terminal className="h-16 w-16 text-emerald-500 mx-auto mb-8" />
          <div className="flex justify-center space-x-6">
            <SocialLink href="https://github.com/Jason9265" icon={<Github />} />
            <SocialLink
              href="https://www.linkedin.com/in/jason-jiansong-feng/"
              icon={<Linkedin />}
            />
            <SocialLink href="mailto:jason.fjs2@gmail.com" icon={<Mail />} />
          </div>
        </div>

        {/* Experience Section Preview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto"></div>
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
      </main>
    </div>
  );
};

export default Home;
