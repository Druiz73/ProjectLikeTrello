import React from "react";
import { Button } from "react-bootstrap";
import "./GoogleButton.css";
const GoogleButton = ({ text }) => {
  return (
    <a href={`${process.env.REACT_APP_BACKEND_URL}auth/google`}>
      <Button
        variant="outline-danger"
        className="mb-2 btn-position font-size-sm"
        size="lg"
        block
      >
        <span className="logo-position d-xs-none">
          <img
            className="google-logo"
            src={process.env.PUBLIC_URL + "/images/google_logo.png"}
            alt="Logo de Google"
          />
        </span>
        {text}
      </Button>
    </a>
  );
};

export default GoogleButton;
