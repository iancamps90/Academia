import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Purchase } from '../types';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            ¡Hola, {user?.name}! 👋
          </h1>
          <p className="text-xl text-secondary-600">
            Bienvenido a tu dashboard de academy.iancamps.dev
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mis Cursos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">
                  Mis Cursos
                </h2>
                <Link
                  to="/courses"
                  className="btn-primary"
                >
                  Explorar Cursos
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((purchase, index) => (
                    <motion.div
                      key={purchase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={purchase.course.image}
                          alt={purchase.course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-secondary-900">
                            {purchase.course.title}
                          </h3>
                          <p className="text-secondary-600 text-sm">
                            Comprado el {new Date(purchase.createdAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary-600">
                            €{purchase.course.price}
                          </span>
                          <div className="mt-2">
                            <button className="btn-primary text-sm">
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
                  className="text-center py-12"
                >
                  <div className="text-secondary-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                    Aún no tienes cursos
                  </h3>
                  <p className="text-secondary-500 mb-6">
                    Explora nuestros cursos y comienza tu viaje de aprendizaje
                  </p>
                  <Link
                    to="/courses"
                    className="btn-primary"
                  >
                    Explorar Cursos
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Estadísticas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Tu Progreso
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Cursos Comprados</span>
                  <span className="font-bold text-primary-600">{purchases.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Miembro desde</span>
                  <span className="font-bold text-secondary-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Rol</span>
                  <span className="font-bold text-secondary-900 capitalize">{user?.role}</span>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="block w-full btn-primary text-center"
                >
                  Explorar Cursos
                </Link>
                <Link
                  to="/profile"
                  className="block w-full btn-secondary text-center"
                >
                  Mi Perfil
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block w-full bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                  >
                    Panel Admin
                  </Link>
                )}
              </div>
            </div>

            {/* Próximamente */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">
                🚀 Próximamente
              </h3>
              <p className="text-primary-100 text-sm mb-4">
                Nuevos cursos y automatizaciones están en camino
              </p>
              <div className="text-xs text-primary-200">
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
