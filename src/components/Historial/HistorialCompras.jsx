import { useEffect, useState } from "react";
import "./HistorialCompras.css";

function HistorialCompras() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem("username");
    const comprasPorUsuario = JSON.parse(localStorage.getItem("compras_por_usuario")) || {};
    
    if (usuario && comprasPorUsuario[usuario]) {
      setCompras(comprasPorUsuario[usuario]);
    }
  }, []);

  return (
    <div className="historial-container">
      <h2>Historial de Compras</h2>
      {compras.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        compras.map((compra, index) => (
          <div key={index} className="compra-card">
            <h4>Fecha: {new Date(compra.fecha).toLocaleString()}</h4>
            <table className="historial-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {compra.productos.map((producto, idx) => (
                  <tr key={idx}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                    <td>{(producto.precio * producto.cantidad).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialCompras;
