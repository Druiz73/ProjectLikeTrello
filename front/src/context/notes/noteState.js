import React, { useReducer } from 'react';
import clientAxios from '../../config/clientAxios';
import NoteContext from './noteContext';
import NoteReducer  from './noteReducer';
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
const NoteState = ({ children }) => {
  const initialState = {
    notes: [],
    noteMsg: false,
    loading: false,
    hasPhoto: false,
    imageOverlay: false,
    deleteSuccess: ''
  };

  const [state, dispatch] = useReducer(NoteReducer, initialState);

  const getNotes = async () => {
    try {
      const response = await clientAxios.get('/notes');
      dispatch({
        type: GET_NOTES,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const addNote = async data => {
    try {
      const response = await clientAxios.post('/notes', data);
      dispatch({
        type: ADD_NOTE,
        payload: response.data.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const updateNote = async (id, { title, description, image, status }, typeUpdate) => {
    try {
      const response = await clientAxios.put(`notes/${id}`, { title, description, image, status, typeUpdate });
      dispatch({
        type: UPDATE_NOTE,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const deleteNote = async (id, typeUpdate) => {
    try {
      const response = await clientAxios.put(`/notes/${id}`, { typeUpdate });
      dispatch({
        type: DELETE_NOTE,
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
        type: HIDE_ERROR_NOTE
      })
    }, 3000)
  }

  const cleanNotes = () => {
    dispatch({
      type: CLEAN_NOTES,
      payload: []
    })
  }

  const updateCoordinates = async (noteId, { ejeX, ejeY }, typeUpdate) => {
    try {
      const response = await clientAxios.put(`/notes/${noteId}`, { ejeX, ejeY, typeUpdate });
      dispatch({
        type: UPDATE_COORDINATE,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const showImageOverlay = () => {
    dispatch({
      type: SHOW_IMAGE_OVERLAY
    })
  }

  const hideImageOverlay = () => {
    dispatch({
      type: HIDE_IMAGE_OVERLAY
    })
  }

  const showErrorNote = msg => {
    dispatch({
      type: SHOW_ERROR_NOTE,
      payload: msg
    })
    setTimeout(() => {
      dispatch({
        type: HIDE_ERROR_NOTE
      })
    }, 3000)
  }

  return(
    <NoteContext.Provider
      value={{
        notes: state.notes,
        noteMsg: state.noteMsg,
        loading: state.loading,
        hasPhoto: state.hasPhoto,
        imageOverlay: state.imageOverlay,
        deleteSuccess: state.deleteSuccess,
        getNotes,
        addNote,
        updateNote,
        deleteNote,
        cleanNotes,
        updateCoordinates,
        showImageOverlay,
        hideImageOverlay,
        showErrorNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
 
export default NoteState;