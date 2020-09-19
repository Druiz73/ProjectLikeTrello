import React, { useContext } from 'react';
import { RiAlertLine as AlertIcon } from 'react-icons/ri';
import { withRouter } from 'react-router-dom';
import projectContext from '../../context/projects/projectsContext';

//Styles
import './LargeModal.css';

const LargeModal = ({ text, history, buttonText, isDaily }) => {

  const ProjectContext = useContext(projectContext);
  const { cleanRoom } = ProjectContext;

  const exitMeeting = () => {
    cleanRoom();
    history.goBack();
  }

  const goLogin = () => {
    history.push('/login')
  }

  return (
    <div className="overlay-modal">
      <div className="large-modal-container px-3 py-3 rounded">
        <div className="large-modal-content">
          <AlertIcon size="6em" />
          <p className="large-modal-text text-center mb-2">{text}</p>
        </div>
        <div className="large-modal-btn-container">
          <button 
            onClick={isDaily ? exitMeeting : goLogin } 
            className="btn btn-primary"
          >{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
 
export default withRouter(LargeModal);