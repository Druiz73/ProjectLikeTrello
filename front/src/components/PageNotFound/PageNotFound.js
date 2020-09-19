import React from 'react';
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FaLessThan, FaGreaterThan, FaQuestion } from "react-icons/fa";
import "./PageNotFound.css"

const PageNotFound = ({history}) => {
  return ( 
    <Container className="nf-container mt-5 pt-5  border rounded d-flex  align-items-center">
      <Col>
      <Row className="d-flex justify-content-center align-items-center">
      <FaLessThan size="6rem"/>
      <FaQuestion size="6rem"/>
      <FaGreaterThan size="6rem"/>
      </Row>
      <Row className='justify-content-center m-3'>
        <h1 className='text-border error'>404</h1>
      </Row>
      <Row className='justify-content-center'>
        <h3>No se ha podido cargar la página o la dirección que está buscando no existe.</h3>
        <h4 className="text-muted">Estamos trabajando para solucionar el problema</h4>
      </Row>
      <Row className='justify-content-center'>
        <Button className="m-2" size="lg" onClick={history.goBack}>Volver</Button>
      </Row>
      <Image src={process.env.PUBLIC_URL + "/images/NotFound.jpg"} width="200px"></Image>
      </Col>
    </Container >
   );
}
 
export default PageNotFound;