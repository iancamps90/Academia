import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import type { Course } from '../types';
import api from '../utils/api';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
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
      {/* Header Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
              Todos los Cursos
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Explora nuestra colección completa de cursos de desarrollo web, automatizaciones y productos digitales
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
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
                    No hay cursos disponibles
                  </h3>
                  <p style={{ color: '#9ca3af' }}>
                    Estamos preparando nuevos cursos para ti. ¡Mantente atento!
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

export default Courses;
