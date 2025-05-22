import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../Context/CartContext';

function Navbar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [username, setUsername] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setShowMenu(false);
    onLogout(); // 
    clearCart(); // Limpiar el carrito al cerrar sesión
    navigate('/');
  };  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/characters">
            <span className="logo-text">QUEA</span>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link 
            to="/catalogo" 
            className={location.pathname === '/catalogo' ? 'active' : ''}
          >
            Catalogo
          </Link>

          <Link 
            to="/favoritos" 
            className={location.pathname === '/favoritos' ? 'active' : ''}
          >
            Favoritos
          </Link>

          <Link 
            to="/historial" 
            className={location.pathname === '/historial' ? 'active' : ''}
          >
            Historial
          </Link>

         {/*  <Link 
            to="/form" 
            className={location.pathname === '/form' ? 'active' : ''}
          >
            Formulario
          </Link>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'active' : ''}
          >
            Sobre Nosotros
          </Link> */}
          {/* <button onClick={toggleCart} className="cart-button">
        🛒
        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </button> */}
      <Link to="/carrito" className="cart-button">
        <img src="/images/carrito-de-compras2.png" alt="Icon Carrito Compras" className='icon-carrito' />
        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </Link>

            {username && (
            <div onClick={toggleMenu} className="user-menu">
              <span className="username">
                {username} 
              </span>
                <img src="/images/cerrar-sesion-de-usuario.png" alt="Icon Cerrar Sesion" className='icon-logout' /> 
              {showMenu && (
                <div className="dropdown-menu">
                  <button style={{outline: "none"}} onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
