import { useCart } from "../Context/CartContext";
import { useNavigate } from 'react-router-dom';
import "./Carrito.css";

export function Carrito() {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  const handleCartStorage = () => {
    const resumenCompra = [...cartItems];
    localStorage.setItem('resumenCompra', JSON.stringify(resumenCompra));
    navigate('/formulario');
  }

  return (
    <div className="carrito">
      <h2>Carrito De Compra</h2>
      {cartItems.length === 0 ? (
        <div>
          <img src="/images/carrito-vacio.png" alt="Icon Carrito Vacio" className="icon-vacio" />
          <p>No Hay Productos Todavía</p>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th></th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion.slice(0,80)} ...</td>
                  <td>{item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                  <td>{item.cantidad}</td>
                  <td>{(item.precio * item.cantidad).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => removeFromCart(item.id)} className="eliminar-btn">Eliminar</button>
                      <div className="btn-cantidad">
                        <button onClick={() => decreaseQuantity(item.id)} className="btn-rest">-</button>
                        <button onClick={() => increaseQuantity(item.id)} className="btn-sum">+</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="costos-resumen-carrito">
            <table className="cart-table-costos-carrito" >
              <tbody>
                <tr>
                  <td> <strong>SubTotal</strong></td>
                  <td>{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                </tr>
                <tr>
                  <td> <strong>IVA</strong></td>
                  <td>{(total * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                </tr>
                <tr>
                  <td> <strong>Total</strong></td>
                  <td>{(total + total * 0.19).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button className="btn-comprar" onClick={handleCartStorage}>
            Comprar
          </button>
        </>
      )}
    </div>
  );
}
export default Carrito;