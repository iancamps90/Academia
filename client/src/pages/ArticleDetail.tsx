import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Article } from '../types';
import api from '../utils/api';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando artículo...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
          Artículo no encontrado
        </h1>
        <button
          onClick={() => navigate('/blog')}
          className="btn btn-primary"
        >
          Volver al Blog
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        {/* Header del Artículo */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ 
              fontSize: '0.875rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '1rem',
              fontWeight: '500'
            }}>
              Blog
            </span>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Por {article.author.name}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {formatDate(article.createdAt)}
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            color: '#111827',
            lineHeight: '1.2'
          }}>
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6b7280', 
              lineHeight: '1.6',
              fontStyle: 'italic'
            }}>
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Imagen del Artículo */}
        {article.image && (
          <div style={{ marginBottom: '3rem' }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
        )}

        {/* Contenido del Artículo */}
        <div 
          style={{ 
            fontSize: '1.125rem', 
            lineHeight: '1.8', 
            color: '#374151',
            marginBottom: '3rem'
          }}
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
        />

        {/* Footer del Artículo */}
        <footer style={{ 
          padding: '2rem 0', 
          borderTop: '1px solid #e5e7eb',
          marginTop: '3rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                Publicado el {formatDate(article.createdAt)} por {article.author.name}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => navigate('/blog')}
                className="btn btn-secondary"
              >
                ← Volver al Blog
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn btn-primary"
              >
                ↑ Ir arriba
              </button>
            </div>
          </div>
        </footer>
      </motion.article>
    </div>
  );
};

export default ArticleDetail;
