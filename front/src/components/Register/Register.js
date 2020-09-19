import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//Componentes
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import GoogleButton from "../GoogleButton/GoogleButton";
import AlertMsg from "../AlertMsg/AlertMsg";
//Hooks
import useForm from "../../hooks/useForm";
import { validateRegister } from "../../utils/validateForm";
//Context
import AuthContext from "../../context/auth/authContext";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: ""
};

const Register = ({ history }) => {

  //Translation 
  const { t, i18n } = useTranslation();

  //Context
  const authContext = useContext(AuthContext);
  const { registerUser, alert, successMsg, logWithGoogle, clearMsg, logUser } = authContext;

  //Error State
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Hubo un error');
  const [errorVar, setErrorVar] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  const { values, errors, handleOnChange, handleOnSubmit } = useForm(
    INITIAL_STATE,
    validateRegister,
    register);

  const { email, password, confirmPassword } = values;

  useEffect(() => {
    setError(false);
    clearMsg();
  }, [])
  
  useEffect(() => {

    if (successMsg) {
      setErrorMsg("Registro exitoso");
      setErrorVar('success');
      setError(true);
      setLoading(false)
      setTimeout(() => {
        history.push("/login");
        setError(false);
        clearMsg();
      }, 2000);
    }
    if (alert) {
      setError(true);
      setErrorMsg("Ese email ya se encuentra registrado");
      setErrorVar("danger");
      setLoading(false);
      setTimeout(() => {
        clearMsg();
        setError(false);
      }, 2000);
    }

    clearMsg();

  }, [alert, successMsg]);

  async function socialLog() {
    try {
      logWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

/*   function cleanInputs() {
    logUser({
      email: "",
      password: ""
    })
  } */

  async function register() {
    try {
      setLoading(true);
      setError(false);
      registerUser({ email, password });
      //cleanInputs()
    } catch (error) {
      console.log("Ocurrió un error", error.message);
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center m-4">
        <Col sm={12} md={8} lg={6}>
          <Card className="p-4 bg-light">
            <Card.Title className="text-center">
              {t("RegisterTitle")}
            </Card.Title>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("EmailPlaceholder")}
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                  value={email}
                  required
                  pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                  title="ejemplo@ejemplo.com"
                  maxLength="30"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t("Password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("PasswordPlaceholder")}
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  value={password}
                  autoComplete="on"
                  required
                  minLength="8"
                  maxLength="30"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>{t("ConfirmPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("ConfirmPassword")}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleOnChange}
                  value={confirmPassword}
                  autoComplete="on"
                  required
                  minLength="8"
                  maxLength="30"
                  pattern="^[A-Za-z0-9]*$" //Acepta A-Z a-z y 0-9
                  title="No se aceptan caracteres especiales ni espacios"
                />
              </Form.Group>
              {/* Message that shows whenever in case of an error */}
              {errors.email && <AlertMsg text={errors.email} variant={errorVar} />}
              {errors.password && <AlertMsg text={errors.password} variant={errorVar} />}
              {errors.confirmPassword && <AlertMsg text={errors.confirmPassword} variant={errorVar} />}
              {error && <AlertMsg text={errorMsg} variant={errorVar} />}

              <Button
                disabled={isLoading | (error & (errorVar === "success"))}
                className="mb-2"
                variant="primary"
                type="submit"
                size="lg"
                block>
                   {isLoading ? "Cargando..." : t("RegisterTitle")}
              </Button>

              <GoogleButton
                onClick={() => socialLog()}
                text={t("GoogleLoginBtn")}
              />

              <Link to={"/"}>Home</Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
