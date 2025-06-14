import React, { useState } from 'react';
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

  const nextExperience = () => {
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <div className="mb-24">
      <h2 className="section-title">E X P E R I E N C E</h2>
      
      <div className="relative">
        <div className="card max-w-4xl mx-auto min-h-[400px]">
          <div className="flex flex-col">
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
          className="btn-icon absolute left-0 top-[200px] transform -translate-x-4"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={nextExperience}
          className="btn-icon absolute right-0 top-[200px] transform translate-x-4"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-center mt-8 space-x-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentExperience(index)}
              className={`nav-dot ${index === currentExperience ? 'nav-dot-active' : 'nav-dot-inactive'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience; 