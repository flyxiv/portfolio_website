import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  icon: string[];
  screenshot: string;
  metrics?: { [key: string]: string };
  skills: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface SideProjectsProps {
  projects: Project[];
  skillColors: { [key: string]: string };
}

const SideProjects: React.FC<SideProjectsProps> = ({ projects, skillColors }) => {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-light text-gray-800 mb-12 tracking-widest text-center">
        S I D E  &nbsp; P R O J E C T S
      </h2>
      
      <div className="relative">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <div className="flex gap-4 mb-6">
                {projects[currentProject].icon.map((iconUrl, index) => (
                  <div key={index} className="w-30 h-20 flex-center">
                    <Image
                      src={iconUrl}
                      alt={`${projects[currentProject].title} icon ${index + 1}`}
                      width={80}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {projects[currentProject].title}
              </h3>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3">
                {projects[currentProject].skills.map((skillUrl, i) => (
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

            {/* Right Side - Screenshot and Description */}
            <div className="md:w-2/3">
              {/* Screenshot */}
              <div className="mb-8 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={projects[currentProject].screenshot}
                  alt={`${projects[currentProject].title} screenshot`}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {projects[currentProject].description}
              </p>
              
              <div className="flex space-x-4">
                {projects[currentProject].githubUrl && (
                  <a 
                    href={projects[currentProject].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                )}
                {projects[currentProject].demoUrl && (
                  <a 
                    href={projects[currentProject].demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevProject}
          className="absolute left-0 top-[200px] transform -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={nextProject}
          className="absolute right-0 top-[200px] transform translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentProject ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideProjects; 