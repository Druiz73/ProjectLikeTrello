import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
//Styles
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="overlay-spinner">
      <div className="spinner-container">
        <div className="spinner"></div>
          <p className="m-0 p-0 strong rclogo-center">{"< >"}</p>
          <p className="text-gray text-center">cargando datos...</p>
      </div>
    </div>
  );
}
 
export default Spinner;