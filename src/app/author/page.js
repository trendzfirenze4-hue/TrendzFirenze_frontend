"use client";
import { useEffect, useState } from "react";

export default function AboutAuthor() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <div
        className={`max-w-3xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl transform transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Name */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Mohammad Nouman Molla
        </h1>

        {/* Role */}
        <p className="text-center text-gray-300 mb-4">
          Web Developer
        </p>

        {/* Qualification */}
        <p className="text-center text-blue-400 mb-6">
          Master’s Degree in Computer Systems
        </p>

        {/* Description */}
        <p className="text-gray-200 text-center leading-relaxed">
          Passionate and results-driven Web Developer with strong expertise in
          full-stack development. Skilled in building scalable, secure, and
          high-performance applications with modern technologies and clean
          architecture.
        </p>

        {/* Skills */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            "React.js",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "MySQL",
            "PostgreSQL",
            "Spring Boot",
            "Django REST API",
            "Redux Toolkit",
            "JWT Authentication",
            "Role-Based Access",
            "Docker",
            "Vercel",
            "Render",
            "Git/GitHub",
            "CI/CD",
            "AI Chatbots",
            "n8n Automation",
          ].map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 border border-blue-400 rounded-full text-sm hover:bg-blue-500 transition"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-gray-300 space-y-2">
          <p>Email: noumanmolla12@gmail.com</p>
          <p>Phone: +91 9733116221</p>
          <p>Location: Nalhati, West Bengal, India</p>
        </div>
      </div>
    </section>
  );
}