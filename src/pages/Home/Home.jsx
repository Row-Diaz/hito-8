import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header.jsx"
import CardPizza from '../../components/CardPizza/CardPizza';
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = async () => {
    const respuesta = await fetch ("http://localhost:5000/api/pizzas")
    const pizzas = await respuesta.json()

    setPizzas(pizzas)
  }

  return (
    <>
      <Header></Header>
        <Container className="mt-4">
          <Row className="justify-content-center">        
            {pizzas.map((pizza) => (
              <Col md={4} className="mb-4 d-flex" key={pizza.id}>
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
