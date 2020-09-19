import React, { useState } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
//Styles
import './ToastNotif.css';

const ToastNotif = ({ text }) => {
  const [show, setShow] = useState(true);
  return (
    <Row>
        <Col>
          <Toast className="mx-auto animated hinge fadeInDown" onClose={() => setShow(false)} show={show}>
            <Toast.Header className="justify-content-between">
              <strong className="text-center">Nota eliminada</strong>
            </Toast.Header>
            <Toast.Body className="p-4">
              {text}
            </Toast.Body>
          </Toast>
        </Col>
    </Row>
  );
}
 
export default ToastNotif;