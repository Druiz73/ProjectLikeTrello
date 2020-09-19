import {
  GET_NOTES_COMPANY,
  ADD_NOTE_COMPANY,
  UPDATE_NOTE_COMPANY,
  DELETE_NOTE_COMPANY,
  HIDE_ERROR_COMPANY_NOTES,
  CLEAN_NOTES_COMPANY,
  UPDATE_COORDINATE_NOTES_COMPANY,
  SHOW_ERROR_COMPANY_NOTES,
  SHOW_IMAGE_COMPANY_OVERLAY,
  HIDE_IMAGE_COMPANY_OVERLAY
} from '../../types';

export default (state, action) => {
  switch(action.type) {
    case GET_NOTES_COMPANY:
      return {
        ...state,
        notesCompany: action.payload,
        loadingCompany: false
      }
    case ADD_NOTE_COMPANY:
      return {
        ...state,
        notesCompany: [...state.notesCompany, action.payload],
        loadingCompany: true
      }
    case UPDATE_NOTE_COMPANY:
      return {
        ...state,
        notesCompany: state.notesCompany.map(note => note._id === action.payload.id ? action.payload : note)
      }
    case DELETE_NOTE_COMPANY:
      return {
        ...state,
        notesCompany: state.notesCompany.filter(note => note._id !== action.payload.id),
        deleteNoteCompanySuccess: action.payload.message
      }
    case HIDE_ERROR_COMPANY_NOTES:
      return {
        ...state,
        deleteNoteCompanySuccess: null,
        noteCompanyMsg: null
      }
    case CLEAN_NOTES_COMPANY:
      return {
        ...state,
        notesCompany: action.payload
      }
    case UPDATE_COORDINATE_NOTES_COMPANY:
      return {
        ...state,
        notesCompany: state.notesCompany.map(note => note._id === action.payload ? action.payload : note)
      }
    case SHOW_ERROR_COMPANY_NOTES:
      return {
        ...state,
        noteCompanyMsg: action.payload
      }
    case SHOW_IMAGE_COMPANY_OVERLAY:
      return {
        ...state,
        imageCompanyOverlay: true
      }
    case HIDE_IMAGE_COMPANY_OVERLAY:
      return {
        ...state,
        imageCompanyOverlay: false
      }
    default:
      return state
  }
}