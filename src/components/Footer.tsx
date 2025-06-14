import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © 2025 Junyeop Na
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:junyeopna4@gmail.com" className="text-gray-600 hover:text-teal-600 transition-colors">
              junyeopna4@gmail.com
            </a>
            <div className="flex space-x-4">
              <Github className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 