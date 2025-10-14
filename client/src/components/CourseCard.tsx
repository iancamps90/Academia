import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card course-card"
    >
      <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={course.image}
          alt={course.title}
          className="course-image"
        />
        
        <div className="course-content">
          <h3 className="course-title">
            {course.title}
          </h3>
          <p className="course-description">
            {course.description}
          </p>
          <div className="course-price">
            €{course.price}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              {new Date(course.createdAt).toLocaleDateString('es-ES')}
            </span>
            <span style={{ color: '#2563eb', fontWeight: '500' }}>
              Ver detalles →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
