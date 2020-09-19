import React, { useContext, useState } from 'react';
import { FiSave as SaveIcon, FiX as CancelIcon } from "react-icons/fi"
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import projectsContext from "../../context/projects/projectsContext";
import authContext from "../../context/auth/authContext";
import useForm from "../../hooks/useForm";

const UpdateDescription = (props) => {

  //Context
  const projContext = useContext(projectsContext);
  const AuthContext = useContext(authContext);
  const { updateProject, projectMsg, project, clearProjectMsg } = projContext;
  const { user } = AuthContext;
  let userId = user._id;
  let id = project._id;
  
  const [description, setDescription] = useState(`${project.description}`)

    const handleOnChange = e => {
      setDescription(e.target.value);
    }

    async function update() {
      try {
        updateProject( id, userId, { description }, 'update' );
      } catch (error) {
        console.log("Ocurrió un error", error.message);
      }
    }

    const handleOnSubmit = e => {
      e.preventDefault();
      update();
      props.setEditDescription(false)
    }

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Row className="justify-content-around">
        <Col xs={9} sm={10} >
          <Form.Control
            as="textarea"
            rows="3"
            onChange={handleOnChange}
            value={description}
            name="description"
            maxLength="500" />
        </Col>
        <Col xs={1} sm={1}>
          <Row className="justify-content-center">
          <Button type="submit"  variant="warning" className="mb-1">
            <SaveIcon size="1.5rem"/>
          </Button>
          </Row>
          <Row className="justify-content-center">
          <Button  variant="dark" onClick={()=>props.setEditDescription(false)}>
            <CancelIcon size="1.5rem" color="gold" />
          </Button>
          </Row>
        </Col>
        </Row>
      </Form>

    </>
  );
}

export default UpdateDescription; 