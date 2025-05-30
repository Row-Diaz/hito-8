import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

	useEffect(() => {calculateTotal();}, [cart]);

  	const addToCart = (pizza) => {
		const findPizza = cart.findIndex(item => item.pizzaId === pizza.pizzaId);	
		if (findPizza >= 0) { 
			const newCart = [...cart]; 
			newCart[findPizza].quantity += 1; 
			setCart(newCart); 
		} else { 
			const addPizza = [...cart, pizza]; 
			setCart(addPizza); 
		}   
	};

  const increaseQuantity = (id) => {
    const data = [...cart]; 
    const index = data.findIndex((item) => item.pizzaId == id); 
    const newQuantity = Number(data[index].quantity) + 1; 
    data[index].quantity = newQuantity; 
    setCart(data);
    return;
  };

  const decreaseQuantity = (id) => {
    const data = [...cart]; 
    const index = data.findIndex((item) => item.pizzaId == id);
    const newQuantity = Number(data[index].quantity) - 1;
    if (newQuantity === 0) {
      data.splice(index, 1);
    } else {
      data[index].quantity = newQuantity;
    }
    setCart(data); 
  };

  const clearCart = () => {
    setCart([])
  };


  const calculateTotal = () => {
    const newTotal = cart.reduce(
      (total, item) => total + item.pizzaPrice * item.quantity,0);
    setTotal(newTotal);
  };



  return (
    <CartContext.Provider
      value={{cart,addToCart,increaseQuantity,decreaseQuantity,total, clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;