import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                          Panel de Administración
                        </h1>
                        <p className="text-secondary-600 mb-6">
                          Próximamente: CRUD de cursos y gestión de usuarios
                        </p>
                        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                          <div className="text-primary-600 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                            En Desarrollo
                          </h3>
                          <p className="text-secondary-600 text-sm">
                            Estamos trabajando en las funcionalidades de administración. 
                            Pronto podrás gestionar cursos y usuarios desde aquí.
                          </p>
                        </div>
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                      <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                        Página no encontrada
                      </h2>
                      <p className="text-secondary-600 mb-8">
                        La página que buscas no existe o ha sido movida.
                      </p>
                      <a
                        href="/"
                        className="btn-primary"
                      >
                        Volver al Inicio
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;