import React, { useContext } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { withRouter } from 'react-router-dom'
//Context
import authContext from '../../context/auth/authContext'

const BreadcrumbCnt = ({ children, location }) => {

  const AuthContext = useContext(authContext);
  const { auth } = AuthContext;

  return (
    <>
      {
        auth && location.pathname.indexOf('organization') < 0 ?
        (
          <div>
            <Breadcrumbs />
            {children}
          </div>
        ) : (
          <div>
            {children}
          </div>
        )
      }
    </>
  );
}
 
export default withRouter(BreadcrumbCnt);