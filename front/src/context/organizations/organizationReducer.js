import {
  GET_ORGANIZATIONS,
  CREATE_ORGANIZATION,
  CLEAN_ACTUAL_ORGANIZATION,
  GET_ACTUAL_ORGANIZATION,
  CLEAN_ORGANIZATION_MESSAGE
} from '../../types';

export default (state, action) => {
  switch(action.type) {
    case GET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload
      }
    case CREATE_ORGANIZATION:
      return {
        ...state,
        organizations: [...state.organizations, action.payload.organization],
        successMessage: action.payload.message,
        actualOrganization: action.payload.organization
      }
    case CLEAN_ACTUAL_ORGANIZATION:
      return {
        ...state,
        actualOrganization: action.payload
      }
    case GET_ACTUAL_ORGANIZATION:
      return {
        ...state,
        actualOrganization: action.payload
      }
    case CLEAN_ORGANIZATION_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}