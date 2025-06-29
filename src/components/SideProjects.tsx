import React, { useState, useEffect } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 이미지 사전 로딩
  useEffect(() => {
    projects.forEach((project) => {
      project.icon.forEach((iconUrl) => {
        const img = new window.Image();
        img.src = iconUrl;
      });
      project.skills.forEach((skillUrl) => {
        const img = new window.Image();
        img.src = skillUrl;
      });
      // 스크린샷도 사전 로딩
      const screenshotImg = new window.Image();
      screenshotImg.src = project.screenshot;
    });
  }, [projects]);

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToProject = (index: number) => {
    if (isTransitioning || index === currentProject) return;
    setIsTransitioning(true);
    setCurrentProject(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-light text-gray-800 mb-12 tracking-widest text-center">
        S I D E  &nbsp; P R O J E C T S
      </h2>
      
      <div className="relative">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className={`flex flex-col md:flex-row transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
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
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
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
                      loading="lazy"
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
                  priority
                  loading="eager"
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
          disabled={isTransitioning}
          className="absolute left-0 top-[200px] transform -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={nextProject}
          disabled={isTransitioning}
          className="absolute right-0 top-[200px] transform translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 disabled:cursor-not-allowed ${
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