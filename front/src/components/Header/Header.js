import React, { useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  Image,
  Row,
  Button,
  NavDropdown,
  Col
} from "react-bootstrap";
import Sidebar from '../Siderbar/Sidebar';
import ProjectList from '../ProjectList/ProjectList';
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import AuthContext from "../../context/auth/authContext";
import { useTranslation } from "react-i18next";
import { RiMenuLine as HamburgerIcon } from 'react-icons/ri';
import useVisible from '../../hooks/useVisible';

const Header = () => {
  const { t, i18n } = useTranslation();
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const location = useLocation();


  return (
    <Row className="m-0">
      <Col className="p-0">
        <header>
          {isVisible && 
            <div ref={ref}>
            <Sidebar />
            </div>
          }
          <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
            <Container>
              <Navbar.Brand className='text-black align-text d-flex align-items-center'>
                <Link className="logo-title" to={user ? "/organization" : "/"}><img
                    src={process.env.PUBLIC_URL + "/images/stars-full-logo.png"}
                    alt=""
                  ></img>Project Stars</Link>
              </Navbar.Brand>
              <Nav className='ml-auto d-flex align-items-center'>
                <Nav className='justify-content-end'>
                  <NavDropdown className="mr-2 navbar-text d-none d-sm-block" title={t("ChangeLanguage")}>
                    <NavDropdown.Item className={localStorage.getItem("i18nextLng") === "es" ? 'active' : null} onClick={() => i18n.changeLanguage("es")}>
                      <span className="mr-2"><img src={process.env.PUBLIC_URL + "/images/spain.png"} alt="Spain flag" /></span>{t("Spanish")}
                    </NavDropdown.Item>
                    <NavDropdown.Item className={localStorage.getItem("i18nextLng") === "en" ? 'active' : null} onClick={() => i18n.changeLanguage("en")}>
                      <span className="mr-2"><img src={process.env.PUBLIC_URL + "/images/england.png"} alt="England flag" /></span>{t("English")}
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <div className="d-none d-sm-block">
                  {(location.pathname.startsWith('/dashboard') && user)&& 
                      <ProjectList ref={ref} setIsVisible={setIsVisible}/>
                      }
                </div>
                <HamburgerIcon
                  onClick={e => setIsVisible(!isVisible)}
                  className="d-block d-sm-none hamburger-icon" />
                {user && 
                (<div className="d-none d-sm-flex justify-content-end">
                  <Navbar.Text className='mr-3'>
                    {t("Welcome")}: {user.username}
                  </Navbar.Text>
                  <NavDropdown
                    className="d-none d-sm-block p-0"
                    id="collasible-nav-dropdown"
                    title={
                      <Image
                        className="img-width p-0"
                        src={user.photo}
                        roundedCircle
                      />
                    }
                  >
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                    <NavDropdown.Item>Ver más</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logout()}>
                      {t("closeSessionBtn")}
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>)}
                {/* {user ? 
                (
                  <>
                    <HamburgerIcon
                      onClick={e => setIsVisible(!isVisible)}  
                      className="d-block d-sm-none hamburger-icon" />
                    <div className="d-none d-sm-flex justify-content-end">
                      <Navbar.Text className='mr-3'>
                        {t("Welcome")}: {user.username}
                      </Navbar.Text>
                      <NavDropdown
                        className="d-none d-sm-block p-0"
                        id="collasible-nav-dropdown"
                        title={
                          <Image
                            className="img-width p-0"
                            src={user.photo}
                            roundedCircle
                          />
                        }
                      >
                        <NavDropdown.Item>Perfil</NavDropdown.Item>
                        <NavDropdown.Item>Ver más</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => logout()}>
                          {t("closeSessionBtn")}
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </>
                ) : null} */}
              </Nav>
            </Container>
          </Navbar>
        </header>
      </Col>
    </Row>
  );
};

export default Header;
