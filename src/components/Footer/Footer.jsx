// Importaciones para el componente de footer
import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="bg-dark">
    {/* Footer con información de copyright */}
    <footer>
      {/* Texto de derechos reservados */}
      <p>© 2024 - Pizzería Mamma Mia! - Todos los derechos reservados</p>
    </footer>
  </div>
  );
};

export default Footer;