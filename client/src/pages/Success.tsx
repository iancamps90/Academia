import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // In a full implementation, we could verify the session on the server here
    // and/or refresh user purchases. For now we just show confirmation.
  }, [sessionId]);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: 640, width: '100%' }}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>
            ¡Pago completado con éxito!
          </h1>
          <p style={{ color: '#4b5563', marginBottom: '1.25rem' }}>
            Gracias por tu compra. Tu acceso al curso estará disponible en tu panel.
          </p>
          {sessionId && (
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              ID de sesión: {sessionId}
            </p>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Ir al Panel
            </button>
            <button className="btn" onClick={() => navigate('/courses')}>
              Ver más cursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;


