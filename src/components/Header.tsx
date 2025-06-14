import React from 'react';
import { Linkedin, Github, Mail, BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.linkedin.com/in/%EC%A4%80%EC%97%BD-%EB%82%98-7436762b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/flyxiv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.junyeopna.blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
          </a>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
          <Mail className="w-4 h-4" />
          <span className="text-sm">junyeopna4@gmail.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 