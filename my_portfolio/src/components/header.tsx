"use client";
import React, { useState } from "react";
import { Terminal, FileCode2, BookOpen, User, BookA } from "lucide-react";

interface NavLinkProps {
  href: string;
  icon?: React.ReactNode;
  text: string;
}

interface MobileNavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center space-x-2 text-slate-400 hover:text-emerald-500 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </a>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, text }) => (
  <a
    href={href}
    className="block px-3 py-2 rounded-md text-slate-400 hover:text-emerald-500 hover:bg-slate-800 transition-colors"
  >
    {text}
  </a>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative top-0 left-0 right-0 border-b border-slate-800 bg-white z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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
            <NavLink href="/columnhome" icon={<BookA />} text="Change Style" />
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-800"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            type="button"
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
            <MobileNavLink href="/columnhome" text="Change Style" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;