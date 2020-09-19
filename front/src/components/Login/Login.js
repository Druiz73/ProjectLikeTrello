import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";
//Hooks
import useForm from "../../hooks/useForm";
import { validateLogin } from "../../utils/validateForm";
//Components
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import GoogleButton from "../GoogleButton/GoogleButton";
import AlertMsg from "../AlertMsg/AlertMsg";
//Context
import AuthContext from "../../context/auth/authContext";
import NoteContext from '../../context/notes/noteContext';

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = ({ history }) => {
  //Context
  const authContext = useContext(AuthContext);
  const { logUser, alert, auth, token, authUser } = authContext;
  const noteContext = useContext(NoteContext);
  const { cleanNotes } = noteContext;

  //State
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const { values, errors, handleOnChange, handleOnSubmit } = useForm(
    INITIAL_STATE,
    validateLogin,
    login
  );

  const { email, password } = values;
  useEffect(() => {
    if (token) {
      authUser();
      history.push("/organization");
    }
    if (alert) {
      setError(alert);
    }

    if(!localStorage.getItem("token")) {
      cleanNotes();
    }
  }, [auth, history, alert, token]);

  async function login() {
    try {
      logUser({ email, password });
    } catch (error) {
      console.log("Ocurrió un error", error.message);
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center my-4 main-container-height">
        <Col xs={12} md={8}>
          <Card className="p-4">
            <Card.Title className="text-center">{t("LoginTitle")}</Card.Title>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Label className="font-size-sm">
                  {t("EmailLabel")}
                </Form.Label>
                <Form.Control
                  className="font-size-sm"
                  type="email"
                  placeholder={t("EmailPlaceholder")}
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                  value={email}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-size-sm">
                  {t("PasswordLabel")}
                </Form.Label>
                <Form.Control
                  className="font-size-sm"
                  type="password"
                  placeholder={t("PasswordPlaceholder")}
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  value={password}
                  autoComplete="on"
                  required
                  minLength="8"
                />
              </Form.Group>
              {errors.email && <AlertMsg variant="danger" text={error.email} />}
              {errors.password && (
                <AlertMsg variant="danger" text={errors.password} />
              )}
              {alert && <AlertMsg variant="danger" text={alert.text} />}
              <Button
                className="mb-2 font-size-sm"
                variant="primary"
                type="submit"
                size="lg"
                block
              >
                {t("LoginBtn")}
              </Button>
              <GoogleButton
                text={t("GoogleLoginBtn")}
              />
              <Link to={"/forgot-password"} className="font-size-sm block">
                {t("ForgotYourPasswordTxt")}
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
