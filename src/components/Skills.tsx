import React from 'react';

interface SkillsProps {
  skillColors: { [key: string]: string };
}

const Skills: React.FC<SkillsProps> = ({ skillColors }) => {
  const skillCategories = [
    {
      title: "Machine Learning",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Transformers", "MMDetection", "Distributed GPU Training", "PEFT", "Huggingface"],
      colorClass: "bg-blue-100 text-blue-700"
    },
    {
      title: "Cloud & MLOps",
      skills: ["GCP", "Docker", "Kubernetes", "MLflow"],
      colorClass: "bg-orange-100 text-orange-700"
    },
    {
      title: "Programming",
      skills: ["Python", "SQL", "JavaScript", "Git", "Apache Spark", "Rust", "Golang", "FastAPI"],
      colorClass: "bg-red-100 text-red-700"
    }
  ];

  return (
    <div className="mb-24">
      <h2 className="text-3xl font-light text-gray-800 mb-12 tracking-widest text-center">
        T E C H N I C A L  &nbsp; S K I L L S
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span key={i} className={`px-3 py-1 ${category.colorClass} rounded-full text-sm`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills; 