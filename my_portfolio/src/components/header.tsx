"use client";
import React from "react";
import { Mail, Terminal, FileCode2, BookOpen, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 border-b border-slate-800 bg-white z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-emerald-500" />
            <span className="font-mono font-bold text-lg">
              jason@portfolio:~$
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/about" icon={<User />} text="About" />
            <NavLink href="/projects" icon={<FileCode2 />} text="Projects" />
            <NavLink href="/blog" icon={<BookOpen />} text="Blog" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-slate-100 mb-1"></div>
            <div className="w-6 h-0.5 bg-slate-100 mb-1"></div>
            <div className="w-6 h-0.5 bg-slate-100"></div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/about" text="About" />
            <MobileNavLink href="/projects" text="Projects" />
            <MobileNavLink href="/blog" text="Blog" />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center space-x-2 text-slate-400 hover:text-emerald-500 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </a>
);

const MobileNavLink = ({ href, text }) => (
  <a
    href={href}
    className="block px-3 py-2 rounded-md text-slate-400 hover:text-emerald-500 hover:bg-slate-800 transition-colors"
  >
    {text}
  </a>
);

export default Header;
