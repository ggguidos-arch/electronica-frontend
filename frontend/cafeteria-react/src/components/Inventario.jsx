import React, { useState, useEffect } from 'react';
import { api } from '../api';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', categoria: 'Computadoras', precio: '', stock: '' });

  const cargarProductos = () => {
    api.get('/productos').then(res => setProductos(res.data)).catch(console.error);
  };

  useEffect(() => { cargarProductos(); }, []);

  const handleCrear = (e) => {
    e.preventDefault();
    api.post('/productos', nuevo).then(() => {
      alert('Producto agregado con éxito');
      setNuevo({ nombre: '', categoria: 'Computadoras', precio: '', stock: '' });
      cargarProductos();
    }).catch(console.error);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Deseas eliminar este producto del catálogo?')) {
      api.delete(`/productos/${id}`).then(() => cargarProductos()).catch(console.error);
    }
  };

  return (
    <div className="module-container">
      <div className="header-action">
        <div>
          <h2>Inventario de Dispositivos</h2>
          <p className="subtitle">Gestiona catálogo, categorías, precios y niveles de stock.</p>
        </div>
      </div>

      <div className="card-form">
        <h3>Agregar Nuevo Producto</h3>
        <form onSubmit={handleCrear} className="form-grid">
          <input
            type="text"
            placeholder="Nombre del aparato (ej. iPad Air 5)"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            required
          />
          <select
            value={nuevo.categoria}
            onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
          >
            <option value="Computadoras">Computadoras</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Audio">Audio</option>
            <option value="Monitores">Monitores</option>
            <option value="Accesorios">Accesorios</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Precio ($)"
            value={nuevo.precio}
            onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock inicial"
            value={nuevo.stock}
            onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </form>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aparato</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>#{p.id}</td>
                <td><strong>{p.nombre}</strong></td>
                <td><span className="badge badge-category">{p.categoria}</span></td>
                <td>${Number(p.precio).toFixed(2)}</td>
                <td><strong>{p.stock}</strong> unids.</td>
                <td>
                  {p.stock <= 0 ? (
                    <span className="badge badge-danger">Agotado</span>
                  ) : p.stock <= 5 ? (
                    <span className="badge badge-warning">Poco Stock</span>
                  ) : (
                    <span className="badge badge-success">Disponible</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(p.id)}>
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

export default Inventario;