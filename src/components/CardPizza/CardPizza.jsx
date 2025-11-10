// Importaciones necesarias para el componente de tarjeta
import { useContext } from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";


export const CardPizza = ({ desc=null, isHome, id, name, price, ingredients, img }) => {
  // Obtención de la función addToCart del contexto del carrito
  const { addToCart } = useContext(CartContext);
  
  // Hook para navegación programática
  const navigate = useNavigate();
  
  // Función que crea un objeto pizza para agregar al carrito
  // Estructura el objeto con todos los datos necesarios para el carrito
  const createCart = (pizzaId, pizzaName, pizzaImg, pizzaPrice) => {
    const newElementCart = {
      pizzaId, 
      pizzaName, 
      pizzaImg, 
      pizzaPrice, 
      quantity: 1, // Cantidad inicial siempre es 1
    };
    addToCart(newElementCart);
  };

  // Función para navegar a la página de detalle de la pizza
    const VerPizza = () => {
        navigate(`/pizza/${id}`);
    };

  return (
    <Card className="border border-dark">
      {/* Imagen de la pizza */}
      <Card.Img  variant="top" src={img}/>      
      <Card.Body>          
        <Card.Title className="text-center">
          {/* Nombre de la pizza */}
          <h5>{name}</h5> 
         </Card.Title> 
            <hr/>
            
            {/* Lista de ingredientes de la pizza */}
            <ul>
              {ingredients.map((ingredient) => (
              <li key={ingredient}>🍕 {ingredient}</li>))}
            </ul>
            <hr/>
            
        {/* Precio de la pizza */}
        <Card.Text className="text-center">
          <strong>Precio: </strong>${price}
        </Card.Text>    
        
        {/* Botones de acción */}
        <div className="d-flex justify-content-around">
          {/* Botón para ver más detalles - navega a página específica */}
          <Button variant="outline-dark btn" onClick={VerPizza}>Ver mas</Button>        
          
          {/* Botón para agregar al carrito */}
          <Button variant="dark" onClick={() => createCart(id, name, img, price)}>Añadir 🛒</Button>
       </div>         
      </Card.Body>      
    </Card>  
  );
}   

// Validaciones de PropTypes para garantizar tipos correctos de props
CardPizza.propTypes = {
  name: PropTypes.string.isRequired,        // Nombre es string obligatorio
  price: PropTypes.number.isRequired,       // Precio es número obligatorio
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de strings obligatorio
  img: PropTypes.string.isRequired,         // Imagen es string obligatorio
};
export default CardPizza;