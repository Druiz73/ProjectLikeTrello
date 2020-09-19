import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import Spinner from '../Spinner/Spinner';
const SuccessLogin = ({ history, location }) => {
  const authContext = useContext(AuthContext);
  const { authUser } = authContext;
  const token = location.search.slice(7)
  localStorage.setItem("token", `Bearer ${token}`);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authUser();
      history.push("/organization");
    } else {
      history.push("/login");
    }
  }, [history, authUser]);
  
  return(
    <Spinner />
  );
};

export default SuccessLogin;
