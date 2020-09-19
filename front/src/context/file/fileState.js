import React, { useReducer } from 'react';
import fileContext from './fileContext';
import fileReducer from './fileReducer';

import {
  UPLOADING_IMAGE,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  SHOW_ERROR_IMAGE,
  HIDE_ERROR_IMAGE
} from '../../types';

const FileState = ({ children }) => {
  const initialState = {
    loading: false,
    message: null,
    image: null
  }

  const [state, dispatch] = useReducer(fileReducer, initialState);
  
  const showAlert = msg => {
    dispatch({
      type: SHOW_ERROR_IMAGE,
      payload: msg
    })
    setTimeout(() => {
      dispatch({
        type: HIDE_ERROR_IMAGE
      })
    }, 3000)
  }

  const loadingImage = () => {
    dispatch({
      type: UPLOADING_IMAGE
    })
  }

  const uploadImage = file => {
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: file
    })
    if(!file) {
      dispatch({
        type: UPLOAD_IMAGE_ERROR,
        payload: 'No se pudo subir la imagen'
      })
    }
  }

  return(
    <fileContext.Provider
      value={{
        loading: state.loading,
        image: state.image,
        message: state.message,
        showAlert,
        uploadImage,
        loadingImage
      }}
    >
      { children}
    </fileContext.Provider>
  )
}

export default FileState