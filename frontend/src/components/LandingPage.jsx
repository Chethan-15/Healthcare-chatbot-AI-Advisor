import React from 'react';
import { ShieldCheck, Brain, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-blob blob-1"></div>
                <div className="hero-bg-blob blob-2"></div>

                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.h1 variants={itemVariants} className="hero-title">
                            Your Health, <br />
                            <span className="heading-gradient">Empowered by AI</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="hero-subtitle">
                            Instant, accurate, and 24/7 preliminary health guidance.
                            Detect symptoms early and make informed decisions with our advanced Healthcare Chatbot.
                        </motion.p>

                        <motion.div variants={itemVariants} className="hero-buttons">
                            <Link to="/chat" className="btn btn-primary">
                                Start Checkup <ArrowRight size={20} />
                            </Link>
                            <Link to="/about" className="btn btn-secondary">
                                Learn More
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Info Section */}
            <section className="info-section">
                <div className="container">
                    <motion.div
                        className="info-cards"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <Card
                            icon={<ShieldCheck size={32} />}
                            title="Early Detection"
                            desc="The system analyzes symptoms to help identify potential health issues at an early stage."
                            variants={itemVariants}
                        />
                        <Card
                            icon={<Brain size={32} />}
                            title="AI-Powered Guidance"
                            desc="Smart algorithms compare your symptoms against trained medical data for precise insights."
                            variants={itemVariants}
                        />
                        <Card
                            icon={<MessageSquare size={32} />}
                            title="Instant Support"
                            desc="Available 24/7 to answer queries and guide users through their wellness journey."
                            variants={itemVariants}
                        />
                    </motion.div>
                </div>
            </section>

            {/* How It Works – About Style */}
            <section className="about-section">
                <div className="about-bg"></div>

                <div className="about-wrapper">
                    <h2 className="about-title">How It Works</h2>
                    <p className="about-desc">
                        Getting health guidance is simple, fast, and secure. Follow these three
                        steps to understand your condition and receive instant AI-powered help.
                    </p>

                    <div className="about-cards">
                        <div className="about-card-box">
                            <h3>Describe Symptoms</h3>
                            <p>
                                Enter your symptoms in simple words such as headache, fever, or cough.
                            </p>
                        </div>

                        <div className="about-card-box featured">
                            <h3>AI Analysis</h3>
                            <p>
                                Our intelligent model processes your input using trained medical data
                                to identify possible conditions.
                            </p>
                        </div>

                        <div className="about-card-box">
                            <h3>Get Results</h3>
                            <p>
                                Receive predicted disease, precautions, medication suggestions, and
                                lifestyle guidance instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Card = ({ icon, title, desc, variants }) => (
    <motion.div className="info-card" variants={variants}>
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
    </motion.div>
);

export default LandingPage;
