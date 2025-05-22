import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favoritos.css';

function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavoritos(favs);
    }, []);

    const quitarFavorito = (id) => {
        const nuevosFavoritos = favoritos.filter(item => item.id !== id);
        setFavoritos(nuevosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    };

    if (favoritos.length === 0) {
        return <h2>No tienes productos en favoritos 😢</h2>;
    }

    return (
        <div className="favoritos-container">
            <h2>Mis Favoritos 💖</h2>
            <div className="favoritos-list">
                {favoritos.map(producto => (
                    <div key={producto.id} className="favorito-item">
                        <model-viewer
                            src={producto.modelo}
                            alt={producto.nombre}
                            auto-rotate
                            camera-controls
                            ar
                            style={{ width: '200px', height: '200px', marginRight: '20px' }}
                        />
                        <div className="favorito-info">
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>
                            <p>{producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                            <div className="favorito-acciones">
                                <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
                                <button onClick={() => quitarFavorito(producto.id)}>Quitar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favoritos;
