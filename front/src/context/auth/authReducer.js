import {
  GET_USER,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  LOG_OUT,
  REGISTER_USER,
  CLEAR_MSG,
  REGISTER_ERROR,
  IS_LOADING,
  CHANGE_PASSWORD,
  ERROR_CHANGE_PASSWORD
} from "../../types";
export default (state, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return {
        ...state,
        alert: action.payload,
        loading: false,
      };
    case LOG_OUT:
    case ERROR_LOGIN:
      localStorage.removeItem("token");
      document.cookie = "jwt=";
      return {
        ...state,
        token: null,
        auth: false,
        user: null,
        loading: false,
        alert: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        token: localStorage.getItem("token"),
        auth: state.token ? true : false,
        user: state.token ? action.payload.user : false,
        loading: false
      };
    case SUCCESS_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        alert: null,
        loading: true,
      };
      case REGISTER_USER:
        return {
          ...state,
          alert: null,
          successMsg: action.payload,
          loading: false,
        };
      case CHANGE_PASSWORD:
        return {
          ...state,
          successMsg: action.payload
        }
      case IS_LOADING:
        return {
          ...state,
          loading: true
        }
      case CLEAR_MSG:
      return {
        ...state,
        successMsg: action.payload,
        alert: null
      }
      case ERROR_CHANGE_PASSWORD:
        return {
          ...state,
          errorMsg: action.payload
        }
      default:
        return state;
  }
};
