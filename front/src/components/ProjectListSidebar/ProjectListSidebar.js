import React, { useContext } from 'react';
import { Button, ListGroup, Accordion, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CreateProject from '../CreateProject/CreateProject';
import authContext from "../../context/auth/authContext";
import projectsContext from "../../context/projects/projectsContext";
import { FaCrown as CrownIcon, FaUserAlt, FaPlus } from 'react-icons/fa';

const ProjectListSidebar = ({ref, setIsVisible}) => {
  //Translator
  const { t, i18n } = useTranslation();
  //Context
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;
  const projContext = useContext(projectsContext);
  const { projects } = projContext;

  return (
    <Accordion className="w-100">
      <Card className="bg-light border-0">
        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
          {t("Projects")}
        </Accordion.Toggle>

         <Accordion.Collapse eventKey="1">
          <Card.Body>
            <div className="py-2 mb-2 border">
            <CreateProject ref={ref} setIsVisible={setIsVisible}/>
            </div>
            
            {projects && projects.map((p, index) => 
            <ListGroup className="mt-1">
                <Link key={index} to={"/project/" + p._id} className="font-size-sm block">
                    <ListGroup.Item className="d-flex justify-content-start align-items-center bg-light">
                        {new Object(p.owner)._id === user._id ? <CrownIcon className="mr-1" /> : <FaUserAlt className="mr-1"/>}
                        {p.title}
                    </ListGroup.Item>
            </Link>
            </ListGroup>
            )}
          </Card.Body>
        </Accordion.Collapse> 
            

      </Card>
    </Accordion>
  );
}

export default ProjectListSidebar;