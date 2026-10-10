import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta({ onVentaRegistrada }) {
  const [formData, setFormData] = useState({ cliente_nombre: '', producto_id: '', cantidad: '', fecha: '' });
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData).then(res => {
      alert(res.data.message);
      setFormData({ cliente_nombre: '', producto_id: '', cantidad: '', fecha: '' });
      onVentaRegistrada(); 
    }).catch(err => console.error(err));
  };

  return (
    <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cliente_nombre" placeholder="Nombre del Cliente" value={formData.cliente_nombre} onChange={handleChange} required />
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
