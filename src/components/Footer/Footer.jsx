import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/shipping">Shipping & Returns</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Bhairahawa, Nepal</p>
                    <p>Email: help@solemate.com</p>
                    <p>Phone: +977-9862712973</p>
                </div>
                <div className="footer-section">
                    <h4>Newsletter</h4>
                    <form>
                        <input type="email" placeholder="Your email address" required/>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer-social">
                <a href="https://www.facebook.com/" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.x.com/" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com/" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com/" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Sole Mate. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
