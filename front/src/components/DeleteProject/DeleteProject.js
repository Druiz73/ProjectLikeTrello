import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiDeleteBin2Line as DeleteIcon, RiSpam2Line as AlertIcon } from 'react-icons/ri'
import projectsContext from "../../context/projects/projectsContext";
import authContext from "../../context/auth/authContext";
import organizationContext from '../../context/organizations/organizationContext';
import AlertMsg from "../AlertMsg/AlertMsg";

const DeleteProject = ({history}) => {
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
  const { deleteProject, projectMsg, project, clearProjectMsg } = projContext;
  const { user } = AuthContext;
  const OrganizationContext = useContext(organizationContext);
  const { actualOrganization } = OrganizationContext;
  let userId = user._id;
  let id = project._id;

  //Function to delete
  async function deleteProj() {
    try {
      setLoading(true);
      deleteProject(id, userId, 'delete');
    } catch (error) {
      console.log("Ocurrió un error", error.message);
    }
  }
  //Messages & redirect
  useEffect(() => {

    if (projectMsg) {
      if (projectMsg.message === "Project removed") {
        setErrorVar('success');
        setErrorMsg('Proyecto eliminado');
        setError(true);

        setTimeout(() => {
          setLoading(false);
          history.push(`/dashboard/${actualOrganization._id}`);
          clearProjectMsg();
        }, 1500);

      } else {
        setErrorVar('danger');
        setErrorMsg('Hubo un error eliminando el proyecto');
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
      <Button variant="danger" size="lg" className="mt-2 mr-1 d-flex align-items-center" onClick={OpenForm}>
        <DeleteIcon size="1.5rem" />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <AlertIcon size="5rem" color="red" />
          <Modal.Title>¿Está seguro que desea eliminar el proyecto?</Modal.Title>
        </Modal.Header>
        {error &&
          <Modal.Body>
            <AlertMsg text={errorMsg} variant={errorVar}/>
          </Modal.Body>
        }

        <Modal.Footer>
          <Button disabled={loading} variant="danger" onClick={deleteProj}>{loading?"Eliminando...":"Eliminar" }</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>


  );
}

export default DeleteProject;