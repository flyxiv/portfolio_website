import React from 'react';
import Header from '../components/Header';
import AboutMe from '../components/AboutMe';
import Experience from '../components/Experience';
import FeaturedProjects from '../components/FeaturedProjects';
import SideProjects from '../components/SideProjects';
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

  const workProjects = [
    {
      title: "Real-time Travel Time Estimation",
      description: "Developed Naver Map's first real-time Deep Learning Model for estimating travel time of car and public transportation routes, improving MAPE by 3%p.",
      icon: ["/images/naver_icon.png", "/images/navermaps_icon.webp"],
      screenshot: "/images/works/eta.png",
      skills: [
        "/images/skills/python.png",
        "/images/skills/tensorflow.png",
        "/images/skills/spark.png",
        "/images/skills/scikit.png",
        "/images/skills/numpy.png",
        "/images/skills/pandas.png"
      ],
      period: "2020-2023"
    },
    {
      title: "WIFI Fingerprint for Subway Location Estimation",
      description: "Created Machine Learning system using different clustring algorithms for locating users in subways using WIFI logs, achieving 98+% accuracy in manual labeled validation dataset.",
      icon: ["/images/naver_icon.png", "/images/navermaps_icon.webp"],
      screenshot: "/images/works/wps.png",
      skills: [
        "/images/skills/python.png",
        "/images/skills/spark.png",
        "/images/skills/scikit.png",
        "/images/skills/numpy.png",
        "/images/skills/pandas.png",
        "/images/skills/git.png"
      ],
      period: "2024"
    },
    {
      title: "Road Scene Object Detection",
      description: "Developed computer vision model for detecting road scene objects, achieving +95% mAP@50 for more than 40 different categories and reducing manual labeling cost by 90%.",
      icon: ["/images/naver_icon.png", "/images/navermaps_icon.webp"],
      screenshot: "/images/works/road_detection.png",
      skills: [
        "/images/skills/python.png",
        "/images/skills/torch.png",
        "/images/skills/opencv.png",
        "/images/skills/fastapi.png"
      ],
      period: "2025-Present"
    },
    {
      title: "Naver Maps Ferry Route Search",
      description: "Spearheaded development of Naver Maps' ferry route search feature, providing users with real-time ferry schedules and route information.",
      icon: ["/images/naver_icon.png", "/images/navermaps_icon.webp"],
      screenshot: "/images/works/ferry.png",
      skills: [
        "/images/skills/rust.png",
        "/images/skills/golang.png",
        "/images/skills/kubernetes.png",
        "/images/skills/docker.png"
      ],
      period: "2024"
    }

  ];

  const sideProjects = [
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
    {
      title: "Nino - 2D Pixel Art Collector",
      description: "Developed a computer vision model system for collecting 2D pixel art in a given gameplay VOD or screenshot, which is used for training generation models to create demo pixel art sprites similar to the collected ones.",
      icon: [],
      screenshot: "/images/projects/nino_example.png",
      skills: [
        "/images/skills/python.png",
        "/images/skills/torch.png",
        "/images/skills/opencv.png",
        "/images/skills/fastapi.png",
        "/images/skills/gcp.png",
        "/images/skills/docker.png",
        "/images/skills/kubernetes.png",
      ],
      githubUrl: "https://github.com/flyxiv/nino",
      demoUrl: ""
    }
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
        <FeaturedProjects projects={workProjects} skillColors={skillColors} />
        <SideProjects projects={sideProjects} skillColors={skillColors} />
        <Skills skillColors={skillColors} />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio; 