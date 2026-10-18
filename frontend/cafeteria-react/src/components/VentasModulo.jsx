import React, { useState, useEffect } from 'react';
import { api } from '../api';

function VentasModulo() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ cliente_nombre: '', producto_id: '', cantidad: 1, fecha: '' });

  const cargar = () => {
    api.get('/ventas').then(res => setVentas(res.data)).catch(console.error);
    api.get('/productos').then(res => setProductos(res.data)).catch(console.error);
  };

  useEffect(() => {
    cargar();
    setFormData(prev => ({ ...prev, fecha: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData)
      .then(() => {
        setFormData({ cliente_nombre: '', producto_id: '', cantidad: 1, fecha: new Date().toISOString().split('T')[0] });
        cargar();
      })
      .catch(err => {
        alert(err.response?.data?.error || 'No fue posible registrar la venta.');
      });
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Anular esta transacción? El inventario se repondrá automáticamente.')) {
      api.delete(`/ventas/${id}`).then(cargar).catch(console.error);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Terminal de Transacciones Comerciales</h2>
          <p className="section-description">Emisión de salidas de producto con decremento inmediato en la base de datos de stock.</p>
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">Registrar Nueva Salida</h3>
        <form onSubmit={handleSubmit} className="form-row">
          <div className="form-group">
            <label className="form-label">Cliente (Búsqueda o Alta)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Nombre del cliente"
              value={formData.cliente_nombre}
              onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dispositivo</label>
            <select
              className="form-select"
              value={formData.producto_id}
              onChange={(e) => setFormData({ ...formData, producto_id: e.target.value })}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                  {p.nombre} — ${p.precio} [{p.stock <= 0 ? 'Sin existencias' : `${p.stock} disponibles`}]
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              min="1"
              className="form-input"
              value={formData.cantidad}
              onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fecha Contable</label>
            <input
              type="date"
              className="form-input"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-action">Procesar Venta</button>
        </form>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Titular</th>
              <th>Artículo</th>
              <th>Unidades</th>
              <th>Precio Unit.</th>
              <th>Total Liquidado</th>
              <th>Fecha</th>
              <th>Operación</th>
            </tr>
          </thead>
          <tbody>
           {ventas.map((v, index) => (
  <tr key={v.id}>
    <td style={{ color: '#64748b', fontWeight: 600 }}>#{index + 1}</td>
                <td><strong>{v.cliente}</strong></td>
                <td>{v.producto}</td>
                <td>{v.cantidad}</td>
                <td>${Number(v.precio).toFixed(2)}</td>
                <td><strong style={{ color: '#34d399' }}>${Number(v.total).toFixed(2)}</strong></td>
                <td>{v.fecha ? v.fecha.split('T')[0] : ''}</td>
                <td>
                  <button className="btn-danger-outline" onClick={() => handleEliminar(v.id)}>
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
