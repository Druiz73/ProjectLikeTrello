import {
  SHOW_NOTIFICATION,
  SHOW_NEXT_MEETING,
  UPDATE_REMINDERS,
  UPDATE_NEXT_MEETING,
  POSPONE_MEETING,
  CLEAR_POSPONE,
  DISCARD_MEETING,
  CHECK_TIME
} from '../../types';
export default (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        displayNotification: action.payload
      }
    case SHOW_NEXT_MEETING:
      return {
        ...state,
        displayNextMeeting: action.payload
      }
    case UPDATE_REMINDERS:
      return {
        ...state,
        reminders: action.payload
      }
    case UPDATE_NEXT_MEETING:
      return {
        ...state,
        nextMeeting: action.payload,
        
      }
      case POSPONE_MEETING:
        return {
          ...state,
          nextMeeting: {
            ...state.nextMeeting,
            posponed: true
          },
          displayNotification: false
        }
      case CLEAR_POSPONE:
        return {
          ...state,
          nextMeeting: {
            ...state.nextMeeting,
            posponed: false
          },
          displayNextMeeting: true,
          checkTime:true
        }  
      case DISCARD_MEETING:
        return {
          ...state,
          nextMeeting: {
            ...state.nextMeeting,
            discarded: true
          },
          reminders: action.payload,
          displayNotification: false,

        }
      case CHECK_TIME:
        return {
          ...state,
          checkTime: action.payload
        }
    default:
      return state;
  }
}