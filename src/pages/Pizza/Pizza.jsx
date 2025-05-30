import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Pizza() {
  const  { id } = useParams()
  const [pizza, setPizza] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    getPizza();
  }, []);

  const getPizza = async () => {
    const res = await fetch(`http://localhost:5000/api/pizzas/${id}`);
    const pizzaData = await res.json();

    setPizza(pizzaData);
  };

  const Home = () => {
    navigate(`/`);
};

  return (
    <>
    <Container className="mt-4">
        <Row className="justify-content-center">        
            <Col md={4} className="mb-4 d-flex">
                <Card className="border border-dark">
                <Card.Img  variant="top" src={pizza.img}/>      
                    <Card.Body>          
                        <Card.Title className="text-center">
                            <h5>{pizza.name}</h5> 
                            <h6>{pizza.desc}</h6></Card.Title> 
                            <hr/>
                            <ul>
                                {pizza.ingredients?.map((ingredient) => (
                                <li key={ingredient}>🍕 {ingredient}</li>))}
                            </ul>
                            <hr/>
                            <Card.Text className="text-center">
                            <strong>Precio: </strong>${pizza.price}</Card.Text>           
                            <div className="d-flex justify-content-around" >
                                <Button className="btn btn-dark"  onClick={Home}>👈 Volver</Button> 
                            </div>
                    </Card.Body>
                </Card>   
            </Col>          
        </Row>
    </Container>     
    </>
 )
}

export default Pizza;