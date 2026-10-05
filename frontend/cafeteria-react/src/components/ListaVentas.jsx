import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';
import FormularioVenta from './FormularioVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => api.get('/ventas').then(res => { setVentas(res.data); setVentaSeleccionada(null); });
  useEffect(() => { cargarVentas(); }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Eliminar esta venta?')) {
      api.delete(`/ventas/${id}`).then(res => { alert(res.data.message); cargarVentas(); });
    }
  };

  return (
    <div>
      <FormularioVenta onVentaRegistrada={cargarVentas} />
      <hr />
      <h2>Historial de Ventas</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr style={{backgroundColor: '#333', color: 'white'}}>
            <th>Cliente</th><th>Aparato</th><th>Cant.</th><th>Precio</th><th>Total</th><th>Fecha</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.cliente}</td><td>{v.producto}</td><td>{v.cantidad}</td><td>${v.precio}</td><td>${v.total}</td>
              <td>{v.fecha ? v.fecha.split('T')[0] : ''}</td>
              <td>
                <button onClick={() => setVentaSeleccionada(v)}>Editar</button>
                <button onClick={() => eliminarVenta(v.id)} style={{marginLeft:'5px', color:'red'}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ventaSeleccionada && <EditarVenta venta={ventaSeleccionada} onUpdate={cargarVentas} />}
    </div>
  );
}
export default ListaVentas;