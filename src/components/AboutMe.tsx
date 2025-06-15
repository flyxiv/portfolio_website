import React from 'react';
import { Download, Mail } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="text-center mb-16">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
          Junyeop Na
        </h1>
        <p className="text-xl text-teal-600 font-medium mb-6">
          Senior Machine Learning Engineer
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          ML Engineer with 4+ years of experience building various AI solutions.
          Specialized in using deep learning, computer vision, and building LLM agent/RAG systems.
        </p>
        
        <div className="flex justify-center space-x-4">
          <a 
            href="/junyeop_na_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </a>
          <a 
            href="mailto:junyeopna4@gmail.com"
            className="flex items-center space-x-2 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 