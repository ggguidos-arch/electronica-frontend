import React, { useState, useEffect } from 'react';
import { api } from '../api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', telefono: '', email: '' });

  const cargar = () => api.get('/clientes').then(res => setClientes(res.data)).catch(console.error);

  useEffect(() => { cargar(); }, []);

  const handleCrear = (e) => {
    e.preventDefault();
    api.post('/clientes', nuevo).then(() => {
      setNuevo({ nombre: '', telefono: '', email: '' });
      cargar();
    }).catch(console.error);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Confirmas la eliminación de este cliente?')) {
      api.delete(`/clientes/${id}`).then(cargar).catch(console.error);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Directorio de Cuentas y Clientes</h2>
          <p className="section-description">Padrón de compradores registrados para facturación y comunicación comercial.</p>
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">Alta Manual de Cliente</h3>
        <form onSubmit={handleCrear} className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre Completo o Razón Social</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej. Sofia Vergara"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Línea Telefónica</label>
            <input
              type="text"
              className="form-input"
              placeholder="+52 (55) 0000-0000"
              value={nuevo.telefono}
              onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-input"
              placeholder="contacto@empresa.com"
              value={nuevo.email}
              onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-action">Guardar Cliente</button>
        </form>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Razón Social / Nombre</th>
              <th>Contacto Telefónico</th>
              <th>Correo Electrónico</th>
              <th>Operación</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td><code>CLI-{c.id.toString().padStart(4, '0')}</code></td>
                <td><strong>{c.nombre}</strong></td>
                <td>{c.telefono || 'No proporcionado'}</td>
                <td>{c.email || 'No proporcionado'}</td>
                <td>
                  <button className="btn-danger-outline" onClick={() => handleEliminar(c.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
