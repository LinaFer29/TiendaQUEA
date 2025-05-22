import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favoritos.css';

function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const usuario = localStorage.getItem("username"); // Usuario activo

    useEffect(() => {
        if (!usuario) return;

        // Obtenemos todos los favoritos guardados por usuario
        const favoritosPorUsuario = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
        const favoritosDelUsuario = favoritosPorUsuario[usuario] || [];
        setFavoritos(favoritosDelUsuario);
    }, [usuario]);

    const quitarFavorito = (id) => {
        if (!usuario) return;

        const nuevosFavoritos = favoritos.filter(item => item.id !== id);
        setFavoritos(nuevosFavoritos);

        // Actualizamos el objeto de favoritos por usuario
        const favoritosPorUsuario = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
        favoritosPorUsuario[usuario] = nuevosFavoritos;
        localStorage.setItem("favoritos_por_usuario", JSON.stringify(favoritosPorUsuario));
    };

    if (!usuario) {
        return <h2>Debes iniciar sesión para ver tus favoritos 🧑‍💻</h2>;
    }

    if (favoritos.length === 0) {
    return (
        <div className="favoritos-vacio">
            <img src="/images/Imagen2.png" alt="Sin favoritos" className="imagen-vacia" />
            <h2>No tienes productos en favoritos </h2>
        </div>
    );
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
