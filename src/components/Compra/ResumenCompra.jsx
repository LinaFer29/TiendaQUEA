import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ResumenCompra.css";

function ResumenCompra() {

  const [productos, setProductos] = useState([]);
  const [datosCliente, setDatosCliente] = useState({});
  const navigate = useNavigate();

  // const resumen = location.state?.resumen || [];

  useEffect(() => {
    const resumen = JSON.parse(localStorage.getItem('resumenCompra')) || [];
    const cliente = JSON.parse(localStorage.getItem('datosCliente')) || {};
    setProductos(resumen);
    setDatosCliente(cliente);
  }, []);

  const total = productos.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  return (
    <div className="resumen-contenedor">
      <div className="resumen-compra">
        <h1>¡Gracias por tu compra! 🎉</h1>
        <div className="datos-cliente">
          <p><strong>Nombre: </strong>{datosCliente.nombre}</p>
          <p><strong>Dirección: </strong>{datosCliente.direccion}</p>
          <p><strong>Ciudad: </strong>{datosCliente.ciudad}</p>
          <p><strong>Telefono: </strong> {datosCliente.telefono}</p>
          <p><strong>Fecha de compra:</strong> {datosCliente.fechaCompra}</p>
        </div>

        <p>Este es el resumen de tu pedido:</p>
        <table className="cart-table-resumen">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.descripcion.slice(0,80)} ...</td>
                <td>{item.cantidad}</td>
                <td>{(item.precio * item.cantidad).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="costos-resumen">
        <table className="cart-table-costos" >
          <tbody>
            <tr>
              <td> <strong>SubTotal</strong></td>
              <td>{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tr>
            <tr>
              <td> <strong>IVA</strong></td>
              <td>{(total * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="resumen-compra">
        <p className="total-label"><strong>Total Pagado</strong> {(total + total * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
        <p>Te llegará un correo con la confirmación. 📨</p>
        <button className="btn-regresar" onClick={() => navigate('/catalogo')}>
          Regresar a Catalogo
        </button>
      </div>
    </div>
  );
}

export default ResumenCompra;