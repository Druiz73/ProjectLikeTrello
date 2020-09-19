import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <Row className="m-0">
      <Col className="p-0">
        <footer className="bg-dark p-3 position-relative w-100" style={{ bottom: 0 }}>
          <Container>
            <h5 className="text-white text-center">Rolling Code 2020</h5>
          </Container>
        </footer>
      </Col>
    </Row>
  );
};

export default Footer;
