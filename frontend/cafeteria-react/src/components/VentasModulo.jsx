import React, { useState, useEffect } from 'react';
import { api } from '../api';

function VentasModulo() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ cliente_nombre: '', producto_id: '', cantidad: 1, fecha: '' });

  const cargarDatos = () => {
    api.get('/ventas').then(res => setVentas(res.data)).catch(console.error);
    api.get('/productos').then(res => setProductos(res.data)).catch(console.error);
  };

  useEffect(() => {
    cargarDatos();
    const hoy = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, fecha: hoy }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData)
      .then(res => {
        alert(res.data.message);
        setFormData({ cliente_nombre: '', producto_id: '', cantidad: 1, fecha: new Date().toISOString().split('T')[0] });
        cargarDatos();
      })
      .catch(err => {
        const errorMsg = err.response?.data?.error || 'Hubo un error al registrar la venta';
        alert(errorMsg);
      });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Deseas cancelar esta venta? El stock se devolverá al inventario.')) {
      api.delete(`/ventas/${id}`).then(() => cargarDatos()).catch(console.error);
    }
  };

  return (
    <div className="module-container">
      <div className="header-action">
        <div>
          <h2>Punto de Venta y Transacciones</h2>
          <p className="subtitle">Registra salidas de productos con ajuste automático de existencias.</p>
        </div>
      </div>

      <div className="card-form">
        <h3>Registrar Transacción</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            placeholder="Nombre del Cliente (crea o asocia)"
            value={formData.cliente_nombre}
            onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
            required
          />
          <select
            value={formData.producto_id}
            onChange={(e) => setFormData({ ...formData, producto_id: e.target.value })}
            required
          >
            <option value="">Seleccionar Aparato Electrónico</option>
            {productos.map(p => (
              <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                {p.nombre} — ${p.precio} (Stock: {p.stock}) {p.stock <= 0 ? '❌ AGOTADO' : ''}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            placeholder="Cantidad"
            value={formData.cantidad}
            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
            required
          />
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-success">Completar Venta</button>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Aparato</th>
              <th>Cant.</th>
              <th>Precio Unit.</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>#{v.id}</td>
                <td><strong>{v.cliente}</strong></td>
                <td>{v.producto}</td>
                <td>{v.cantidad}</td>
                <td>${Number(v.precio).toFixed(2)}</td>
                <td><strong style={{ color: '#10b981' }}>${Number(v.total).toFixed(2)}</strong></td>
                <td>{v.fecha ? v.fecha.split('T')[0] : ''}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(v.id)}>
                    Anular
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

export default VentasModulo;