import {
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  CLEAN_NOTES,
  UPDATE_COORDINATE,
  SHOW_IMAGE_OVERLAY,
  HIDE_IMAGE_OVERLAY,
  SHOW_ERROR_NOTE,
  HIDE_ERROR_NOTE
} from '../../types';
export default (state, action) => {
  switch(action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        loading: true,
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === action.payload._id ? action.payload : note)
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload.id),
        deleteSuccess: action.payload.message
      }
    case CLEAN_NOTES:
      return {
        ...state,
        notes: action.payload
      }
    case UPDATE_COORDINATE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === action.payload.id ? action.payload : note)
      }
    case SHOW_IMAGE_OVERLAY:
      return {
        ...state,
        imageOverlay: true
      }
    case HIDE_IMAGE_OVERLAY:
      return {
        ...state,
        imageOverlay: false
      }
    case SHOW_ERROR_NOTE:
      return {
        ...state,
        noteMsg: action.payload
      }
    case HIDE_ERROR_NOTE:
      return {
        ...state,
        noteMsg: null,
        deleteSuccess: null
      }
    default:
      return state;
  }
}