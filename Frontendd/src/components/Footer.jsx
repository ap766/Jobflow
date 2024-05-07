import React from 'react';
import './Footer.css'; // Import your CSS file

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>Jobflow</h3>
                <div className="contact-container">
                    <p>Contact me: </p>
                    <img src={require('./gi.png')} alt="Icon" />
                    <p>ap766</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
