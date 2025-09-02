import React from 'react';
import { FaGithub, FaLinkedin, FaUser } from 'react-icons/fa';

const ContactSidebar = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-30">
      <div className="bg-black/50 backdrop-blur-md rounded-r-lg px-3 py-4 space-y-6 flex flex-col items-center shadow-lg border border-white/10">
        <a href="https://github.com/BipulB7/Cosmico-Backend" target="_blank" rel="noopener noreferrer">
          <FaGithub className="contact-icon" />
        </a>
        <a href="https://www.linkedin.com/in/bipul77/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="contact-icon" />
        </a>
        <a href="https://bipulpbanjade.com/" target="_blank" rel="noopener noreferrer">
          <FaUser className="contact-icon" />
        </a>
      </div>
    </div>
  );
};

export default ContactSidebar;
