import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [productsDropdown, setProductsDropdown] = useState(false);
    const [aboutDropdown, setAboutDropdown] = useState(false);
    const productsTimeoutRef = useRef(null);
    const aboutTimeoutRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleMouseEnter = (dropdownType) => {
        if (dropdownType === 'products') {
            if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
            setProductsDropdown(true);
        } else if (dropdownType === 'about') {
            if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
            setAboutDropdown(true);
        }
    };

    const handleMouseLeave = (dropdownType) => {
        const timeout = setTimeout(() => {
            if (dropdownType === 'products') setProductsDropdown(false);
            else if (dropdownType === 'about') setAboutDropdown(false);
        }, 100);

        if (dropdownType === 'products') productsTimeoutRef.current = timeout;
        else aboutTimeoutRef.current = timeout;
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            {/* <div className="navbar-top-bar"></div> */}
            <div className="navbar-content">
                <Link to="/" className="navbar-logo">
                    <img src="/images/logo.png" alt="Lumeo Logo" />
                </Link>
                
                <div className={`navbar-links-container ${menuOpen ? 'open' : ''}`}>
                    <div className="navbar-center-links">
                        <div className="navbar-links">
                            <div 
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('products')}
                                onMouseLeave={() => handleMouseLeave('products')}
                            >
                                <Link to="/products" className="nav-link">Products</Link>
                                {/* {productsDropdown && (
                                    <div 
                                        className="dropdown"
                                        onMouseEnter={() => handleMouseEnter('products')}
                                        onMouseLeave={() => handleMouseLeave('products')}
                                    >
                                        <Link to="/products">Product</Link>
                                    </div>
                                )} */}
                            </div>
                            <div 
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('about')}
                                onMouseLeave={() => handleMouseLeave('about')}
                            >
                                <Link to="/story" className="nav-link">About</Link>
                                {aboutDropdown && (
                                    <div 
                                        className="dropdown"
                                        onMouseEnter={() => handleMouseEnter('about')}
                                        onMouseLeave={() => handleMouseLeave('about')}
                                    >
                                        <Link to="/team">The Team</Link>
                                        <Link to="/story">The Story</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="navbar-action">
                    <button className="btn btn-primary">Get the app</button>
                </div>

                <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 