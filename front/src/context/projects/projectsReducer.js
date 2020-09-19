import {
  GET_PROJECT_LIST,
  GET_PROJECT_BY_ID,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  LEAVE_PROJECT,
  CLEAR_PROJECT_MSG,
  CREATE_MEETING,
  GET_ROOMS_LIST,
  GET_ROOM,
  GET_MEETINGS_REMINDER,
  CLEAN_ROOM,
  ROOM_DENIED,
  DELETE_MEETING
} from '../../types';
export default (state, action) => {
  switch (action.type) {
    case GET_PROJECT_BY_ID:
      return {
        ...state,
        project: action.payload
      }
    case GET_PROJECT_LIST:
      return {
        ...state,
        projects: action.payload
      }
    case CREATE_PROJECT:
      return {
        ...state,
        newProjects: [...state.projects, action.payload],
        projectMsg: action.payload
      }
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: [state.projects.map(project => project._id === action.payload._id ? action.payload : project)],
        newProject: action.payload
      }
    case LEAVE_PROJECT:
      return {
        ...state,
        projectMsg: action.payload
      }
    case DELETE_PROJECT:
      return {
        ...state,
        projectMsg: action.payload
      }
    case CLEAR_PROJECT_MSG:
      return {
        ...state,
        projectMsg: action.payload
      }
    case CREATE_MEETING:
      if (action.payload.message === 'The Room already exists!') {
        return {
          ...state,
          newMeeting: action.payload,
          roomList: [...state.roomList]
        }
      } else {
        return {
          ...state,
          newMeeting: action.payload,
          roomList: [...state.roomList, action.payload]
        }
      }
    case GET_ROOMS_LIST:
      return {
        ...state,
        roomList: action.payload
      }
    case GET_ROOM:
      return {
        ...state,
        actualRoom: action.payload
      }
    case GET_MEETINGS_REMINDER:
      return {
        ...state,
        meetings: action.payload
      }
    case CLEAN_ROOM:
      return {
        ...state,
        actualRoom: action.payload
      }
    case ROOM_DENIED:
      return {
        ...state,
        meetingError: action.payload
      }
    case DELETE_MEETING:
      return {
        ...state,
        roomList: state.roomList.filter(room => room._id !== action.payload.id),
        projectMsg: action.payload.message
      }
    default:
      return state;
  }
}