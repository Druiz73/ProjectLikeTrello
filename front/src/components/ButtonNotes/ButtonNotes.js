import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdAdd as AddIcon } from "react-icons/io";
//Context
import organizationContext from '../../context/organizations/organizationContext';
//Styles
import './ButtonNotes.css';

const ButtonNotes = ({ id, loading, addNote, filter, isCompany }) => {

  const OrganizationContext = useContext(organizationContext);
  const { actualOrganization } = OrganizationContext;
  
  return (
    <Button
      id={id}
      className="addButton button-tooltip mb-2 add-note bg-info"
      disabled={loading ? true : false}
      onClick={() => {
        if(isCompany) {
          if(actualOrganization) {
            addNote(actualOrganization._id)
          }
        } else {
          addNote()
        }
        filter('all')
      }}
    >
      {!loading ?
        <AddIcon size="1.5rem" color="white" />
        : <span className="spinner-grow spinner-grow-sm"></span>
      }
    </Button>
  );
}
 
export default ButtonNotes;