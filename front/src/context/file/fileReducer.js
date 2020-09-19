import {
  HIDE_ERROR_IMAGE,
  SHOW_ERROR_IMAGE,
  UPLOADING_IMAGE,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_SUCCESS
} from '../../types';

export default (state, action) => {
  switch(action.type) {
    case SHOW_ERROR_IMAGE:
      return {
        ...state,
        message: action.payload
      }
    case HIDE_ERROR_IMAGE:
      return {
        ...state,
        message: null
      }
    case UPLOADING_IMAGE:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.payload,
        loading: false
      }
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    default:
      return state
  }
}