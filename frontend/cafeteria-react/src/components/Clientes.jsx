import React, { useState, useEffect } from 'react';
import { api } from '../api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', telefono: '', email: '' });

  const cargarClientes = () => {
    api.get('/clientes').then(res => setClientes(res.data)).catch(console.error);
  };

  useEffect(() => { cargarClientes(); }, []);

  const handleCrear = (e) => {
    e.preventDefault();
    api.post('/clientes', nuevo).then(() => {
      alert('Cliente registrado con éxito');
      setNuevo({ nombre: '', telefono: '', email: '' });
      cargarClientes();
    }).catch(console.error);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      api.delete(`/clientes/${id}`).then(() => cargarClientes()).catch(console.error);
    }
  };

  return (
    <div className="module-container">
      <div className="header-action">
        <div>
          <h2>Directorio de Clientes</h2>
          <p className="subtitle">Base de datos de compradores, contactos y teléfonos.</p>
        </div>
      </div>

      <div className="card-form">
        <h3>Registrar Nuevo Cliente</h3>
        <form onSubmit={handleCrear} className="form-grid">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Teléfono (ej. 555-0199)"
            value={nuevo.telefono}
            onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={nuevo.email}
            onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary">Registrar Cliente</button>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td>#{c.id}</td>
                <td><strong>{c.nombre}</strong></td>
                <td>{c.telefono || 'Sin registrar'}</td>
                <td>{c.email || 'Sin correo'}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(c.id)}>
                    Eliminar
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