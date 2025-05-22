import { useParams } from 'react-router-dom';
import { productos } from '../../data';
import { useCart } from '../Context/CartContext';
import { useEffect, useState } from 'react';
import './DetallesProducto.css';

function DetallesProducto() {
    const { addToCart } = useCart();
    const { id } = useParams();
    const producto = productos.find((item) => item.id === parseInt(id));

    const usuario = localStorage.getItem("username");
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        if (!usuario || !producto) return;

        const favsPorUsuario = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
        const favs = favsPorUsuario[usuario] || [];
        setEsFavorito(favs.some(item => item.id === producto.id));
    }, [producto, usuario]);

    const toggleFavorito = () => {
        if (!usuario) {
            alert("Debes iniciar sesión para usar favoritos.");
            return;
        }

        const favsPorUsuario = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
        const favs = favsPorUsuario[usuario] || [];

        let nuevosFavoritos;
        if (esFavorito) {
            nuevosFavoritos = favs.filter(item => item.id !== producto.id);
        } else {
            nuevosFavoritos = [...favs, producto];
        }

        favsPorUsuario[usuario] = nuevosFavoritos;
        localStorage.setItem("favoritos_por_usuario", JSON.stringify(favsPorUsuario));
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
