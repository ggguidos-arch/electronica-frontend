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
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Panel de Control Financiero</h2>
          <p className="section-description">Resumen consolidado de ingresos, transacciones y existencias de almacén.</p>
        </div>
        <button className="btn-action" onClick={() => setPestanaActiva('ventas')}>
          Nueva Transacción
        </button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Ingresos Brutos</span>
            <div className="kpi-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
          <div className="kpi-value">${Number(metricas.totalIngresos).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <span className="kpi-subtext">Total facturado a la fecha</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Volumen de Ventas</span>
            <div className="kpi-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
          </div>
          <div className="kpi-value">{metricas.totalVentas}</div>
          <span className="kpi-subtext">Órdenes procesadas con éxito</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Cartera de Clientes</span>
            <div className="kpi-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>
            </div>
          </div>
          <div className="kpi-value">{metricas.totalClientes}</div>
          <span className="kpi-subtext">Entidades y contactos únicos</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Stock en Riesgo</span>
            <div className="kpi-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={metricas.productosBajoStock > 0 ? '#ef4444' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
          </div>
          <div className="kpi-value" style={{ color: metricas.productosBajoStock > 0 ? '#f87171' : 'inherit' }}>
            {metricas.productosBajoStock}
          </div>
          <span className="kpi-subtext">Artículos con 5 unidades o menos</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
