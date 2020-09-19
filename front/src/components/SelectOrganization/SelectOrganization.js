import React, { useContext, useEffect } from 'react';
import { useTranslation } from "react-i18next";
//Components
import { Container, Row, Col } from "react-bootstrap";
import CardCompany from '../CardCompany/CardCompany';
import ModalNotes from '../ModalNotes/ModalNotes';
//Context
import organizationContext from '../../context/organizations/organizationContext';
import authContext from '../../context/auth/authContext';
//Styles
import './SelectOrganization.css'

const SelectOrganization = () => {
  //State
  const { t } = useTranslation();
  //Context
  const OrganizationContext = useContext(organizationContext);
  const { getOrganizations, organizations } = OrganizationContext;
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  useEffect(() => {
    if(user) {
      getOrganizations(user.email);
    }
  } , [])

  return (
    <Container>
      <Row className="justify-content-md-center m-4">
        <Col xs={12}>
          <h1 className="text-center mb-3 select-title">{t("SelectOrganizationTitle")}</h1>
        </Col>
        <Col xs={12} md={5}>
          <CardCompany />
          <CardCompany joinOrganization />
          {
            organizations.length > 0 ? (
              organizations.map((organization, index) => <CardCompany key={index} organization={organization} />)
            ) :
              <h4 className="text-center second-title">No posee organizaciones</h4>
          }
        </Col>
      </Row>
    </Container>
  );
}
 
export default SelectOrganization;