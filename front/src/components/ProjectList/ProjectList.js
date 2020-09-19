import React, { useContext } from 'react';
import { DropdownButton, Dropdown, Accordion, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './ProjectList.css'
import CreateProject from '../CreateProject/CreateProject';
import authContext from "../../context/auth/authContext";
import projectsContext from "../../context/projects/projectsContext";
import { FaCrown as CrownIcon, FaUserAlt, FaPlus } from 'react-icons/fa';


const ProjectList = ({ref, setIsVisible}) => {
  //Translator
  const { t, i18n } = useTranslation();
  //Context
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  const projContext = useContext(projectsContext);
  const { projects } = projContext;

  return (
    <DropdownButton variant="light" className="mx-1" id="dropdown-basic-button" title={t("Projects")}>

      <CreateProject ref={ref} setIsVisible={setIsVisible}/>

            <Dropdown.Divider />
            {projects && projects.map((p, index) =>
                <Link key={index} to={"/project/" + p._id} className="font-size-sm block">
                    <Dropdown.Item as="button" className="d-flex justify-content-start">
                        {new Object(p.owner)._id === user._id ? <CrownIcon className="mr-1" /> : <FaUserAlt className="mr-1"/>}
                        {p.title}
                    </Dropdown.Item>
                </Link>
            )}
        </DropdownButton>
    );
}

export default ProjectList;