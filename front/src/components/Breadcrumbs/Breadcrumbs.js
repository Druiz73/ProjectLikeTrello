import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { Breadcrumb, Row, Col, BreadcrumbItem, Container } from 'react-bootstrap';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import projectContext from '../../context/projects/projectsContext';
import organizationContext from '../../context/organizations/organizationContext';
import './Breadcrumbs.css'

const Breadcrumbs = ({ location, history }) => {
  const { pathname } = location;
  const pathnames = pathname.split("/").filter(x => x);
  const ProjectContext = useContext(projectContext);
  const { project } = ProjectContext; 
  const OrganizationContext = useContext(organizationContext);
  const { actualOrganization } = OrganizationContext;

  return (
    <Row className="m-0 p-0">
      <Container>
        <Col className="m-0 p-0">
          <Breadcrumb className="bg-transparent p-0 m-0">
            {
              pathnames.length > 0 ? (
                <BreadcrumbItem className="bg-transparent" onClick={() => history.push(`/dashboard/${actualOrganization._id}`)}>
                  <HomeIcon style={{ verticalAlign: 'unset', marginRight: '0.25em' }} />
                  Home
                </BreadcrumbItem>
              ) : null
            }
            {
              pathnames.map((path, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                if (index > 0) {
                  return (
                    <BreadcrumbItem className="bg-transparent" key={index} onClick={() => history.push(routeTo)}>
                      { project !== null ? project.title : '...' }
                    </BreadcrumbItem>
                  )
                }
              })
            }
          </Breadcrumb>
        </Col>
      </Container>
    </Row>
  );
}
 
export default withRouter(Breadcrumbs);