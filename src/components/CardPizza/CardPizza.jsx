import { useContext } from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";


export const CardPizza = ({ desc=null, isHome, id, name, price, ingredients, img }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const createCart = (pizzaId, pizzaName, pizzaImg, pizzaPrice) => {
    const newElementCart = {pizzaId, pizzaName, pizzaImg, pizzaPrice, quantity: 1, };
    addToCart(newElementCart);
  };

    const VerPizza = () => {
        navigate(`/pizza/${id}`);
    };

  return (
    <Card className="border border-dark">
      <Card.Img  variant="top" src={img}/>      
      <Card.Body>          
        <Card.Title className="text-center">
          <h5>{name}</h5> 
         </Card.Title> 
            <hr/>
            <ul>
              {ingredients.map((ingredient) => (
              <li key={ingredient}>🍕 {ingredient}</li>))}
            </ul>
            <hr/>
        <Card.Text className="text-center">
          <strong>Precio: </strong>${price}
        </Card.Text>    
        <div className="d-flex justify-content-around">
          <Button variant="outline-dark btn" onClick={VerPizza}>Ver mas</Button>        
          <Button variant="dark" onClick={() => createCart(id, name, img, price)}>Añadir 🛒</Button>
       </div>         
      </Card.Body>      
    </Card>  
  );
}   

// Validaciones de PropTypes
CardPizza.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};
export default CardPizza;