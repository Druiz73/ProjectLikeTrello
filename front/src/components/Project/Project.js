import React, { useEffect, useContext, useState } from 'react';
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
//Components
import UpdateUsers from "../UpdateUsers/UpdateUsers";
import UpdateDescription from '../UpdateDescription/UpdateDescription';
import CreateMeeting from "../CreateMeeting/CreateMeeting";
import DeleteProject from "../DeleteProject/DeleteProject";
import LeaveProject from "../LeaveProject/LeaveProject";
import { Link } from 'react-router-dom';
import MeetingsReminder from "../MeetingsReminder/MeetingsReminder";
import { FiEdit as EditIcon } from 'react-icons/fi';
import DeleteRoom from '../DeleteRoom/DeleteRoom';
import moment from 'moment';

//Context
import ProjectsContext from '../../context/projects/projectsContext';
import AuthContext from '../../context/auth/authContext';
//Styles
import './Project.css';


const Project = ({ match, history }) => {
  const [editDescription, setEditDescription] = useState(false);
  const [editMembers, setEditMembers] = useState(false);
  //context
  const projectsContext = useContext(ProjectsContext);
  const { getProjectById, project, updateProject, newProject, getRoomsList, roomList, cleanRoom, actualRoom } = projectsContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  //Translator
  const { t } = useTranslation();
  useEffect(() => {
    getProjectById(match.params.id);
    getRoomsList(match.params.id);
    if(roomList[roomList.length - 1] === undefined) {
      getRoomsList(match.params.id);
    }
    if(actualRoom) {
      cleanRoom();
    }
  }, [newProject, editMembers, actualRoom]);



  let members = [];
  let userId = user._id;
  const setMembers = users => {
    members = users.map((u) => u.value);
  }

  async function update() {
    try {
      updateProject(match.params.id, userId, { members }, 'update');
      setEditMembers(false);
    } catch (error) {
      console.log("Ocurrió un error", error.message);
    }
  }

  return (
    <>
      <Row className="d-flex justify-content-center">
        <MeetingsReminder />
      </Row>
      {project && (
        <>
          {/* Title Row */}
          <Container className="main-container">
            <Row>
              <Col xs={10} sm={10} md={10} lg={10} className="d-flex align-items-center justify-content-center">
                <h1 className="my-4 ml-2 title-size">{project.title} / {project.owner ? project.owner.email : ''}</h1>
              </Col>
              {/* This checks if the logged user is the owner of the project. The true case will show delete button */}
              {authContext.user._id === project.owner._id ?
                <Col className="d-flex justify-content-center justify-content-xs-start justify-content-sm-start align-items-center">
                  <DeleteProject history={history} />
                </Col>
                : null
              }
               
            </Row>

            {/* 2nd Row: Members and Rooms */}
            <Row>
              {/* Members Col */}
              <Col xs={12} sm={12} md={6} lg={6}>
                {!editMembers ?
                  <Card className="mt-3 mb-1 card-size-fix" border="primary">
                    <Card.Header className="d-flex justify-content-center align-items-center">                     
                      <span className="member-icon mr-2 card-title--text">
                        <img className="img-fluid" src={process.env.PUBLIC_URL + "/images/members.png"} alt="Members" />
                      </span>
                      <h3 className="m-0 card-title--text">{t("MembersProjects")}</h3>
                    </Card.Header>
                    <Card.Body className="p-0 overflow-auto">
                      <ListGroup className="list-group-flush">
                        {project.members.length > 0 ? (
                          project.members.map((p) => {
                            return (
                              <ListGroup.Item className="list-group-item d-flex justify-content-center align-items-center" key={p._id}>{p.email}
                              </ListGroup.Item>
                            )
                          })
                        ) : (<p className="text-center">{t("AddMembersMsg")}</p>)}
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                      <Button block disabled={authContext.user._id !== project.owner._id} onClick={() => setEditMembers(true)}>{t("EditBtnProjects")}</Button>
                      {project.members.length > 1 ? 
                      <LeaveProject history={history} disabled={false} />: 
                      <LeaveProject history={history} disabled={true} />}
                    </Card.Footer>
                  </Card>
                  :
                  <Card className="mb-1 mt-3 card-size-fix" border="primary">
                    <Card.Header className="d-flex justify-content-center align-items-center">
                      <span className="member-icon mr-2">
                        <img className="img-fluid" src={process.env.PUBLIC_URL + "/images/members.png"} alt="Members" />
                      </span>
                      <h3 className="card-title--text">{t("EditMembersProject")}</h3>

                    </Card.Header>
                    <Card.Body className="p-2 overflow-auto">
                      <UpdateUsers
                        setMembers={setMembers}
                        currentMembers={project.members}
                        setEditMembers={setEditMembers}
                        update={update}
                      />

                    </Card.Body>
                  </Card>
                }
                
              </Col>
              {/* Rooms Col */}
              <Col sm={12} md={6} lg={6}>
                <Card className="mt-3 card-size-fix" border="success">
                  <Card.Header className="d-flex justify-content-center align-items-center">
                    <h3 className="card-title--text">{t("RoomTitleProject")}</h3>
                  </Card.Header>
                  <Card.Body className="overflow-auto">
                    <ListGroup className="list-group-flush">
                      {roomList.length > 0 ? (
                        roomList.map((room, index) => {
                          if (room !== undefined) {
                            return (
                              <ListGroup.Item
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center p-2"
                              >
                                <Link to={`/daily/${room._id}`}>
                                  {room.nameRoom}
                                </Link>
                                <DeleteRoom idProject={match.params.id} id={room._id} history={history} />

                              </ListGroup.Item>
                            )
                          }
                        })
                      ) : (<p className="text-center">{t("AddRoomProject")}</p>)}
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer>
                    <CreateMeeting />
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            {/* 3rd Row: Description */}
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Card className="mt-3" border="warning">
                  <Card.Header className="text-center">
                    <Row className="justify-content-between px-3">
                      <h3 className="card-title--text">{t("DescriptionProjects")}</h3>
                      <Button
                        disabled={(authContext.user._id !== project.owner._id) || (editDescription === true)}
                        variant="warning"
                        onClick={() => setEditDescription(true)}>
                        <EditIcon size="1.5rem" />
                      </Button>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    {!editDescription ?
                      <Card.Text className="text-center">{project.description} </Card.Text> :
                      <UpdateDescription setEditDescription={setEditDescription} />
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )
      }
    </>
  );

}

export default Project