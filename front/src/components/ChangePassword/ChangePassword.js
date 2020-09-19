import React, { useContext, useEffect } from "react";
//Hooks
import useForm from "../../hooks/useForm";
import { validateChangePassword } from "../../utils/validateForm";
import useModal from "../../hooks/useModal";
import { useTranslation } from 'react-i18next'
//Components
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import AlertMsg from "../AlertMsg/AlertMsg";
import Modal from "../Modal/Modal";
import LargeModal from '../LargeModal/LargeModal';
//Context
import AuthContext from "../../context/auth/authContext";

const INITIAL_STATE = {
  password: "",
  confirmPassword: "",
};
const ChangePassword = ({ match, history }) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const { changePassword, successMsg, confirmToken, errorMsg } = authContext;
  const { values, errors, handleOnChange, handleOnSubmit } = useForm(
    INITIAL_STATE,
    validateChangePassword,
    updatePassword
  );

  console.log(errorMsg);
  
  const { password, confirmPassword } = values;
  const { show, toggle } = useModal();
  const token = match.params.token;
  async function updatePassword() {
    changePassword(password, token);
    toggle();
  }
  
  if(successMsg) {
    history.push('/login');
  }

  useEffect(() => {
    confirmToken(token);
  }, [])


  return (
    <Container>
      <Row className="justify-content-md-center m-4">
        <Col xs={12} md={8}>
        {
          errorMsg 
          ? <LargeModal text={t("ErrorChangePassword")} buttonText={t("ErrorChangePasswordBtn")} />
          : null
        }
          <Modal
            show={show}
            handleClose={toggle}
            title={t("SuccessChangePassTitle")}
            successMsg={t("SuccessChangePassText")}
          />
          <Card className="p-4">
            <Card.Title className="text-center">
              {t("ChangePasswordPageTitle")}
            </Card.Title>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Label htmlFor="password" className="font-size-sm">
                  {t("ChangePasswordLabelNewPass")}
                </Form.Label>
                <Form.Control
                  className="font-size-sm"
                  type="password"
                  placeholder={t("ChangePasswordPassPlaceholder")}
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  value={password}
                  minLength="8"
                  maxLength="30"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password" className="font-size-sm">
                  {t("ChangePasswordLabelConfirmPass")}
                </Form.Label>
                <Form.Control
                  className="font-size-sm"
                  type="password"
                  placeholder={t("ChangePasswordConfirmPassPlaceholder")}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleOnChange}
                  value={confirmPassword}
                  minLength="8"
                  maxLength="30"
                />
              </Form.Group>
              {errors.password && (
                <AlertMsg variant="danger" text={errors.password} />
              )}
              <Button
                className="mb-2 font-size-sm"
                variant="primary"
                type="submit"
                size="lg"
                block
              >
                {t("ChangePasswordButton")}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
