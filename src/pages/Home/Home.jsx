// Importaciones para la página principal
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header.jsx"
import CardPizza from '../../components/CardPizza/CardPizza';
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  // Estado para almacenar el array de pizzas disponibles
  const [pizzas, setPizzas] = useState([]);
  
  // Hook que se ejecuta al montar el componente para cargar todas las pizzas
  useEffect(() => {
    getPizzas();
  }, []);

  // Función asíncrona para obtener todas las pizzas desde la API
  const getPizzas = async () => {
    const respuesta = await fetch ("http://localhost:5000/api/pizzas")
    const pizzas = await respuesta.json()
    setPizzas(pizzas)
  }

  return (
    <>
      {/* Componente Header con imagen y mensaje de bienvenida */}
      <Header></Header>
      
      {/* Container principal con grid de pizzas */}
        <Container className="mt-4">
          <Row className="justify-content-center">        
            {/* Mapeo de todas las pizzas para crear cards individuales */}
            {pizzas.map((pizza) => (
              <Col md={4} className="mb-4 d-flex" key={pizza.id}>
                {/* Componente CardPizza que recibe props de cada pizza */}
                <CardPizza 
                  id={pizza.id}
                  img={pizza.img}
                  name={pizza.name}
                  desc={pizza.desc}                         
                  ingredients={pizza.ingredients}                         
                  price={pizza.price}/>
              </Col>
            ))}               
          </Row>
        </Container>
    </>
  );
};
export default Home;
