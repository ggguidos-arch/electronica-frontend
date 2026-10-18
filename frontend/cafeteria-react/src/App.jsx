import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import VentasModulo from './components/VentasModulo';
import Inventario from './components/Inventario';
import Clientes from './components/Clientes';
import './App.css';

function App() {
  const [pestanaActiva, setPestanaActiva] = useState('dashboard');

  return (
    <div className="app-layout">
      <Navbar pestanaActiva={pestanaActiva} setPestanaActiva={setPestanaActiva} />
      <main className="main-wrapper">
        {pestanaActiva === 'dashboard' && <Dashboard setPestanaActiva={setPestanaActiva} />}
        {pestanaActiva === 'ventas' && <VentasModulo />}
        {pestanaActiva === 'inventario' && <Inventario />}
        {pestanaActiva === 'clientes' && <Clientes />}
      </main>
      <footer className="app-footer">
        TechStore Console &copy; {new Date().getFullYear()} &mdash; Enterprise Management Platform
      </footer>
    </div>
  );
}

export default App;
