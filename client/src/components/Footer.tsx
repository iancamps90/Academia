import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Logo */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
              academy.iancamps.dev
            </h3>
          </div>

          {/* Enlaces */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
              Inicio
            </a>
            <a href="/courses" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
              Cursos
            </a>
            <a href="https://iancamps.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
              iancamps.dev
            </a>
            <a href="mailto:hola@iancamps.dev" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0 }}>
              © 2025 academy.iancamps.dev
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
