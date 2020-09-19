import React, { useReducer } from 'react';
import OrganizationContext from './organizationContext';
import organizationReducer from './organizationReducer'
import clientAxios from '../../config/clientAxios';
import { 
  GET_ORGANIZATIONS,
  CREATE_ORGANIZATION,
  GET_ACTUAL_ORGANIZATION,
  CLEAN_ACTUAL_ORGANIZATION,
  CLEAN_ORGANIZATION_MESSAGE
} from '../../types';

const OrganizationState = ({ children }) => {

  const INITIAL_STATE = {
    actualOrganization: null,
    errorMessage: '',
    successMessage: '',
    organizations: []
  }

  const [state, dispatch] = useReducer(organizationReducer, INITIAL_STATE);

  const createOrganization = async data => {
    try {
      let message;
      const response = await clientAxios.post('/organizations', data);
      if(response.status === 200) {
        message = 'Organización creada correctamente'
      }
      console.log(response);
      dispatch({
        type: CREATE_ORGANIZATION,
        payload: {
          message,
          organization: response.data.data
        }
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const getOrganizations = async email => {
    try {
      const response = await clientAxios.get('/organizations');
      dispatch({
        type: GET_ORGANIZATIONS,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const getActualOrganization = async id => {
    try {
      const response = await clientAxios.get(`/organizations/${id}`)
      dispatch({
        type: GET_ACTUAL_ORGANIZATION,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  const cleanActualOrganization = () => {
    dispatch({
      type: CLEAN_ACTUAL_ORGANIZATION,
      payload: null
    })
  }

  const cleanMessage = () => {
    dispatch({
      type: CLEAN_ORGANIZATION_MESSAGE,
      payload: null
    })
  }

  return(
    <OrganizationContext.Provider
      value={{
        actualOrganization: state.actualOrganization,
        errorMessage: state.errorMessage,
        successMessage: state.successMessage,
        organizations: state.organizations,
        createOrganization,
        getOrganizations,
        cleanActualOrganization,
        getActualOrganization,
        cleanMessage
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )

}

export default OrganizationState;