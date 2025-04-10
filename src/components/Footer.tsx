
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-sm text-gray-500 py-4">
      <p>© {new Date().getFullYear()} Boredom Blaster Adventures</p>
      <p className="mt-1">Play more, be bored less!</p>
    </footer>
  );
};

export default Footer;
