import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Spinner from '../../components/Spinner/Spinner';

const PrivateRoute = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { auth, loading, authUser, token } = authContext;

  useEffect(() => {
    if(token) {
      authUser();
    }
    // eslint-disable-next-line
  }, []);

  if(loading) return <Spinner />

  return (
    <Route
      {...props}
      render={props => !auth && !loading ?
        (<Redirect to='/login' />)
        : (<Component {...props} />)
      }
    />
  );
};

export default PrivateRoute;
