import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import {IoIosVideocam} from 'react-icons/io'
//Context
import ProjectsContext from '../../context/projects/projectsContext';
import AuthContext from '../../context/auth/authContext';

import { Jutsu } from 'react-jutsu';

const Jitsi = ({onCall, setOnCall, name, room}) => {
//Context
const projectsContext = useContext(ProjectsContext);
const authContext = useContext(AuthContext);
const {user} = authContext;
const {actualRoom} = projectsContext;


return (

  <Container className="d-flex justify-content-center m-3">
    <Col xs={12} md={12} lg={12} className="d-flex justify-content-center">
      <Jutsu
        roomName={room}
        displayName={name}
        onMeetingEnd={() => setOnCall(false)}
        loadingComponent={<p>Cargando...</p>} />
    </Col>
  </Container>

) 

}

export default Jitsi