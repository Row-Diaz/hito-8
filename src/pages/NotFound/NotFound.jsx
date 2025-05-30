import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import NotFound from '../assets/img/404.png';

const NotFound = () => {
  return (
     <Container className="d-flex justify-content-center align-items-center " style={{ height:'70vh'}}>
        <Row  className="text-center">
            <Col>
                {/* <img src={NotFound} alt='Error 404' /> */}
                <img 
                  src="https://via.placeholder.com/300x200?text=404+Not+Found" 
                  alt='Error 404' 
                  style={{maxWidth: "100%", height: "auto"}}
                />
                <h3 className="mb-4">Página No Encontrada</h3>
                <p className="mb-4">Lo sentimos, la página que estás buscando no existe.</p>
                <Link to="/" className='boton3 text-white'>Volver al Inicio</Link>
            </Col>
        </Row>
      </Container>
    );
};

export default NotFound;