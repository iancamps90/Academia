import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">academy.iancamps.dev</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Plataforma educativa para cursos, automatizaciones y productos digitales. 
              Aprende con los mejores recursos de desarrollo web y automatización.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://iancamps.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
              >
                iancamps.dev
              </a>
              <a
                href="mailto:hola@iancamps.dev"
                className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
              >
                Contacto
              </a>
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Cursos
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Registrarse
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Recursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Documentación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Soporte
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Comunidad
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Línea divisoria y copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-secondary-700 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2025 academy.iancamps.dev. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Términos de Servicio
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Política de Privacidad
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
