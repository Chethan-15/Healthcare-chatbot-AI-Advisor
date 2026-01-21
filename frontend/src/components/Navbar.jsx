import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme, isDark } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <div className="logo-icon">
                        <Activity size={24} />
                    </div>
                    <span className="heading-gradient">MediBot</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/features" className="nav-link">Features</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>

                    {/* Theme Toggle Button */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link to="/chat" className="btn btn-primary">
                        Start Checkup
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link to="/features" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                    <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

                    {/* Theme Toggle in Mobile Menu */}
                    <button
                        className="theme-toggle mobile"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <>
                                <Sun size={20} />
                                <span>Light Mode</span>
                            </>
                        ) : (
                            <>
                                <Moon size={20} />
                                <span>Dark Mode</span>
                            </>
                        )}
                    </button>

                    <Link
                        to="/chat"
                        className="btn btn-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Start Checkup
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
