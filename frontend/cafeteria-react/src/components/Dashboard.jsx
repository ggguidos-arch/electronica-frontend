import React, { useEffect, useState } from 'react';
import { api } from '../api';

function Dashboard({ setPestanaActiva }) {
  const [metricas, setMetricas] = useState({
    totalIngresos: 0,
    totalVentas: 0,
    totalClientes: 0,
    productosBajoStock: 0
  });

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setMetricas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="module-container">
      <div className="header-action">
        <div>
          <h2>Panel de Control General</h2>
          <p className="subtitle">Resumen ejecutivo y métricas de rendimiento en tiempo real.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setPestanaActiva('ventas')}>
          + Registrar Nueva Venta
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">💵</div>
          <div className="stat-content">
            <span className="stat-label">Ingresos Totales</span>
            <span className="stat-value">${Number(metricas.totalIngresos).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">🛒</div>
          <div className="stat-content">
            <span className="stat-label">Ventas Realizadas</span>
            <span className="stat-value">{metricas.totalVentas}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">👥</div>
          <div className="stat-content">
            <span className="stat-label">Clientes Registrados</span>
            <span className="stat-value">{metricas.totalClientes}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className={`stat-icon ${metricas.productosBajoStock > 0 ? 'red' : 'gray'}`}>⚠️</div>
          <div className="stat-content">
            <span className="stat-label">Bajo Stock (&le; 5 unids)</span>
            <span className="stat-value">{metricas.productosBajoStock}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;