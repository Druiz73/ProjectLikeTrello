import React, { useState } from "react";
import clientAxios from '../../config/clientAxios';
import { useTranslation } from "react-i18next";
//Components
import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";
import Modal from "../Modal/Modal";
import AlertMsg from "../AlertMsg/AlertMsg";
import Spinner from '../Spinner/Spinner';
//Hooks
import useModal from "../../hooks/useModal";
import useForm from "../../hooks/useForm";
import { validateEmail } from "../../utils/validateForm";
const INITIAL_STATE = {
  email: "",
};

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const { values, errors, handleOnSubmit, handleOnChange } = useForm(
    INITIAL_STATE,
    validateEmail,
    sendEmail
  );

  const { email } = values;
  const { show, toggle } = useModal();
  const forgotPass = async (email) => {
    try {
      setIsLoading(true)
      const response = await clientAxios.post("/recovery", {
        email,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toggle();
      }
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  async function sendEmail() {
    forgotPass(email);
  }
  
  if (isLoading) return <Spinner />;
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Modal
              show={show}
              successMsg={t("EmailModalText") + email + t("EmailModalText2")}
              handleClose={toggle}
              title={t("EmailModalTitle")}
            />
            <Card className="p-4 mt-4">
              <Card.Title className="text-center">
                {t("PasswordRecoveryTitle")}
              </Card.Title>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                  <Form.Label>{t("EmailLabelPasswordRecovery")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={t("EmailLabel")}
                    id="email"
                    onChange={handleOnChange}
                    value={email}
                  />
                </Form.Group>
                {errors.email && (
                  <AlertMsg variant="danger" text={errors.email} />
                )}
                {error && (
                  <AlertMsg variant="danger" text={error} />
                )}
                <Button type="submit" variant="info" size="lg" block>
                  {t("SendBtn")}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
