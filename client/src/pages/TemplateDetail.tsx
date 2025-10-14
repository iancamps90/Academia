import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import type { Template } from '../types';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await api.get(`/templates/${id}`);
        setTemplate(response.data);
      } catch (error) {
        console.error('Error fetching template:', error);
        toast.error('Error al cargar la plantilla');
        navigate('/templates');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTemplate();
    }
  }, [id, navigate]);

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para comprar plantillas');
      navigate('/login');
      return;
    }

    if (!template) return;

    setPurchasing(true);
    try {
      const response = await api.post(`/checkout/template/${template.id}`);
      window.location.href = response.data.url;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al procesar el pago');
    } finally {
      setPurchasing(false);
    }
  };

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

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando plantilla...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
          Plantilla no encontrada
        </h1>
        <button
          onClick={() => navigate('/templates')}
          className="btn btn-primary"
        >
          Volver a Plantillas
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Contenido Principal */}
        <div>
          {/* Imagen de la Plantilla */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <img
              src={template.image}
              alt={template.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{getCategoryIcon(template.category)}</span>
                <span style={{ 
                  fontSize: '0.875rem', 
                  backgroundColor: '#e0e7ff', 
                  color: '#3730a3', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '0.5rem',
                  fontWeight: '500'
                }}>
                  {getCategoryName(template.category)}
                </span>
              </div>
              
              <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
                {template.title}
              </h1>
              
              <div style={{ marginBottom: '1rem', color: '#6b7280' }}>
                {new Date(template.createdAt).toLocaleDateString('es-ES')}
              </div>

              <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.6' }}>
                {template.description}
              </p>
            </div>
          </div>

          {/* Características de la Plantilla */}
          <div className="card">
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                ¿Qué incluye esta plantilla?
              </h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Código fuente completo y comentado',
                  'Documentación detallada de instalación',
                  'Archivos de configuración listos',
                  'Ejemplos de uso y casos prácticos',
                  'Soporte técnico por 30 días',
                  'Actualizaciones gratuitas por 1 año'
                ].map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#10b981', marginRight: '0.75rem', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: '#374151' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar de Compra */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '2rem' }}>
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
                €{template.price}
              </div>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                Pago único • Acceso inmediato
              </p>

              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginBottom: '1.5rem' }}
              >
                {purchasing ? 'Procesando...' : 'Comprar Plantilla'}
              </button>

              <div style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  <span>Descarga inmediata</span>
                </div>
                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  <span>Licencia comercial</span>
                </div>
                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  <span>Soporte técnico</span>
                </div>
                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                  <span>Actualizaciones gratuitas</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>
                  Pago seguro procesado por Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
