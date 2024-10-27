const ExperienceCard = ({ title, company, duration, description }) => {
  return (
    <div className="p-6 rounded-lg border border-slate-800 hover:border-emerald-500 transition-colors">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-emerald-500 mb-2">{company}</p>
      <p className="text-slate-400 text-sm mb-4">{duration}</p>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

export default ExperienceCard;
