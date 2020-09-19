import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Modal, Button, Form, Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import useForm from "../../hooks/useForm";
import projectsContext from "../../context/projects/projectsContext";
import notificationsContext from '../../context/notifications/notificationsContext';
import organizationContext from '../../context/organizations/organizationContext';
import { validateProject } from "../../utils/validateForm";
import Select from 'react-select';
import GetUsers from "../GetUsers/GetUsers";
import AlertMsg from "../AlertMsg/AlertMsg";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom";
import "./CreateProject.css"


const INITIAL_STATE = {
  title: '',
  description: '',
  owner: '',
  members: []
};

const CreateProject = ({ ref, setIsVisible }) => {
  //Translator
  const { t, i18n } = useTranslation();
  //Error State
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Hubo un error');
  const [errorVar, setErrorVar] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  //Modal show and hide
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  //Context
  const projContext = useContext(projectsContext);
  const OrganizationContext = useContext(organizationContext);
  const { actualOrganization } = OrganizationContext;
  const { createProject, projectMsg, newProjects, clearProjectMsg, GetProjectList } = projContext;
  const { values, handleOnChange, handleOnSubmit, cleanForm } = useForm(
    INITIAL_STATE,
    validateProject,
    create);
  const { title, description, members } = values;

  //When the user clicks create new project
  const OpenForm = () => {
    setLoading(false);
    cleanForm();
    setError(false);
    handleShow();
  }

  const setMembers = users => {
    values.members = users.map((u) => u.value);
  }

  async function create() {

    try {
      setLoading(true);
      setError(false);
      createProject({ title, description, members, organization: actualOrganization._id });

    } catch (error) {
      console.log("Ocurrió un error", error.message);
    }
  }
  //Example Array to show other projects
  const projects = [
    { value: "Proyecto Clinica", label: "Proyecto Clinica" },
    { value: "Proyecto Veterinaria", label: "Proyecto Veterinaria" },
    { value: "Proyecto E-commerce", label: "Proyecto E-commerce" },
    { value: "Proyecto Gym", label: "Proyecto Gym" }
  ]

  useEffect(() => {
    if (projectMsg) {
      if (projectMsg.message) {
        setErrorMsg("Ese nombre ya está en uso");
        setErrorVar("danger");
        setError(true);
        setLoading(false);
      } else if (projectMsg.active) {
        setErrorMsg("Proyecto creado exitosamente. Click para ir");
        setErrorVar("success");
        setError(true);
        GetProjectList(actualOrganization._id);
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    }

  }, [projectMsg]);

  return (

    <Fragment>
      <div id="createProjectButton" className="createDiv px-4 py-1" onClick={OpenForm} ref={ref}>

        <FaPlus className="mr-1" />
        {t("Create")}
      </div>
      <Modal
        id="createProjectModal"
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop={false}
        keyboard={false}
        autoFocus
      >
        <Form id="crateProjectForm" onSubmit={handleOnSubmit}>
          <Modal.Header id="modalheader" closeButton >
            <Modal.Title id="contained-modal-title-vcenter">
              {t("CreateNewProject")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalBody">
            <Container id="cpModalContainer">

              <Row id="nameRow">
                <Col id="projNameCol" sm={12} md={6} lg={8}>
                  <Form.Group id="projNameFG">
                    <Form.Label id="pnLabel" className="text-muted">{t("ProjectName")}</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="title"
                      id="title"
                      value={title}
                      onChange={handleOnChange}

                    />
                  </Form.Group>
                </Col>
                <Col id="cloneCol">
                  <Form.Group id="cloneFG">
                    <Form.Label id="cloneLabel" className="text-muted">{t("CloneFrom")}</Form.Label>
                    <Select
                      options={projects}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    ></Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row id="descRow">
                <Col id="descCol">
                  <Form.Group id="descFG">
                    <Form.Label id="descriptionLabel" className="text-muted">{t("Description")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      maxLength="500"
                      rows="3"
                      name="description"
                      id="description"
                      value={description}
                      onChange={handleOnChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row id="collabRow">
                <Col id="collabCol">
                  <Form.Group id="collabFG">
                    <Form.Label id="collabLabel" className="text-muted">{t("Collaborators")}</Form.Label>
                    <GetUsers setMembers={setMembers} />
                  </Form.Group>
                </Col>
              </Row>
              {error & (errorVar === "danger") ? <AlertMsg text={errorMsg} variant={errorVar} /> : null}
              {error & (errorVar === "success") ?
                <Link to={"/project/" + new Object(projectMsg)._id}>
                  <AlertMsg text={errorMsg} variant={errorVar} />
                </Link>
                : null
              }
            </Container>
          </Modal.Body>

          <Modal.Footer id="modalFooter">
            <Button id="submitProjectButton" variant="primary" type='submit' disabled={isLoading | !title | (error & (errorVar === "success"))}>
              {isLoading ? `${t("Creating")}...` : t("Create")}
            </Button>
            <Button id="cpCancelButton" variant="secondary" onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Modal.Footer>

        </Form>
      </Modal>
    </Fragment>
  );
}

export default CreateProject;