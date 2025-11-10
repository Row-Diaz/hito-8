// Importaciones para el componente de header
import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <>
      {/* Header principal con mensaje de bienvenida */}
      <header>
      {/* Título principal de la pizzería */}
      <h1>Bienvenidos a Pizzería Mamma Mía</h1>
      
      {/* Subtítulo con mensaje promocional */}
      <p>¡Disfruta de nuestras deliciosas pizzas artesanales!</p>
      </header>
    </>
  );
};

export default Header;