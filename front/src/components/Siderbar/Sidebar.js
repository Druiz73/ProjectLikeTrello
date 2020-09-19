import React, { useContext } from 'react';
import  { useLocation } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import {
  Image,
  Accordion,
  Card,
} from 'react-bootstrap';
import { RiLogoutBoxRLine as Logout } from 'react-icons/ri';
import './Sidebar.css';
import { useTranslation } from "react-i18next";
import ProjectListSidebar from '../ProjectListSidebar/ProjectListSidebar';
import useVisible from '../../hooks/useVisible';

const Sidebar = ({ value }) => {
  const AuthContext = useContext(authContext);
  const { user, logout } = AuthContext;
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { ref, isVisible, setIsVisible } = useVisible(false);

  return (
    <aside id="menu" ref={value} className="d-sm-flex d-sm-none flex-column align-items-center justify-content-between sidebar bg-light slide">
      <div className="my-3 text-center">
        { user && (
          <>
            <Image
              className="profile-image my-2"
              src={user.photo}
              roundedCircle
            />
            <p className="font-weight-bold">
              {t("Welcome")} {user.username}
            </p>
          </>
        )}
      </div>
      <div className="h-100 d-flex flex-column">
        {location.pathname.startsWith("/dashboard") &&
          <ProjectListSidebar ref={ref} setIsVisible={setIsVisible}/>
        }
        <Accordion className="w-100">
          <Card className="bg-transparent border-0">
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              {t("ChangeLanguage")}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body
                className={localStorage.getItem("i18nextLng") === "es" ? 'active' : null}
                onClick={() => i18n.changeLanguage("es")}
              >
                <span className="mr-2">
                  <img src={process.env.PUBLIC_URL + "/images/spain.png"} alt="Spain flag" />
                </span>{t("Spanish")}
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1">
              <Card.Body
                className={localStorage.getItem("i18nextLng") === "en" ? 'active' : null}
                onClick={() => i18n.changeLanguage("en")}
              >
                <span className="mr-2">
                  <img src={process.env.PUBLIC_URL + "/images/england.png"} alt="England flag" />
                </span>{t("English")}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
      <div>
        {user &&
          (
            <div
              onClick={() => logout()}
            className="d-flex align-items-center w-100 p-2 justify-content-around logout-container font-font-weight-bold bg-danger text-white logout-btn"
            >
              <Logout /> <p className="m-0">Cerrar sesión</p>
            </div>
          )
        }
      </div>
    </aside>
  );
}
 
export default Sidebar;