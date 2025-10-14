import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="logo">
            academy.iancamps.dev
          </Link>
        </motion.div>

            {/* Desktop Menu */}
            <ul className="nav-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/courses">Cursos</Link>
              </li>
              <li>
                <Link to="/templates">Plantillas</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  {user.role === 'admin' && (
                    <li>
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}
                  <li>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Hola, {user.name}
                    </span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-secondary">
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Iniciar Sesión</Link>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-primary">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#374151'
              }}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid #e5e7eb',
            padding: '1rem 0'
          }}
          className="mobile-menu"
        >
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link to="/courses" onClick={() => setIsMenuOpen(false)}>Cursos</Link>
              <Link to="/templates" onClick={() => setIsMenuOpen(false)}>Plantillas</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                  )}
                  <div style={{ padding: '0.5rem 0', borderTop: '1px solid #e5e7eb', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Hola, {user.name}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%' }}>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
