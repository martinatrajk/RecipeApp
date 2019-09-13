import React from 'react';
import './Footer.css';
import fb from '../../assets/icons/FB.png'
import insta from '../../assets/icons/INSTA.png'
import logo from '../../assets/images/logo.png'

function Footer() {
    return (
        <div className="footer">
            <div className='logo-wrapper'>
                <img src={logo} alt='logo' className="logo-image"></img>
            </div>
            <div className='social-wrapper'>
                <a href='https://www.facebook.com'  target='_blank' rel='noopener noreferrer'><img src={fb} alt='facebook'></img></a>
                <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'><img src={insta} alt='instagram'></img></a>
            </div>
            <div className='copyright'>
        Copyright - Golux Technologies 2019 - Martina Trajkovic 
            </div>
        </div>
    )
}

export default Footer;
