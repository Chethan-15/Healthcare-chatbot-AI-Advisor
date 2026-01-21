import React from "react";
import { Brain, MessageSquare, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import "./features.css";

const Features = () => {
    const features = [
        {
            icon: <ShieldCheck size={30} />,
            title: "Symptom-Based Diagnosis",
            desc: "The chatbot analyzes user symptoms using machine learning to accurately predict possible health conditions and provide early guidance.",
            featured: false,
        },
        {
            icon: <Brain size={30} />,
            title: "Smart Health Insights",
            desc: "AI-powered intelligence delivers personalized disease details, medication suggestions, diet plans, and precautionary advice.",
            featured: true,
        },
        {
            icon: <MessageSquare size={30} />,
            title: "24/7 Virtual Assistant",
            desc: "Always available to answer health-related queries and offer reliable preliminary medical support anytime and anywhere.",
            featured: false,
        },
        {
            icon: <ShieldCheck size={30} />,
            title: "Data-Driven Accuracy",
            desc: "Predictions are based on trained medical datasets, ensuring reliable and consistent results for symptom-based analysis.",
            featured: false,
        },
        {
            icon: <Brain size={30} />,
            title: "User-Friendly Experience",
            desc: "Designed with simplicity in mind, the chatbot offers an intuitive interface that makes health guidance easy for everyone.",
            featured: false,
        },
        {
            icon: <MessageSquare size={30} />,
            title: "Privacy & Safety First",
            desc: "The system processes user inputs securely without storing personal data, ensuring a safe and confidential healthcare experience.",
            featured: false,
        },

    ];


    return (
        <section className="features-section">
            <div className="features-bg"></div>

            <div className="features-container">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className={`feature-card ${f.featured ? "featured" : ""}`}
                    >
                        <div className="icon-box">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;
