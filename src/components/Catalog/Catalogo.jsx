import { Link } from 'react-router-dom';
import { productos } from '../../data'
import { useCart } from '../Context/CartContext';
import './Catalogo.css'

function Catalogo(){

    const { addToCart } = useCart();
   
    return (
        <div className="App">
          <div className="galeria">
            {productos.map((item) => (
              <div key={item.id} className="card">
                <Link to={`/producto/${item.id}`} className="card-link">
                <model-viewer
                  src={item.modelo}
                  alt={item.nombre}
                  auto-rotate
                  camera-controls
                  ar
                  style={{ width: '250px', height: '250px' }}
                />
                <h2>{item.nombre}</h2>
                <p>{item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
              </Link>
                <button className='btn' onClick={() => addToCart(item)}>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      );
}
export default Catalogo;