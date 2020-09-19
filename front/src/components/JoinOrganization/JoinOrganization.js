import React, { useEffect, useContext } from 'react';
//Hooks
import useForm from '../../hooks/useForm';
import  { validateOrganization } from '../../utils/validateForm';
import { useTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
//Components
import AlertMsg from '../AlertMsg/AlertMsg';
import{ Link } from 'react-router-dom';

const INITIAL_VALUES = {
  organization: ''
}

const JoinOrganization = () => {
  //State
  const {
    values,
    errors,
    handleOnChange,
    handleOnSubmit
  } = useForm(INITIAL_VALUES, validateOrganization, enterOrganization);
  const { organization } = values;
  const { t } = useTranslation();

  function enterOrganization() {
    console.log('Ingresando al login')
  }

  return (
    <Container>
      <Row className="justify-content-md-center m-4">
        <h1 className="mt-3 mb-4 text-center">{t("JoinOrganizationTitle")}</h1>
        <Col xs={12} md={8}>
          <Card className="p-4">
            <Card.Title className="text-center">{t("SelectOrganizationFormTitle")}</Card.Title>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Label className="font-size-sm">
                  {t("OrganizationLbl")}
                </Form.Label>
                <Form.Control
                  className="font-size-sm"
                  type="text"
                  placeholder={t("OrganizationPlaceholder")}
                  name="organization"
                  id="organization"
                  onChange={handleOnChange}
                  value={organization}
                  minLength="3"
                  maxLength="20"
                  required
                />
              </Form.Group>
              {errors.organization &&
                <AlertMsg variant="danger" text={errors.organization} />
              }
              <Button
                className="mb-2 font-size-sm"
                variant="primary"
                type="submit"
                size="lg"
                block
              >
                {t("OrganizationBtn")}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center m-4">
        <Col xs={12} md={8}>
          <p className="text-center">
            {t("SelectOrganizationQuestion")} <Link to={'/create-organization'}>{t("SelectOrganizationCta")}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
 
export default JoinOrganization;