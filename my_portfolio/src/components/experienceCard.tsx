import React from 'react';

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, duration, description }) => {
  return (
    <div className="p-6 rounded-lg border border-gray-300 hover:border-emerald-500 transition-colors">
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-emerald-600 mb-2">{company}</p>
      <p className="text-gray-600 text-sm mb-4">{duration}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ExperienceCard;
