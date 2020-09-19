import React from "react";
import './Home.css'
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const message = 'Comenzá a trabajar con nosotros';
  const { t } = useTranslation();

  return (
    <>
    
      <div className="hero container-fluid d-flex justify-content-center align-items-center">
          <Col sm={12} md={12} lg={12}>
            <p className="fadeIn hero-text5 text-center">{message}</p><br />
            <div className="d-flex align-items-center justify-content-center">
              <Link className='mx-2' to={"/login"}>
                <Button className="btn-size" variant='primary'>{t("LoginBtn")}</Button>
              </Link>
              <Link to={"/register"}>
                <Button className="btn-size" variant="success">{t("CreateAccountBtn")}</Button>
              </Link>
            </div>
          </Col>
      </div>
    </>
  );
};

export default Home;
