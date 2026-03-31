import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const { user } = useAuth();

  const stats = [
    { number: '500+', label: 'Free Resources' },
    { number: '12', label: 'Subjects Covered' },
    { number: '3', label: 'Difficulty Levels' },
    { number: '100%', label: 'Free Access' },
  ];

  const features = [
    { icon: '🎥', title: 'Video Lessons', desc: 'Curated video content from top educators across all subjects.' },
    { icon: '📄', title: 'PDF Notes', desc: 'Downloadable study materials and comprehensive notes.' },
    { icon: '📝', title: 'Practice Quizzes', desc: 'Test your knowledge with subject-wise quizzes.' },
    { icon: '📰', title: 'Articles', desc: 'In-depth articles and explanations on complex topics.' },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="page-container hero-content">
          <h1>Free Learning Resources<br />for <span className="highlight">Every Student</span></h1>
          <p className="hero-sub">
            Millions of students in India lack access to quality study materials.
            EduReach bridges that gap - free, structured, and accessible to all.
          </p>
          <div className="hero-cta">
            {user ? (
              <Link to="/resources"><button className="btn-primary hero-btn">Browse Resources</button></Link>
            ) : (
              <>
                <Link to="/register"><button className="btn-primary hero-btn">Get Started</button></Link>
                <Link to="/resources"><button className="btn-primary hero-btn">Explore Resources</button></Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="page-container stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="page-container">
          <div className="section-header">
            <h2>Everything You Need to Learn</h2>
            <p>Multiple resource formats to match every learning style</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="page-container cta-inner">
          <h2>Start Learning Today</h2>
          <p>Join thousands of students already using EduReach</p>
          <Link to="/register"><button className="btn-primary hero-btn">Create Account</button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="page-container footer-inner">
          <span>© 2024 EduReach — Built for Better Education</span>
        </div>
      </footer>
    </div>
  );
}
