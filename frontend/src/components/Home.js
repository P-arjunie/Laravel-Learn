import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Users, Award, ChevronRight, Star, Book } from 'lucide-react';
import courseSection from "../images/course-section.jpeg";
import "./Home.css";

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="homepage">
      {/* Floating Shapes Background */}
      <div className="shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            #1 Learning Platform for Students
          </div>
          <h1 className="hero-title">
            Master New Skills with <span className="highlight">LEARN</span>
          </h1>
          <p className="hero-subtitle">
            Join over 15,000 students transforming their careers through interactive online courses. 
            Learn from industry experts at your own pace.
          </p>
          
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-icon">
                <BookOpen size={28} />
              </div>
              <div className="stat-content">
                <h3>100+</h3>
                <p>Expert Courses</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={28} />
              </div>
              <div className="stat-content">
                <h3>15K+</h3>
                <p>Active Learners</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Award size={28} />
              </div>
              <div className="stat-content">
                <h3>8K+</h3>
                <p>Graduates</p>
              </div>
            </div>
          </div>

          <div className="cta-container">
            <Link to="/login" className="cta-primary">
              Get Started
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>


        {/* Featured Courses Section with Image */}
      <section className="courses-section">
        <div className="section-header-container">
          <div className="section-text">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Courses</h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              Start your journey with our most popular courses designed to help you master new skills and advance your career.
              Join thousands of learners who have transformed their lives through our expert-led programs.
            </p>
          </div>
          <div className="section-image">
            <img 
              src={courseSection} 
              alt="Featured Courses"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="course-cards">
          {[
            {
              title: "Web Development Bootcamp",
              category: "Programming",
              rating: 4.8,
              students: "2.3k",
              icon: "💻"
            },
            {
              title: "UI/UX Design Masterclass",
              category: "Design",
              rating: 4.9,
              students: "1.8k",
              icon: "🎨"
            },
            {
              title: "Data Science Fundamentals",
              category: "Data Science",
              rating: 4.7,
              students: "3.1k",
              icon: "📊"
            },
            {
              title: "Digital Marketing Pro",
              category: "Marketing",
              rating: 4.6,
              students: "2.5k",
              icon: "📱"
            }
          ].map((course, index) => (
            <div 
              key={index}
              className="course-card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="course-icon">{course.icon}</div>
              <div className="course-category">{course.category}</div>
              <h3 className="course-title">{course.title}</h3>
              <div className="course-stats">
                <div className="rating">
                  <Star className="inline text-yellow-400" size={16} />
                  <span>{course.rating}</span>
                </div>
                <div className="students">
                  <Users className="inline text-blue-500" size={16} />
                  <span>{course.students} students</span>
                </div>
              </div>
              <Link to={`/course/${index}`} className="course-link">
                Learn More <ChevronRight size={16} className="inline" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="text-3xl font-bold mb-2">How LEARN Works</h2>
          <p className="text-gray-200 mb-8">Three simple steps to start your learning journey</p>
        </div>

        <div className="steps">
          {[
            {
              number: "01",
              title: "Choose Your Course",
              description: "Browse our catalog of professional courses",
              icon: <Book className="step-icon" />
            },
            {
              number: "02",
              title: "Learn at Your Pace",
              description: "Access content anytime, anywhere",
              icon: <Play className="step-icon" />
            },
            {
              number: "03",
              title: "Get Certified",
              description: "Earn certificates for your achievements",
              icon: <Award className="step-icon" />
            }
          ].map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              {step.icon}
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;