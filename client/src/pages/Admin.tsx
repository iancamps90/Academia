import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

interface AdminStats {
  users: number;
  courses: number;
  templates: number;
  articles: number;
  purchases: number;
  templatePurchases: number;
}

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'templates' | 'articles' | 'users'>('overview');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Error al cargar estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                🛠️ Panel de Administración
              </h1>
              <p style={{ opacity: 0.9, margin: 0 }}>
                Bienvenido, {user?.name} - Gestiona tu plataforma
              </p>
            </div>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Última actualización</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {new Date().toLocaleTimeString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            overflowX: 'auto',
            padding: '1rem 0'
          }}>
            {[
              { key: 'overview', label: '📊 Resumen', icon: '📊' },
              { key: 'courses', label: '🎓 Cursos', icon: '🎓' },
              { key: 'templates', label: '🛠️ Plantillas', icon: '🛠️' },
              { key: 'articles', label: '📝 Artículos', icon: '📝' },
              { key: 'users', label: '👥 Usuarios', icon: '👥' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: activeTab === key ? '#2563eb' : '#f1f5f9',
                  color: activeTab === key ? 'white' : '#374151',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '2rem 0' }}>
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#111827' }}>
              Resumen General
            </h2>
            
            {stats && (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {[
                  { label: 'Usuarios Registrados', value: stats.users, icon: '👥', color: '#3b82f6' },
                  { label: 'Cursos Disponibles', value: stats.courses, icon: '🎓', color: '#10b981' },
                  { label: 'Plantillas', value: stats.templates, icon: '🛠️', color: '#f59e0b' },
                  { label: 'Artículos Publicados', value: stats.articles, icon: '📝', color: '#8b5cf6' },
                  { label: 'Compras de Cursos', value: stats.purchases, icon: '💰', color: '#ef4444' },
                  { label: 'Compras de Plantillas', value: stats.templatePurchases, icon: '💎', color: '#06b6d4' }
                ].map(({ label, value, icon, color }) => (
                  <div key={label} className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color, marginBottom: '0.5rem' }}>
                      {value}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827' }}>
                Acciones Rápidas
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem' 
              }}>
                <button className="btn btn-primary" style={{ padding: '1rem' }}>
                  ➕ Crear Nuevo Curso
                </button>
                <button className="btn btn-primary" style={{ padding: '1rem' }}>
                  🛠️ Añadir Plantilla
                </button>
                <button className="btn btn-primary" style={{ padding: '1rem' }}>
                  📝 Escribir Artículo
                </button>
                <button className="btn btn-secondary" style={{ padding: '1rem' }}>
                  📊 Ver Reportes
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                Gestión de Cursos
              </h2>
              <button className="btn btn-primary">
                ➕ Crear Nuevo Curso
              </button>
            </div>
            
            <div className="card">
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  CRUD de Cursos
                </h3>
                <p>Próximamente: Crear, editar y eliminar cursos desde aquí</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'templates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                Gestión de Plantillas
              </h2>
              <button className="btn btn-primary">
                ➕ Añadir Plantilla
              </button>
            </div>
            
            <div className="card">
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  CRUD de Plantillas
                </h3>
                <p>Próximamente: Subir y gestionar plantillas desde aquí</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'articles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                Gestión de Artículos
              </h2>
              <button className="btn btn-primary">
                ✍️ Escribir Artículo
              </button>
            </div>
            
            <div className="card">
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Editor de Artículos
                </h3>
                <p>Próximamente: Editor WYSIWYG para crear y editar artículos</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#111827' }}>
              Gestión de Usuarios
            </h2>
            
            <div className="card">
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Lista de Usuarios
                </h3>
                <p>Próximamente: Ver y gestionar usuarios registrados</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
