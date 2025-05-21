import { useParams } from 'react-router-dom';
import { productos } from '../../data';
import { useCart } from '../Context/CartContext';
import './DetallesProducto.css';


function DetallesProducto() {

    const { addToCart } = useCart();
    const { id } = useParams();

    const producto = productos.find((item) => item.id === parseInt(id));

    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="container-detalles">
                <model-viewer
                    src={producto.modelo}
                    alt={producto.nombre}
                    auto-rotate
                    camera-controls
                    ar
                    style={{ width: '500px', height: '500px' }}
                />
            <div key={producto.id} className="product-info">
                <h1>{producto.nombre}</h1>
                <p>{producto.descripcion}</p>
                <p className="precio"> {producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <button className='btn' onClick={() => addToCart(producto)}>Agregar</button>
            </div>
        </div>
    );
}

export default DetallesProducto;