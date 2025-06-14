import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Download, Code, Database, Brain, TrendingUp, Award, MapPin, Calendar, Twitter, Instagram, ChevronLeft } from 'lucide-react';

const Portfolio = () => {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);

  const experiences = [
    {
      title: "Machine Learning Engineer",
      company: "TechCorp",
      period: "MON AUG 19 2024 - PRESENT",
      logo: "🤖",
      description: [
        "Built decentralised AI solutions on the cloud platform",
        "Worked on and fine tuned a variety of Machine Learning models including 3D models, Computer Vision models and LLM's",
        "Implemented and ran distributed training in the cloud on multiple GPU's"
      ],
      skills: ["Python", "Google Cloud", "AWS", "TensorFlow", "Git"]
    },
    {
      title: "Machine Learning Engineer",
      company: "DataFlow Inc",
      period: "THU SEP 01 2022 - SUN AUG 18 2024",
      logo: "📊",
      description: [
        "Worked as a consultant for Key Three Data on a project aimed at developing an automated platform for converting first-person video into consumer data",
        "Successfully performed data preprocessing, cleaning and analysis",
        "Applied machine learning algorithms and integrated systems onto the Google Cloud Platform"
      ],
      skills: ["Python", "Kubernetes", "Google Cloud", "Git", "Docker"]
    },
    {
      title: "Mobile App Developer",
      company: "Co-Pilot Consulting",
      period: "FRI JAN 01 2021 - SUN AUG 18 2024",
      logo: "📱",
      description: [
        "Worked as a consultant for Co-Pilot (SA) on a project aimed at developers on the Koinonia application, a mobile app development that gives churches the opportunity to congregation members",
        "Worked on front-end mobile app development on the mobile device itself"
      ],
      skills: ["React", "Salesforce", "Azure", "Git"]
    }
  ];

  const projects = [
    {
      title: "Real-time Fraud Detection",
      description: "Built an end-to-end ML pipeline processing 100K+ transactions/day with 99.2% accuracy using ensemble methods and real-time feature engineering.",
      icon: "🔒",
      metrics: { accuracy: "99.2%", throughput: "100K+/day", latency: "<50ms" },
      tech: ["Python", "Apache Kafka", "XGBoost", "Docker", "AWS"]
    },
    {
      title: "Computer Vision QC System",
      description: "Developed a CNN-based defect detection system achieving 95% precision in identifying product defects across 12 categories for manufacturing quality control.",
      icon: "👁️",
      metrics: { precision: "95%", categories: "12", speed: "30 FPS" },
      tech: ["PyTorch", "OpenCV", "FastAPI", "MLflow", "Kubernetes"]
    },
    {
      title: "NLP Sentiment Analysis Platform",
      description: "Created a multi-language sentiment analysis API serving 1M+ requests/month with transformer-based models and intelligent caching.",
      icon: "💬",
      metrics: { accuracy: "94%", languages: "12", uptime: "99.9%" },
      tech: ["Transformers", "FastAPI", "Redis", "PostgreSQL", "GCP"]
    }
  ];

  const skillColors = {
    "Python": "bg-blue-100 text-blue-700",
    "Google Cloud": "bg-orange-100 text-orange-700", 
    "AWS": "bg-orange-100 text-orange-700",
    "TensorFlow": "bg-red-100 text-red-700",
    "Git": "bg-red-100 text-red-700",
    "Kubernetes": "bg-orange-100 text-orange-700",
    "Docker": "bg-blue-100 text-blue-700",
    "React": "bg-blue-100 text-blue-700",
    "Salesforce": "bg-blue-100 text-blue-700",
    "Azure": "bg-blue-100 text-blue-700",
    "Apache Kafka": "bg-gray-100 text-gray-700",
    "XGBoost": "bg-green-100 text-green-700",
    "PyTorch": "bg-red-100 text-red-700",
    "OpenCV": "bg-blue-100 text-blue-700",
    "FastAPI": "bg-green-100 text-green-700",
    "MLflow": "bg-blue-100 text-blue-700",
    "Transformers": "bg-purple-100 text-purple-700",
    "Redis": "bg-red-100 text-red-700",
    "PostgreSQL": "bg-blue-100 text-blue-700",
    "GCP": "bg-orange-100 text-orange-700"
  };

  const nextExperience = () => {
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer" />
            <Github className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
            <Mail className="w-4 h-4" />
            <span className="text-sm">GET IN TOUCH</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" 
              alt="Profile" 
              className="w-24 h-24 rounded-full mx-auto mb-6 border-3 border-teal-500 shadow-lg"
            />
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
              Alex Chen
            </h1>
            <p className="text-xl text-teal-600 font-medium mb-6">
              Senior Machine Learning Engineer
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Passionate ML Engineer with 5+ years of experience building scalable AI solutions 
              that drive real business impact. Specialized in deep learning, computer vision, 
              and MLOps with a track record of deploying models serving millions of users.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
              <button className="flex items-center space-x-2 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-800 mb-12 tracking-widest text-center">
            E X P E R I E N C E
          </h2>
          
          <div className="relative">
            {/* Experience Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Logo and Basic Info */}
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-2xl">{experiences[currentExperience].logo}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {experiences[currentExperience].title}
                  </h3>
                  <h4 className="text-lg text-teal-600 font-medium mb-4">
                    {experiences[currentExperience].company}
                  </h4>
                  <p className="text-sm text-gray-500 mb-6 font-medium">
                    {experiences[currentExperience].period}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {experiences[currentExperience].skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${skillColors[skill] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side - Description */}
                <div className="md:w-2/3 md:pl-8 md:border-l border-gray-200">
                  <ul className="space-y-4">
                    {experiences[currentExperience].description.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevExperience}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={nextExperience}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExperience(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentExperience ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-800 mb-12 tracking-widest text-center">
            F E A T U R E D  &nbsp; P R O J E C T S
          </h2>
          
          <div className="relative">
            {/* Project Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Icon and Title */}
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-2xl">{projects[currentProject].icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {projects[currentProject].title}
                  </h3>
                  
                  {/* Metrics */}
                  <div className="space-y-3 mb-6">
                    {Object.entries(projects[currentProject].metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-500 capitalize">{key}:</span>
                        <span className="text-sm font-medium text-teal-600">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {projects[currentProject].tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${skillColors[tech] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side - Description */}
                <div className="md:w-2/3 md:pl-8 md:border-l border-gray-200">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {projects[currentProject].description}
                  </p>
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors">
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </button>
                    <button className="flex items-center space-x-2 text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevProject}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={nextProject}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
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

        {/* Skills Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-800 mb-12 tracking-widest text-center">
            T E C H N I C A L  &nbsp; S K I L L S
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Transformers"].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {["AWS", "GCP", "Docker", "Kubernetes", "MLflow"].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Programming</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "SQL", "JavaScript", "Git", "Apache Spark"].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © 2025 Alex Chen. Crafted with passion for ML.
            </div>
            <div className="flex items-center space-x-6">
              <a href="mailto:alex.chen@email.com" className="text-gray-600 hover:text-teal-600 transition-colors">
                alex.chen@email.com
              </a>
              <div className="flex space-x-4">
                <Github className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;