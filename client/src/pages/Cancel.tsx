import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: 640, width: '100%' }}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛑</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>
            Pago cancelado
          </h1>
          <p style={{ color: '#4b5563', marginBottom: '1.25rem' }}>
            No se ha realizado ningún cargo. Puedes intentar nuevamente cuando quieras.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/courses')}>
              Volver a Cursos
            </button>
            <button className="btn" onClick={() => navigate('/')}>Ir al inicio</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;


