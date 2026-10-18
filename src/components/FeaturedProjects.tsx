import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  icon: string[];
  screenshot?: string;
  metrics?: { [key: string]: string };
  skills: string[];
  skillLabels?: string[];
  githubUrl?: string;
  demoUrl?: string;
  news?: {
    title: string;
    publisher: string;
    date: string;
    dateLabel: string;
    url: string;
    summary: string;
  }[];
}

interface FeaturedProjectsProps {
  projects: Project[];
  skillColors: { [key: string]: string };
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, skillColors }) => {
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
      if (project.screenshot) {
        const screenshotImg = new window.Image();
        screenshotImg.src = project.screenshot;
      }
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
        F E A T U R E D  &nbsp; P R O J E C T S
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
              
              {/* Metrics */}
              {projects[currentProject].metrics && (
                <div className="space-y-3 mb-6">
                  {Object.entries(projects[currentProject].metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-small text-gray-500 capitalize">{key}:</span>
                      <span className="text-small font-medium text-teal-600">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3">
                {projects[currentProject].skills.map((skillUrl, i) => (
                  <div key={i} className={projects[currentProject].skillLabels ? "flex w-20 flex-col items-center gap-2" : "w-15 h-15 flex-center"}>
                    <Image
                      src={skillUrl}
                      alt={projects[currentProject].skillLabels?.[i] ?? `Skill ${i + 1}`}
                      width={60}
                      height={60}
                      className={projects[currentProject].skillLabels ? "h-[60px] w-[60px] object-contain" : "w-full h-full object-contain"}
                      loading="lazy"
                    />
                    {projects[currentProject].skillLabels?.[i] && (
                      <span className="text-center text-xs font-medium text-gray-700">
                        {projects[currentProject].skillLabels[i]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Screenshot and Description */}
            <div className="md:w-2/3">
              {/* Screenshot */}
              {projects[currentProject].screenshot && (
              <div className="mb-8 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={projects[currentProject].screenshot!}
                  alt={`${projects[currentProject].title} screenshot`}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  priority
                  loading="eager"
                />
              </div>
              )}

              <p className="text-gray-600 leading-relaxed mb-6">
                {projects[currentProject].description}
              </p>

              {projects[currentProject].news?.length ? (
                <section aria-label="News coverage" className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-700 mb-2">
                    In the news
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Public reporting on the system. Figures reflect the dates cited below.
                  </p>
                  <ul className="space-y-3">
                    {projects[currentProject].news?.map((article) => (
                      <li key={article.url}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-xl border border-gray-200 p-4 hover:border-teal-400 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors"
                        >
                          <div className="flex flex-wrap gap-x-2 text-xs text-gray-500 mb-2">
                            <span>{article.publisher}</span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={article.date}>{article.dateLabel}</time>
                          </div>
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-teal-700">
                              {article.title}
                            </span>
                            <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0 text-teal-600 mt-0.5" />
                          </div>
                          <p className="text-sm leading-relaxed text-gray-600 mt-2">{article.summary}</p>
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              
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
          aria-label="Previous featured project"
          disabled={isTransitioning}
          className="absolute left-0 top-[200px] transform -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={nextProject}
          aria-label="Next featured project"
          disabled={isTransitioning}
          className="absolute right-0 top-[200px] transform translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              aria-label={`Show ${project.title}`}
              aria-current={index === currentProject ? 'true' : undefined}
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

export default FeaturedProjects; 