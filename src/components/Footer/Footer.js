import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className='logo-wrapper'>
                <img src="../assets/images/logo1.png" alt='logo' className="logo-image"></img>
            </div>
            <div className='social-wrapper'>
                <a href='https://www.facebook.com'  target='_blank' rel='noopener noreferrer'><img src='../assets/icons/FB.png' alt='facebook'></img></a>
                <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'><img src= '../assets/icons/INSTA.png' alt='instagram'></img></a>
            </div>
            <div className='copyright'>
        Copyright - Golux Technologies 2019 - Martina Trajkovic 
            </div>
        </div>
    )
}

export default Footer;
