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
import Courses from './pages/Courses';
import Templates from './pages/Templates';
import TemplateDetail from './pages/TemplateDetail';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import Admin from './pages/Admin';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

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
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/templates/:id" element={<TemplateDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<ArticleDetail />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/cancel" element={<Cancel />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={
                  <div style={{ 
                    minHeight: '100vh', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem 1rem'
                  }}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                      <div style={{ fontSize: '8rem', fontWeight: '700', marginBottom: '1rem', textShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        404
                      </div>
                      <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        Página no encontrada
                      </h2>
                      <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        La página que buscas no existe o ha sido movida.
                      </p>
                      <a
                        href="/"
                        style={{
                          backgroundColor: 'white',
                          color: '#2563eb',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.5rem',
                          textDecoration: 'none',
                          fontWeight: '500',
                          display: 'inline-block',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s'
                        }}
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