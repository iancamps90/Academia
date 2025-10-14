import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import type { Course } from '../types';
import api from '../utils/api';

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data.slice(0, 2)); // Solo mostrar 2 cursos en la home
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bienvenido a academy.iancamps.dev
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Descubre cursos de desarrollo web, automatizaciones y productos digitales. 
            Aprende con los mejores recursos y lleva tus habilidades al siguiente nivel.
          </motion.p>
          
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <Link to="/register" className="btn btn-primary">
                  Crear Cuenta
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Iniciar Sesión
                </Link>
              </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
              Cursos Destacados
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Explora nuestros cursos más populares y comienza tu viaje de aprendizaje
            </p>
          </div>

          {loading ? (
            <div className="loading">
              <p>Cargando cursos...</p>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#6b7280' }}>
                    Próximamente
                  </h3>
                  <p style={{ color: '#9ca3af' }}>
                    Estamos preparando cursos increíbles para ti. ¡Mantente atento!
                  </p>
                </div>
              )}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/courses" className="btn btn-primary">
              Ver Todos los Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
