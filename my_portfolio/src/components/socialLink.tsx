const SocialLink = ({ href, icon }) => {
  return (
    <a
      href={href}
      className="p-3 rounded-full hover:bg-slate-800 text-slate-400 hover:text-emerald-500 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export default SocialLink;
