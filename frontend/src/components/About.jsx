import React from "react";
import { motion } from "framer-motion";
import "./about.css";

const About = () => {
    const cards = [
        {
            title: "What It Does",
            desc: "Analyzes user symptoms using machine learning to predict possible diseases and provide early health guidance."
        },
        {
            title: "How It Helps",
            desc: "Delivers personalized suggestions such as medications, diet plans, workouts, and precautions in seconds."
        },
        {
            title: "Why It Matters",
            desc: "Reduces dependency on immediate clinical visits for minor issues and empowers users with quick, reliable insights."
        }
    ];

    return (
        <section className="about-section">
            <div className="about-bg"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="about-wrapper"
            >
                <h2 className="about-title">About Healthcare Chatbot</h2>
                <p className="about-desc">
                    The Healthcare Chatbot is an AI-powered assistant designed to provide
                    early health guidance through intelligent symptom analysis. It bridges
                    the gap between users and medical knowledge by offering fast, reliable,
                    and easy-to-understand health insights.
                </p>

                <div className="about-cards">
                    {cards.map((c, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="about-card-box"
                        >
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default About;
