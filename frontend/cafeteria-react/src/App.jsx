import React from 'react';
import ListaVentas from './components/ListaVentas';
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>TechStore: Venta de Electrónica</h1>
      <ListaVentas />
    </div>
  );
}
export default App;