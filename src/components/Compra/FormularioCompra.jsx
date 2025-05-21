import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './FormularioCompra.css';

function FormularioCompra() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    fechaCompra: new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes validar o guardar en localStorage si deseas
    localStorage.setItem('datosCliente', JSON.stringify(formData));
    clearCart();
    navigate('/resumen-compra');
  };

  return (
    <div className="formulario-container">
      <div className='formulario-card'>
        <h1>Datos del Comprador</h1>
        <form onSubmit={handleSubmit} className="datos-form">
          <div className="datos-form-group">
            <label>
              Nombre completo:
            </label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="datos-form-group">
            <label>
              Dirección:
            </label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </div>
          <div className="datos-form-group">
            <label>
              Ciudad:
            </label>
              <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
          </div>
          <div className="datos-form-group">
            <label>
              Teléfono:
            </label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </div>
          <button type="submit" className='btn-enviar'>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioCompra;
