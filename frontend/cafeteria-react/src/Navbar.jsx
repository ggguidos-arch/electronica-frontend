import React from 'react';

function Navbar({ pestanaActiva, setPestanaActiva }) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'ventas', label: '🛒 Ventas / Caja' },
    { id: 'inventario', label: '📦 Inventario' },
    { id: 'clientes', label: '👥 Clientes' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-icon">⚡</span>
        <h2>TechStore <span>Pro</span></h2>
      </div>
      <div className="navbar-menu">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${pestanaActiva === tab.id ? 'active' : ''}`}
            onClick={() => setPestanaActiva(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
