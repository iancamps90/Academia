import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import type { Purchase } from '../types';
import api from '../utils/api';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await api.get('/user/courses');
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching user courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <div className="container">
        {/* Header Ultra Moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: 'white'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>👋</span>
          </motion.div>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            ¡Hola, {user?.name}!
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.9,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            Bienvenido a tu dashboard de academy.iancamps.dev
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Mis Cursos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ gridColumn: 'span 2' }}
          >
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                  📚 Mis Cursos
                </h2>
                <Link
                  to="/courses"
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  Explorar Cursos
                </Link>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '3px solid #e5e7eb', 
                    borderTop: '3px solid #2563eb', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }}></div>
                  <p style={{ marginTop: '1rem', color: '#6b7280' }}>Cargando tus cursos...</p>
                </div>
              ) : purchases.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {purchases.map((purchase, index) => (
                    <motion.div
                      key={purchase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={purchase.course.image}
                          alt={purchase.course.title}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                            {purchase.course.title}
                          </h3>
                          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                            Comprado el {new Date(purchase.createdAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb' }}>
                            €{purchase.course.price}
                          </span>
                          <div style={{ marginTop: '0.5rem' }}>
                            <button style={{
                              backgroundColor: '#10b981',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              border: 'none',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}>
                              Acceder al Curso
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ textAlign: 'center', padding: '3rem' }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
                    Aún no tienes cursos
                  </h3>
                  <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
                    Explora nuestros cursos y comienza tu viaje de aprendizaje
                  </p>
                  <Link
                    to="/courses"
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: '500',
                      display: 'inline-block'
                    }}
                  >
                    Explorar Cursos
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar Ultra Moderno */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Estadísticas */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                📊 Tu Progreso
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Cursos Comprados</span>
                  <span style={{ fontWeight: '700', color: '#2563eb', fontSize: '1.125rem' }}>{purchases.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Miembro desde</span>
                  <span style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem' }}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Rol</span>
                  <span style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem', textTransform: 'capitalize' }}>{user?.role}</span>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                ⚡ Acciones Rápidas
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  to="/courses"
                  style={{
                    display: 'block',
                    width: '100%',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  Explorar Cursos
                </Link>
                <Link
                  to="/profile"
                  style={{
                    display: 'block',
                    width: '100%',
                    backgroundColor: '#f1f5f9',
                    color: '#0f172a',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: '500',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s'
                  }}
                >
                  Mi Perfil
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    style={{
                      display: 'block',
                      width: '100%',
                      backgroundColor: '#1f2937',
                      color: 'white',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      textAlign: 'center',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    Panel Admin
                  </Link>
                )}
              </div>
            </div>

            {/* Próximamente */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                🚀 Próximamente
              </h3>
              <p style={{ opacity: 0.9, fontSize: '0.875rem', marginBottom: '1rem' }}>
                Nuevos cursos y automatizaciones están en camino
              </p>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, lineHeight: '1.4' }}>
                • Automatización con Zapier<br/>
                • Integraciones con n8n<br/>
                • Templates de React<br/>
                • APIs con Node.js
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
