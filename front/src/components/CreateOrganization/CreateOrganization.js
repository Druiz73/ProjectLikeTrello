import React, { useState, useEffect, useContext } from 'react';
//Hooks
import useForm from "../../hooks/useForm";
import { validateOrganization } from "../../utils/validateForm";
import { useTranslation } from "react-i18next";
import useModal from '../../hooks/useModal';
//Components
import CreatableSelect from 'react-select/creatable';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import AlertMsg from '../AlertMsg/AlertMsg';
import Modal from '../Modal/Modal';
//Context
import organizationContext from '../../context/organizations/organizationContext';
import authContext from '../../context/auth/authContext';

const INITIAL_STATE = {
  organization: ''
}

const components = {
  DropdownIndicator: null
}

const createOption = label => ({
  label,
  value: label
})

const CreateOrganization = ({ history }) => {
  //State
  const [emailInput, setMailInput] = useState('');
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);
  //Context
  const OrganizationContext = useContext(organizationContext);
  const { createOrganization, successMessage, actualOrganization, cleanActualOrganization, cleanMessage } = OrganizationContext;
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;
  const { show, toggle } = useModal();
  //Handle Form utils
  const {
    values,
    errors,
    handleOnChange,
    handleOnSubmit
  } = useForm(INITIAL_STATE, validateOrganization, postOrganization);
  const { organization } = values;
  const { t } = useTranslation();

  function postOrganization() {
    const users = emails.map(email => email.value);
    const newUsers = [...users, user.email]
    const data = {
      name: organization,
      members: newUsers,
      createBy: user._id
    }
    createOrganization(data);
    toggle();
  }

  const handleEmailChange = (value, action) => {
    const newArray = emails.filter(email => email.label !== action.removedValue.label)
    setEmails(newArray);
  }

  const handleInputChange = inputValue => {
    setMailInput(inputValue);
  }

  useEffect(() => {
    if (emails.length > 20) {
      setDisabledInput(true);
      setError('Ha excedido el límite de usuarios');
      setTimeout(() => {
        setError('');
      }, 2000)
    }
  }, [emails])

  const handleKeyDown = e => {
    if (!emailInput) return;
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailInput)) {
          setMailInput('');
          setEmails([...emails, createOption(emailInput)])
        } else {
          setError('El email no es válido')
          setTimeout(() => {
            setError('');
          }, 2000)
        }
        e.preventDefault();
        break
      default:
        return ''
    }
  }

  const redirectToDashboard = () => {
    history.push(`/dashboard/${actualOrganization._id}`)
  }

  const redirectToSelectOrg = () => {
    cleanActualOrganization();
    history.push('/organization');
  }

  return (
    <Container>
      <Row className="justify-content-md-center m-4">
        <Modal
          isConfirmModal
          show={successMessage}
          handleClose={cleanMessage}
          title="Organización creada con éxito"
          successMsg={successMessage}
          btnConfirmText="Ir al dashboard"
          btnCancelText="Volver a organizaciones"
          onConfirm={redirectToDashboard}
          onCancel={redirectToSelectOrg}
        />
        <h1 className="mt-3 mb-4 text-center">{t("CreateOrganizationTitle")}</h1>
        <Col xs={12} md={8}>
          <Card className="p-4">
            <Card.Title className="text-center">{t("CreateOrganizationForm")}</Card.Title>
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
              <Form.Group>
                <Form.Label>
                  {t("CreateOrganizationUsersLbl")}
                </Form.Label>
                <CreatableSelect
                  components={components}
                  isMulti
                  isClearable
                  placeholder={t("CreateOrganizationEmailPlaceholder")}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                  onInputChange={handleInputChange}
                  menuIsOpen={false}
                  inputValue={emailInput}
                  value={emails}
                  isDisabled={disabledInput}
                />
              </Form.Group>
              {errors.organization &&
                <AlertMsg variant="danger" text={errors.organization} />
              }
              {error &&
                <AlertMsg variant="danger" text={error} />
              }
              <Button
                className="mb-2 font-size-sm"
                variant="primary"
                type="submit"
                size="lg"
                block
              >
                {t("CreateOrganizationBtn")}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateOrganization;