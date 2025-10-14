import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Article } from '../types';
import api from '../utils/api';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div>
      {/* Header Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
              📝 Blog & Noticias
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Mantente al día con las últimas tendencias en desarrollo web, automatización y tecnología.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {articles.length > 0 && (
        <section style={{ padding: '2rem 0', backgroundColor: 'white' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
              Artículo Destacado
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <Link to={`/blog/${articles[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {articles[0].image && (
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      backgroundColor: '#2563eb', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '1rem',
                      fontWeight: '500'
                    }}>
                      Destacado
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Por {articles[0].author.name}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {formatDate(articles[0].createdAt)}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                    {articles[0].title}
                  </h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>
                    {articles[0].excerpt || truncateText(articles[0].content, 200)}
                  </p>
                  <span style={{ color: '#2563eb', fontWeight: '500' }}>
                    Leer más →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section style={{ padding: '2rem 0 4rem', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
            Todos los Artículos
          </h2>
          
          {loading ? (
            <div className="loading">
              <p>Cargando artículos...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {articles.slice(1).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <Link to={`/blog/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Por {article.author.name}
                        </span>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {formatDate(article.createdAt)}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#111827' }}>
                        {article.title}
                      </h3>
                      <p style={{ color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>
                        {article.excerpt || truncateText(article.content, 150)}
                      </p>
                      <span style={{ color: '#2563eb', fontWeight: '500' }}>
                        Leer más →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {articles.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#6b7280' }}>
                No hay artículos disponibles
              </h3>
              <p style={{ color: '#9ca3af' }}>
                Próximamente publicaremos contenido interesante en nuestro blog.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
