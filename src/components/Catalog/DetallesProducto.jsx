import { useParams } from 'react-router-dom';
import { productos } from '../../data';
import { useCart } from '../Context/CartContext';
import { useEffect, useState } from 'react';
import './DetallesProducto.css';

function DetallesProducto() {
    const { addToCart } = useCart();
    const { id } = useParams();
    const producto = productos.find((item) => item.id === parseInt(id));

    const [favoritos, setFavoritos] = useState([]);
    const [esFavorito, setEsFavorito] = useState(false);

    // Cargar favoritos desde localStorage
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favs);
        setEsFavorito(favs.some(item => item.id === producto?.id));
    }, [producto]);

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
            nuevosFavoritos = favoritos.filter(item => item.id !== producto.id);
        } else {
            nuevosFavoritos = [...favoritos, producto];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
        setEsFavorito(!esFavorito);
    };

    if (!producto) return <div>Producto no encontrado</div>;

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
                <p className="precio">
                    {producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                </p>
                <button className='btn' onClick={() => addToCart(producto)}>Agregar al carrito</button>
                <button className='btn' onClick={toggleFavorito}>
                    {esFavorito ? "💖 Quitar de favoritos" : "🤍 Agregar a favoritos"}
                </button>
            </div>
        </div>
    );
}

export default DetallesProducto;
