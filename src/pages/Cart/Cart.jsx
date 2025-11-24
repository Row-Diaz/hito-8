// Importaciones necesarias para el componente del carrito
import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { CartContext } from "../../context/cartContext.jsx";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utilities/setActive";
import { useUser } from "../../context/userContext";


export const Cart = () => {
  // Obtención de funciones y estado del contexto del carrito
  const {cart, total, decreaseQuantity, increaseQuantity, clearCart} = useContext(CartContext);
  
  // Obtención del token del usuario para autenticación
  const { token } = useUser();

  // Variable de entorno para la URL de la API
  const API_URL = import.meta.env.VITE_API_URL;

  // Función asíncrona para procesar el pago del carrito
  const handlePayment = async () => {
    try {
      // Llamada a la API para procesar el checkout
      const response = await fetch(`${API_URL}/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Token JWT para autenticación
        },
        body: JSON.stringify({ cartItems: cart, total })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error al procesar el pago')
      }
      
      // Si el pago es exitoso, limpia el carrito y muestra confirmación
      clearCart()
      alert('Pago Exitoso! Gracias por tu compra!')

    } catch (error) {
      console.error('Error en el checkout:', error.message)
      alert('Error en el checkout: ' + error.message)
    }
  }

  return (
    <Card className="m-4 border border-dark pt-3 text-center d-flex align-items-center">
      <h4>Carrito de Compras</h4>
      
      {/* Renderizado condicional: carrito vacío vs carrito con items */}
      {cart.length === 0 ? (
        <h5 className="text-primary">Tu carrito está vacío</h5>
      ) : (
      <div className="Card-Container"> 
        {/* Mapeo de todos los items del carrito */}
        {cart.map((p) => (
          <div className="PizzaCart" key={p.pizzaId}>  
              {/* Información de cada pizza en el carrito */}
              <Card.Img src={p.pizzaImg} alt={p.pizzaName} />                                
              <h6><strong>{p.pizzaName}</strong></h6>
              <h6>${p.pizzaPrice}</h6>
              
              {/* Controles para modificar cantidad */}
              <div className="Cart-Botones">
                <Button onClick={() => decreaseQuantity(p.pizzaId)} className="btn btn-dark m-2">-</Button>
                <h6>{p.quantity}</h6>
                <Button onClick={() => increaseQuantity(p.pizzaId)} className="btn btn-dark m-2">+</Button>
                {/* Subtotal por item */}
                <strong className="m-2 p-2">Total:$ {formatNumber(p.pizzaPrice * p.quantity)}</strong>
              </div>
          </div>
        ))}  
        
        {/* Total general del carrito */}
          <div className="pt-3 text-center">
            <h5>Total Carrito: {formatNumber(total)}</h5>   
          </div>              
          
        {/* Botones de acción: pagar y seguir comprando */}
          <div>
            {/* Botón de pago deshabilitado si no hay token o carrito vacío */}
            <Button className="btn btn-primary m-2 p-2 text-center"  
                    disabled={!token || cart.length === 0} 
                    onClick={handlePayment}>Pagar</Button>
            <Link to="/" className="btn btn-dark m-2 text-center">Seguir comprando</Link>
          </div>                      
      </div>     
      )}
    </Card>      
    );
  };

