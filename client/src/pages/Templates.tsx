import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Template } from '../types';
import api from '../utils/api';

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'web' | 'automation' | 'other'>('all');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(template => template.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return '🌐';
      case 'automation': return '⚡';
      case 'other': return '📦';
      default: return '📄';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'web': return 'Desarrollo Web';
      case 'automation': return 'Automatización';
      case 'other': return 'Otros';
      default: return 'General';
    }
  };

  return (
    <div>
      {/* Header Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
              🛠️ Plantillas Premium
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Templates profesionales listos para usar. Acelera tu desarrollo con nuestras plantillas de alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '2rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { key: 'all', label: 'Todas', icon: '📋' },
              { key: 'web', label: 'Web', icon: '🌐' },
              { key: 'automation', label: 'Automatización', icon: '⚡' },
              { key: 'other', label: 'Otros', icon: '📦' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: filter === key ? '#2563eb' : '#f1f5f9',
                  color: filter === key ? 'white' : '#374151',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
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
      </section>

      {/* Templates Grid */}
      <section style={{ padding: '2rem 0 4rem', backgroundColor: 'white' }}>
        <div className="container">
          {loading ? (
            <div className="loading">
              <p>Cargando plantillas...</p>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card course-card"
                  >
                    <Link to={`/templates/${template.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img
                        src={template.image}
                        alt={template.title}
                        className="course-image"
                      />
                      
                      <div className="course-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.25rem' }}>{getCategoryIcon(template.category)}</span>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            backgroundColor: '#e0e7ff', 
                            color: '#3730a3', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '0.25rem',
                            fontWeight: '500'
                          }}>
                            {getCategoryName(template.category)}
                          </span>
                        </div>
                        
                        <h3 className="course-title">
                          {template.title}
                        </h3>
                        <p className="course-description">
                          {template.description}
                        </p>
                        <div className="course-price">
                          €{template.price}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                            {new Date(template.createdAt).toLocaleDateString('es-ES')}
                          </span>
                          <span style={{ color: '#2563eb', fontWeight: '500' }}>
                            Ver detalles →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#6b7280' }}>
                    No hay plantillas en esta categoría
                  </h3>
                  <p style={{ color: '#9ca3af' }}>
                    Próximamente añadiremos más plantillas en esta categoría.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Templates;
