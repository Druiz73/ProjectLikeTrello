import React, { useReducer } from 'react';
import notesCompanyContext from './notesCompanyContext';
import notesCompanyReducer from './notesCompanyReducer';
import clientAxios from '../../config/clientAxios';
import { 
  GET_NOTES_COMPANY,
  ADD_NOTE_COMPANY,
  UPDATE_NOTE_COMPANY,
  DELETE_NOTE_COMPANY,
  UPDATE_COORDINATE_NOTES_COMPANY,
  CLEAN_NOTES_COMPANY,
  SHOW_ERROR_COMPANY_NOTES,
  HIDE_ERROR_COMPANY_NOTES,
  SHOW_IMAGE_COMPANY_OVERLAY,
  HIDE_IMAGE_COMPANY_OVERLAY
} from '../../types';

const NotesCompanyState = ({ children }) => {
  const INITIAL_STATE = {
    notesCompany: [],
    noteCompanyMsg: '',
    loadingCompany: false,
    hasNoteCompanyPhoto: false,
    imageCompanyOverlay: false,
    deleteNoteCompanySuccess: ''
  };

  const [state, dispatch] = useReducer(notesCompanyReducer, INITIAL_STATE);

  const getCompanyNotes = async id => {
    try {
      const response = await clientAxios.get(`/organization/${id}/companyNotes`);
      dispatch({
        type: GET_NOTES_COMPANY,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const createCompanyNotes = async organization => {
    try {
      const response = await clientAxios.post('/companyNotes', { organization });
      dispatch({
        type: ADD_NOTE_COMPANY,
        payload: response.data.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const updateCompanyNote = async (id, organization, type) => {
    try {
      const response = await clientAxios.put(`/companyNotes/${id}`, { organization, typeUpdate: type});
      dispatch({
        type: UPDATE_NOTE_COMPANY,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const deleteCompanyNote = async (id, organization) => {
    try {
      const response = await clientAxios.put(`/companyNotes/${id}`, { organization, typeUpdate: 'delete' });
      dispatch({
        type: DELETE_NOTE_COMPANY,
        payload: {
          id,
          message: response.data.message
        }
      })
    } catch (error) {
      console.log(error.response);
    }
    setTimeout(() => {
      dispatch({
        type: HIDE_ERROR_COMPANY_NOTES
      })
    }, 3000)
  }

  const cleanNotesCompany = () => {
    dispatch({
      type: CLEAN_NOTES_COMPANY,
      payload: []
    })
  }

  const updateCoordinatesCompanyNotes = async (id, {ejeX, ejeY, organization}) => {
    try {
      const response = await clientAxios.put(`/companyNotes/${id}`, { organization, ejeX, ejeY, typeUpdate: 'updateCoordinates'});
      dispatch({
        type: UPDATE_COORDINATE_NOTES_COMPANY,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const showErrorCompanyNote = msg => {
    dispatch({
      type: SHOW_ERROR_COMPANY_NOTES,
      payload: msg
    })
    setTimeout(() => {
      dispatch({
        type: HIDE_ERROR_COMPANY_NOTES
      })
    }, 3000)
  }

  const showNoteCompanyImage = () => {
    dispatch({
      type: SHOW_IMAGE_COMPANY_OVERLAY
    })
  }

  const hideNoteCompanyImage = () => {
    dispatch({
      type: HIDE_IMAGE_COMPANY_OVERLAY
    })
  }


  return (
    <notesCompanyContext.Provider
      value={{
        notesCompany: state.notesCompany,
        noteCompanyMsg: state.noteCompanyMsg,
        loadingCompany: state.loadingCompany,
        hasNoteCompanyPhoto: state.hasNoteCompanyPhoto,
        imageCompanyOverlay: state.imageCompanyOverlay,
        deleteNoteCompanySuccess: state.deleteNoteCompanySuccess,
        getCompanyNotes,
        createCompanyNotes,
        updateCompanyNote,
        deleteCompanyNote,
        cleanNotesCompany,
        updateCoordinatesCompanyNotes,
        showErrorCompanyNote,
        showNoteCompanyImage,
        hideNoteCompanyImage
      }}
    >
      {children}
    </notesCompanyContext.Provider>
  );
}
 
export default NotesCompanyState;

