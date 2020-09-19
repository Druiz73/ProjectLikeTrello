import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clientAxios from "../../config/clientAxios";
import authToken from "../../config/authToken";
import {
  GET_USER,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  LOG_OUT,
  REGISTER_USER,
  REGISTER_ERROR,
  IS_LOADING,
  CLEAR_MSG,
  CHANGE_PASSWORD,
  ERROR_CHANGE_PASSWORD
} from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    user: null,
    alert: null,
    loading: false,
    successMsg: null,
    errorMsg: false
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //Validate user token
  const authUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      authToken(token);
    }
    dispatch({
      type: IS_LOADING
    })
    try {
      const response = await clientAxios.get("/protected");
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      const message = {
        text: error.response.data.error,
      };
      dispatch({
        type: ERROR_LOGIN,
        payload: message,
      });
    }
  };
  //When the user logs
  const logUser = async (data) => {
    try {
      const response = await clientAxios.post("/login", data);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: response.data.data,
      });
      authUser();
    } catch (error) {
      const message = {
        text: error.response.data.error,
      };
      dispatch({
        type: ERROR_LOGIN,
        payload: message,
      });
    }
  };

  //When the user registers a new account
  const registerUser = async (data) => {
    try {
      const response = await clientAxios.post("/register", data);
      if(response.data.error){
        dispatch({
          type: REGISTER_ERROR,
          payload: response.data.error
        })
      } else {
        dispatch({
        type: REGISTER_USER,
        payload: response.data
      })
      }
      
    }
      catch (error){
      const message = { text: error.response.data.error || null}
      dispatch({
        type: REGISTER_ERROR,
        payload: message
      })
  }
  }

  const clearMsg = () =>{
    dispatch({
      type: CLEAR_MSG,
      payload: null
    })
  }

  const logout = async () => {
    dispatch({
      type: LOG_OUT,
    });

  };
  
  const changePassword = async (password, token) => {
    try {
      const response = await clientAxios.put(`/updatePassword/${token}`, {
        password,
      });
      dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data.message
      })
    } catch (error) {
      console.log(error.response);
    }
  };

  const confirmToken = async token => {
    try {
      await clientAxios.get(`/confirmToken/${token}`);
    } catch (error) {
      dispatch({
        type: ERROR_CHANGE_PASSWORD,
        payload: true
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        alert: state.alert,
        loading: state.loading,
        successMsg: state.successMsg,
        errorMsg: state.errorMsg,
        registerUser,
        logUser,
        authUser,
        logout,
        changePassword,
        clearMsg,
        confirmToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthState;