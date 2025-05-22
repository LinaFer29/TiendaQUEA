import '@google/model-viewer'
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Catalogo from './components/Catalog/Catalogo';
import Carrito from './components/Catalog/Carrito';
import ResumenCompra from './components/Compra/ResumenCompra';
import DetallesProducto from './components/Catalog/DetallesProducto';
import FormularioCompra from './components/Compra/FormularioCompra';
import Favoritos from './components/Favoritos/Favoritos';
import HistorialCompras from './components/Historial/HistorialCompras';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('username'); // true si existe username
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div >
      <BrowserRouter>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Layout onLogout={handleLogout} />}>
                <Route index element={<Navigate to="/catalogo" replace />} />
                <Route path="catalogo" element={<Catalogo />} />
                <Route path="/producto/:id" element={<DetallesProducto />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/formulario" element={<FormularioCompra />} />
                <Route path="/resumen-compra" element={<ResumenCompra />}/>
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/historial" element={<HistorialCompras />} />

                {/* <Route path="characters" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="form" element={<ContactForm />} />
          <Route path="about" element={<AboutInfo />} /> */}
              </Route>
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App
