import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {RiSpam2Line as AlertIcon } from 'react-icons/ri'
import projectsContext from "../../context/projects/projectsContext";
import authContext from "../../context/auth/authContext";
import organizationContext from '../../context/organizations/organizationContext';
import AlertMsg from "../AlertMsg/AlertMsg";
import { useTranslation } from "react-i18next";

const LeaveProject = ({history,disabled}) => {
  //States
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Hubo un error');
  const [errorVar, setErrorVar] = useState('danger');
  const [loading, setLoading] = useState(false)

  //Handle Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Context
  const projContext = useContext(projectsContext);
  const AuthContext = useContext(authContext);
  const { leaveProject, projectMsg, project, clearProjectMsg } = projContext;
  const { user } = AuthContext;
  const OrganizationContext = useContext(organizationContext);
  const { actualOrganization } = OrganizationContext;
  let userId = user._id;
  let id = project._id;

  //Translator
  const { t } = useTranslation();

  //Function to leave Project
  async function leaveProj() {
    try {
      setLoading(true);
      leaveProject(id, userId, 'leaveProject');
    } catch (error) {
      console.log("Ocurrió un error", error.message);
    }
  }
  //Messages & redirect
  useEffect(() => {

    if (projectMsg) {
      if (projectMsg.message === "User removed") {
        setErrorVar('success');
        setErrorMsg(t("LeaveProjectMsg"));
        setError(true);

        setTimeout(() => {
          setLoading(false);
          history.push(`/dashboard/${actualOrganization._id}`);
          clearProjectMsg();
        }, 1500);

      } else {
        setErrorVar('danger');
        setErrorMsg(t("LeaveProjectMsgError"));
        setError(true);
        setLoading(false);
      }
    }

  }, [projectMsg]);

  const OpenForm = () => {
    setLoading(false);
    setError(false);
    handleShow();
}

  return (
    <>
      <Button block variant="danger" disabled={disabled} onClick={OpenForm}>
        {t("LeaveProjectBtn")}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <AlertIcon size="5rem" color="red" />
          <Modal.Title>{t("LeaveProjectMsgConfirmation")}</Modal.Title>
        </Modal.Header>
        {error &&
          <Modal.Body>
            <AlertMsg text={errorMsg} variant={errorVar}/>
          </Modal.Body>
        }

        <Modal.Footer>
          <Button disabled={loading} variant="danger" onClick={leaveProj}>{loading?t("LeaveProjectMsgLoading"):t("LeaveProjectMsgLeave") }</Button>
          <Button variant="secondary" onClick={handleClose}>
          {t("LeaveProjectMsgCancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>


  );
}

export default LeaveProject;