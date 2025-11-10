// Importación de hooks necesarios de React
import { createContext, useEffect, useState } from "react";

// Creación del contexto del carrito de compras
// Este contexto permitirá compartir el estado del carrito entre componentes
export const CartContext = createContext();

// Componente proveedor que envuelve la aplicación y proporciona el estado del carrito
const CartProvider = ({ children }) => {
  // Estado para almacenar los items del carrito de compras
  const [cart, setCart] = useState([]);
  
  // Estado para mantener el total del carrito
  const [total, setTotal] = useState(0);

  // Hook que se ejecuta cada vez que el carrito cambia
  // Recalcula automáticamente el total cuando se agregan/quitan items
	useEffect(() => {calculateTotal();}, [cart]);

  // Función para agregar una pizza al carrito
  	const addToCart = (pizza) => {
    // Busca si la pizza ya existe en el carrito comparando por ID
		const findPizza = cart.findIndex(item => item.pizzaId === pizza.pizzaId);	
		if (findPizza >= 0) { 
      // Si la pizza ya existe, aumenta su cantidad en 1
			const newCart = [...cart]; 
			newCart[findPizza].quantity += 1; 
			setCart(newCart); 
		} else { 
      // Si la pizza no existe, la agrega como nuevo item al carrito
			const addPizza = [...cart, pizza]; 
			setCart(addPizza); 
		}   
	};

  // Función para incrementar la cantidad de una pizza específica en el carrito
  const increaseQuantity = (id) => {
    const data = [...cart]; // Crea una copia del carrito
    const index = data.findIndex((item) => item.pizzaId == id); // Encuentra el índice del item
    const newQuantity = Number(data[index].quantity) + 1; // Aumenta la cantidad en 1
    data[index].quantity = newQuantity; // Actualiza la cantidad en el array
    setCart(data); // Actualiza el estado del carrito
    return;
  };

  // Función para decrementar la cantidad de una pizza específica en el carrito
  const decreaseQuantity = (id) => {
    const data = [...cart]; // Crea una copia del carrito
    const index = data.findIndex((item) => item.pizzaId == id); // Encuentra el índice del item
    const newQuantity = Number(data[index].quantity) - 1; // Disminuye la cantidad en 1
    if (newQuantity === 0) {
      // Si la cantidad llega a 0, elimina completamente el item del carrito
      data.splice(index, 1);
    } else {
      // Si aún hay cantidad, actualiza el valor
      data[index].quantity = newQuantity;
    }
    setCart(data); // Actualiza el estado del carrito
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => {
    setCart([])
  };

  // Función para calcular el total del carrito
  // Suma el precio de cada pizza multiplicado por su cantidad
  const calculateTotal = () => {
    const newTotal = cart.reduce(
      (total, item) => total + item.pizzaPrice * item.quantity,0);
    setTotal(newTotal);
  };



  // Componente Provider que proporciona el contexto a todos los componentes hijos
  // Expone todas las funciones y estados del carrito
  return (
    <CartContext.Provider
      value={{
        cart,           // Array con los items del carrito
        addToCart,      // Función para agregar items
        increaseQuantity, // Función para aumentar cantidad
        decreaseQuantity, // Función para disminuir cantidad
        total,          // Total del carrito
        clearCart       // Función para limpiar el carrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Exportación por defecto del componente proveedor
export default CartProvider;