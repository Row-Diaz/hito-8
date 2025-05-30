import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { CartContext } from "../../context/cartContext.jsx";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utilities/setActive";
import { useUser } from "../../context/userContext";


export const Cart = () => {
  const {cart, total, decreaseQuantity, increaseQuantity, clearCart} = useContext(CartContext);
  const { token } = useUser();

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cartItems: cart, total })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error al procesar el pago')
      }
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
      {cart.length === 0 ? (
        <h5 className="text-primary">Tu carrito está vacío</h5>
      ) : (
      <div className="Card-Container"> 
        {cart.map((p) => (
          <div className="PizzaCart" key={p.pizzaId}>  
              <Card.Img src={p.pizzaImg} alt={p.pizzaName} />                                
              <h6><strong>{p.pizzaName}</strong></h6>
              <h6>${p.pizzaPrice}</h6>
              <div className="Cart-Botones">
                <Button onClick={() => decreaseQuantity(p.pizzaId)} className="btn btn-dark m-2">-</Button>
                <h6>{p.quantity}</h6>
                <Button onClick={() => increaseQuantity(p.pizzaId)} className="btn btn-dark m-2">+</Button>
                <strong className="m-2 p-2">Total:$ {formatNumber(p.pizzaPrice * p.quantity)}</strong>
              </div>
          </div>
        ))}  
          <div className="pt-3 text-center">
            <h5>Total Carrito: {formatNumber(total)}</h5>   
          </div>              
          <div>
            <Button className="btn btn-primary m-2 p-2 text-center"  disabled={!token || cart.length === 0} onClick={handlePayment}>Pagar</Button>
            <Link to="/" className="btn btn-dark m-2 text-center">Seguir comprando</Link>
          </div>                      
      </div>     
      )}
    </Card>      
    );
  };

