import React, { useReducer } from 'react';
import clientAxios from '../../config/clientAxios';
import ProjectsContext from './projectsContext';
import projectsReducer from './projectsReducer';
import {
  GET_PROJECT_LIST,
  GET_PROJECT_BY_ID,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  LEAVE_PROJECT,
  DELETE_PROJECT,
  CLEAR_PROJECT_MSG,
  CREATE_MEETING,
  GET_ROOMS_LIST,
  GET_ROOM,
  GET_MEETINGS_REMINDER,
  CLEAN_ROOM,
  ROOM_DENIED,
  DELETE_MEETING
} from '../../types';

const ProjectsState = ({ children }) => {

  const INITIAL_STATE = {
    projects: [],
    project: null,
    errors: null,
    projectMsg: null,
    newProject: null,
    newMeeting: null,
    roomList: [],
    actualRoom: null,
    meetings:[],
    meetingError: null,
  }

  const [state, dispatch] = useReducer(projectsReducer, INITIAL_STATE);

  const GetProjectList = async id => {
    try {
      const response = await clientAxios.get(`/organization/${id}/projects`);
      dispatch({
        type: GET_PROJECT_LIST,
        payload: response.data
      })
    }
    catch (error) {
      console.log(error.response);
    }
  }

  const getProjectById = async id => {
    try {
      const response = await clientAxios.get(`/projects/${id}`);
      dispatch({
        type: GET_PROJECT_BY_ID,
        payload: response.data
      })
      clearProjectMsg();
    } catch (error) {
      console.log(error.response);
    }
  }

  const createProject = async data => {
    try {
      const response = await clientAxios.post('/projects', data);
      dispatch({
        type: CREATE_PROJECT,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const updateProject = async (id, idUser, data, typeUpdate) => {
    try {
      const response = await clientAxios.put(`/projects/${id}`, { idUser, data, typeUpdate });
      dispatch({
        type: UPDATE_PROJECT,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const leaveProject = async (id, idUser,typeUpdate) => {
    try {
      const response = await clientAxios.put(`/projects/${id}`, { idUser, typeUpdate });
      dispatch({
        type: LEAVE_PROJECT,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response)
    }
  }
  
  const deleteProject = async (id, idUser, typeUpdate) => {
    try {
      const response = await clientAxios.put(`/projects/${id}`, { idUser, typeUpdate });
      dispatch({
        type: DELETE_PROJECT,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const clearProjectMsg = () => {
    dispatch({
      type: CLEAR_PROJECT_MSG,
      payload: null
    })
  }

  const createMeeting = async data => {
    try {
      const response = await clientAxios.post('/addRoom', data);
      dispatch({
        type: CREATE_MEETING,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  const getRoomsList = async projectId => {
    try {
      const response = await clientAxios.get(`/user/listRoomsInProject/${projectId}`);
      dispatch({
        type: GET_ROOMS_LIST,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getActualRoom = async roomId => {
    try {
      const response = await clientAxios.get(`RoombyId/${roomId}`);
      dispatch({
        type: GET_ROOM,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const getMeetings = async userId => {
    try {
      const response = await clientAxios.get(`/searchMyRooms/${userId}`)
      dispatch({
        type: GET_MEETINGS_REMINDER,
        payload: response.data
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const saveMeeting = async daily => {
    try {
      await clientAxios.post('/addDailyInfo', daily);
      dispatch({
        type: CLEAN_ROOM
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const cleanRoom = () => {
    dispatch({
      type: CLEAN_ROOM,
      payload: null
    })
  }

  const getMeetingError = error => {
    dispatch({
      type: ROOM_DENIED,
      payload: error
    })
  }
  
  const deleteMeeting = async id => {
    try {
      const response = await clientAxios.put(`/deleteRoom/${id}`)
      dispatch({
        type: DELETE_MEETING,
        payload:  {
          id,
          message: response.data
        }
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        errors: state.errors,
        projectMsg: state.projectMsg,
        newProject: state.newProject,
        newMeeting: state.newMeeting,
        roomList: state.roomList,
        actualRoom: state.actualRoom,
        meetings: state.meetings,
        meetingError: state.meetingError,
        GetProjectList,
        createProject,
        getProjectById,
        updateProject,
        leaveProject,
        deleteProject,
        clearProjectMsg,
        createMeeting,
        getRoomsList,
        getActualRoom,
        getMeetings,
        cleanRoom,
        getMeetingError,
        deleteMeeting,
        saveMeeting
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsState;