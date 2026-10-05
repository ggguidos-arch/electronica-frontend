import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta({ onVentaRegistrada }) {
  const [formData, setFormData] = useState({ cliente_id: '', producto_id: '', cantidad: '', fecha: '' });
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData).then(res => {
      alert(res.data.message);
      setFormData({ cliente_id: '', producto_id: '', cantidad: '', fecha: '' });
      onVentaRegistrada(); 
    });
  };

  return (
    <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} required>
          <option value="">Seleccionar Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
          <option value="">Seleccionar Aparato</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>)}
        </select>
        <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <button type="submit" style={{ background: 'blue', color: 'white', padding: '5px 10px' }}>Registrar</button>
      </form>
    </div>
  );
}
export default FormularioVenta;