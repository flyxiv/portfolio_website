import React from 'react';
import Header from '../components/Header';
import AboutMe from '../components/AboutMe';
import Experience from '../components/Experience';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

const Portfolio = () => {
  const experiences = [
    {
      title: "Data Scientist",
      company: "Naver Maps",
      period: "AUG 2020 - DEC 2023",
      logo: ["/images/naver_icon.png"],
      description: [
        "Created Naver Map's first real-time Deep Learning Model for estimating travel time of car routes",
        "Developed Machine Learning Model for estimating travel time of various transportation services",
        "Created Machine Learning system for locating users in subways using WIFI logs",
      ],
      skills: [
        "/images/skills/python.png",
        "/images/skills/scala.jpg",
        "/images/skills/spark.png",
        "/images/skills/tensorflow.png",
        "/images/skills/scikit.png",
        "/images/skills/numpy.png",
        "/images/skills/pandas.png",
        "/images/skills/git.png"
      ]
    },
    {
      title: "Backend Engineer",
      company: "Naver Maps(Public Transportation)",
      period: "JAN 2024- DEC 2024",
      logo: ["/images/naver_icon.png", "/images/navermaps_icon.webp"],
      description: [
        "Renewed server's tokio libraries and rewrote legacy codebase, improving P99 latency by 20%",
        "Introduced rust unit test framework and improved test suite quality by 30%",
        "Invented multi-time table binary search algorithm which speed up subway route search by 5x",
      ],
      skills: [
        "/images/skills/rust.png",
        "/images/skills/golang.png",
        "/images/skills/jenkins.png",
        "/images/skills/kubernetes.png",
        "/images/skills/docker.png",
        "/images/skills/git.png"
      ]
    },
    {
      title: "ML Engineer",
      company: "Naver Maps(Car Navigation)",
      period: "JAN 2025 - PRESENT",
      logo: ["/images/naver_icon.png", "/images/navermaps_icon.webp"],
      description: [
        "Developed computer vision model for detecting road scene objects", 
        "Created LLM agent for automating customer feedback"
      ],
      skills: [
        "/images/skills/python.png",
        "/images/skills/torch.png",
        "/images/skills/langchain.png",
        "/images/skills/opencv.png",
        "/images/skills/fastapi.png",
        "/images/skills/tableau.png",
        "/images/skills/numpy.png",
        "/images/skills/pandas.png",
        "/images/skills/git.png"
      ]
    },
  ];

  const projects = [
    {
      title: "FFXIV Simhelper",
      description: "Developed a DPS simulator for an MMORPG(Final Fantasy XIV) using reinforcement learning, serving hundreds of users daily.",
      icon: ["/images/projects/simhelper_logo.png"],
      screenshot: "/images/projects/simhelper_example.png",
      skills: [
        "/images/skills/python.png",
        "/images/skills/tensorflow.png",
        "/images/skills/spark.png",
        "/images/skills/rust.png",
        "/images/skills/react.png",
        "/images/skills/gcp.png",
        "/images/skills/kubernetes.png"
      ],
      githubUrl: "https://github.com/flyxiv/ffxiv_simhelper",
      demoUrl: "https://ffxivsimhelper.com"
    },
  ];

  const skillColors = {
    "Python": "bg-blue-100 text-blue-700",
    "Rust": "bg-blue-100 text-blue-700",
    "Golang": "bg-blue-100 text-blue-700",
    "Google Cloud": "bg-orange-100 text-orange-700", 
    "TensorFlow": "bg-red-100 text-red-700",
    "Scikit-learn": "bg-red-100 text-red-700",
    "Git": "bg-red-100 text-red-700",
    "Kubernetes": "bg-orange-100 text-orange-700",
    "Docker": "bg-blue-100 text-blue-700",
    "React": "bg-blue-100 text-blue-700",
    "Apache Kafka": "bg-gray-100 text-gray-700",
    "XGBoost": "bg-green-100 text-green-700",
    "PyTorch": "bg-red-100 text-red-700",
    "OpenCV": "bg-blue-100 text-blue-700",
    "MMDetection": "bg-blue-100 text-blue-700",
    "Distributed GPU Training": "bg-blue-100 text-blue-700",
    "PEFT": "bg-blue-100 text-blue-700",
    "Huggingface": "bg-blue-100 text-blue-700",
    "FastAPI": "bg-green-100 text-green-700",
    "MLflow": "bg-blue-100 text-blue-700",
    "Transformers": "bg-purple-100 text-purple-700",
    "MySQL": "bg-blue-100 text-blue-700",
    "Tableau": "bg-blue-100 text-blue-700",
    "Spark": "bg-orange-100 text-orange-700",
    "LangChain": "bg-purple-100 text-purple-700",
    "LangGraph": "bg-purple-100 text-purple-700",
    "FAISS": "bg-blue-100 text-blue-700"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AboutMe />
        <Experience experiences={experiences} skillColors={skillColors} />
        <FeaturedProjects projects={projects} skillColors={skillColors} />
        <Skills skillColors={skillColors} />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio; 