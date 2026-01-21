import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import "./contact.css";

const Contact = () => {
    const contactInfo = [
        {
            icon: <Mail size={28} />,
            title: "Email Us",
            detail: "healthcenter.support@gmail.com",
            link: "mailto:healthcenter.support@gmail.com"
        },
        {
            icon: <Phone size={28} />,
            title: "Call Us",
            detail: "+1 (555) 123-4567",
            link: "tel:+15551234567"
        },
        {
            icon: <MapPin size={28} />,
            title: "Visit Us",
            detail: "123 Healthcare Ave, Medical District",
            link: null
        }
    ];

    return (
        <section className="contact-section">
            <div className="contact-bg"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="contact-wrapper"
            >
                <h2 className="contact-title">Get In Touch</h2>
                <p className="contact-desc">
                    Have questions or need assistance? We're here to help. Reach out to us
                    through any of the following channels and we'll get back to you as soon
                    as possible.
                </p>

                <div className="contact-cards">
                    {contactInfo.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -6 }}
                            className="contact-card"
                        >
                            <div className="contact-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            {item.link ? (
                                <a href={item.link} className="contact-link">
                                    {item.detail}
                                </a>
                            ) : (
                                <p>{item.detail}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="contact-note"
                >
                    <p>
                        <strong>Note:</strong> This is an AI-powered health guidance tool. For
                        medical emergencies, please contact your local emergency services
                        immediately.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
