import React, { useState, useEffect } from 'react';
import { api } from '../api';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', categoria: 'Computadoras', precio: '', stock: '' });

  const cargar = () => api.get('/productos').then(res => setProductos(res.data)).catch(console.error);

  useEffect(() => { cargar(); }, []);

  const handleCrear = (e) => {
    e.preventDefault();
    api.post('/productos', nuevo).then(() => {
      setNuevo({ nombre: '', categoria: 'Computadoras', precio: '', stock: '' });
      cargar();
    }).catch(console.error);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Confirmas la baja de este producto del catálogo?')) {
      api.delete(`/productos/${id}`).then(cargar).catch(console.error);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Control de Catálogo y Existencias</h2>
          <p className="section-description">Gestión de unidades disponibles, segmentación por categoría y asignación de precios.</p>
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">Alta de Nuevo Dispositivo</h3>
        <form onSubmit={handleCrear} className="form-row">
          <div className="form-group">
            <label className="form-label">Modelo / Denominación</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej. MacBook Pro M3"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={nuevo.categoria}
              onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
            >
              <option value="Computadoras">Computadoras</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Audio">Audio</option>
              <option value="Monitores">Monitores</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Precio Unitario ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              placeholder="0.00"
              value={nuevo.precio}
              onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Stock Inicial</label>
            <input
              type="number"
              className="form-input"
              placeholder="Unidades"
              value={nuevo.stock}
              onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-action">Guardar Registro</button>
        </form>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Descripción</th>
              <th>Segmento</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Nivel de Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td style={{ color: '#64748b', fontWeight: 600 }}>#{p.id}</td>
                <td><strong>{p.nombre}</strong></td>
                <td><span className="category-badge">{p.categoria}</span></td>
                <td>${Number(p.precio).toFixed(2)}</td>
                <td>{p.stock} uds.</td>
                <td>
                  {p.stock <= 0 ? (
                    <span className="status-pill status-danger">
                      <span className="status-dot"></span> Desabastecido
                    </span>
                  ) : p.stock <= 5 ? (
                    <span className="status-pill status-warning">
                      <span className="status-dot"></span> Stock Crítico
                    </span>
                  ) : (
                    <span className="status-pill status-success">
                      <span className="status-dot"></span> Operativo
                    </span>
                  )}
                </td>
                <td>
                  <button className="btn-danger-outline" onClick={() => handleEliminar(p.id)}>
                    Dar de baja
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

export default Inventario;
