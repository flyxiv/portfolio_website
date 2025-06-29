import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Experience {
  title: string;
  company: string;
  period: string;
  logo: string[];
  description: string[];
  skills: string[];
}

interface ExperienceProps {
  experiences: Experience[];
  skillColors: { [key: string]: string };
}

const Experience: React.FC<ExperienceProps> = ({ experiences, skillColors }) => {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 이미지 사전 로딩
  useEffect(() => {
    experiences.forEach((exp) => {
      exp.logo.forEach((logoUrl) => {
        const img = new window.Image();
        img.src = logoUrl;
      });
      exp.skills.forEach((skillUrl) => {
        const img = new window.Image();
        img.src = skillUrl;
      });
    });
  }, [experiences]);

  const nextExperience = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevExperience = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToExperience = (index: number) => {
    if (isTransitioning || index === currentExperience) return;
    setIsTransitioning(true);
    setCurrentExperience(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="mb-24">
      <h2 className="section-title">E X P E R I E N C E</h2>
      
      <div className="relative">
        <div className="card max-w-4xl mx-auto min-h-[400px]">
          <div className={`flex flex-col transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <div className="mb-8">
              <div className="flex gap-4 mb-6">
                {experiences[currentExperience].logo.map((logoUrl, index) => (
                  <div key={index} className="w-15 h-15 flex-center">
                    <Image
                      src={logoUrl}
                      alt={`${experiences[currentExperience].company} logo ${index + 1}`}
                      width={60}
                      height={60}
                      className="w-full h-full object-contain"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
              <h3 className="text-heading mb-2">
                {experiences[currentExperience].title}
              </h3>
              <h4 className="text-subheading mb-4">
                {experiences[currentExperience].company}
              </h4>
              <p className="text-small mb-6 font-medium">
                {experiences[currentExperience].period}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {experiences[currentExperience].skills.map((skillUrl, i) => (
                  <div key={i} className="w-15 h-15 flex-center">
                    <Image
                      src={skillUrl}
                      alt={`Skill ${i + 1}`}
                      width={60}
                      height={60}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <ul className="space-y-4">
                {experiences[currentExperience].description.map((item, i) => (
                  <li key={i} className="flex items-start text-body">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button 
          onClick={prevExperience}
          disabled={isTransitioning}
          className="btn-icon absolute left-0 top-[200px] transform -translate-x-4 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={nextExperience}
          disabled={isTransitioning}
          className="btn-icon absolute right-0 top-[200px] transform translate-x-4 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-center mt-8 space-x-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToExperience(index)}
              disabled={isTransitioning}
              className={`nav-dot transition-all duration-200 hover:scale-125 disabled:cursor-not-allowed ${
                index === currentExperience ? 'nav-dot-active' : 'nav-dot-inactive'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience; 