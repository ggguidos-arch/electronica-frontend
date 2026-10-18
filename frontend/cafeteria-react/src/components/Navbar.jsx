import React from 'react';

function Navbar({ pestanaActiva, setPestanaActiva }) {
  return (
    <nav className="navbar">
      <div className="brand-wrapper">
        <div className="brand-logo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <h1 className="brand-name">TechStore <span>Console</span></h1>
      </div>

      <div className="nav-links">
        <button 
          className={`nav-btn ${pestanaActiva === 'dashboard' ? 'active' : ''}`}
          onClick={() => setPestanaActiva('dashboard')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
          Métricas
        </button>

        <button 
          className={`nav-btn ${pestanaActiva === 'ventas' ? 'active' : ''}`}
          onClick={() => setPestanaActiva('ventas')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Terminal de Ventas
        </button>

        <button 
          className={`nav-btn ${pestanaActiva === 'inventario' ? 'active' : ''}`}
          onClick={() => setPestanaActiva('inventario')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          Inventario
        </button>

        <button 
          className={`nav-btn ${pestanaActiva === 'clientes' ? 'active' : ''}`}
          onClick={() => setPestanaActiva('clientes')}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Clientes
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
