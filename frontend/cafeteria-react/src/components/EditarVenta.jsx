import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    cliente_id: venta.cliente_id, producto_id: venta.producto_id, cantidad: venta.cantidad,
    fecha: venta.fecha ? venta.fecha.split('T')[0] : ''
  });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/ventas/${venta.id}`, formData).then(res => { alert(res.data.message); onUpdate(); });
  };

  return (
    <div style={{ border: '2px dashed orange', padding: '10px', marginTop: '10px' }}>
      <h3>Editar Venta</h3>
      <form onSubmit={handleSubmit}>
        <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <button type="submit" style={{ background: 'orange', color: 'black' }}>Guardar Cambios</button>
      </form>
    </div>
  );
}
export default EditarVenta;