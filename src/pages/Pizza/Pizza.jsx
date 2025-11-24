// Importaciones necesarias para React, routing y componentes de Bootstrap
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Pizza() {
  // Hook para obtener el ID de la pizza desde la URL
  const  { id } = useParams()
  
  // Estado para almacenar los datos de la pizza específica
  const [pizza, setPizza] = useState({});
  
  // Hook para navegación programática
  const navigate = useNavigate();
  
  // Hook que se ejecuta al montar el componente para cargar los datos de la pizza
  useEffect(() => {
    getPizza();
  }, []);

    // Variable de entorno para la URL de la API
    const API_URL = import.meta.env.VITE_API_URL;

    // Función asíncrona para obtener los datos de una pizza específica desde la API
    const getPizza = async () => {
        const res = await fetch(`${API_URL}/pizzas/${id}`);
        const pizzaData = await res.json();
        setPizza(pizzaData);
    };

  // Función para navegar de regreso al home
  const Home = () => {
    navigate(`/`);
};

  return (
    <>
    <Container className="mt-4">
        <Row className="justify-content-center">        
            <Col md={4} className="mb-4 d-flex">
                {/* Card que muestra toda la información detallada de la pizza */}
                <Card className="border border-dark">
                <Card.Img  variant="top" src={pizza.img}/>      
                    <Card.Body>          
                        <Card.Title className="text-center">
                            {/* Título y descripción de la pizza */}
                            <h5>{pizza.name}</h5> 
                            <h6>{pizza.desc}</h6>
                        </Card.Title> 
                            <hr/>
                            {/* Lista de ingredientes usando map para renderizar cada uno */}
                            <ul>
                                {pizza.ingredients?.map((ingredient) => (
                                <li key={ingredient}>🍕 {ingredient}</li>))}
                            </ul>
                            <hr/>
                            {/* Precio de la pizza */}
                            <Card.Text className="text-center">
                            <strong>Precio: </strong>${pizza.price}</Card.Text>           
                            <div className="d-flex justify-content-around" >
                                {/* Botón para volver al home */}
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