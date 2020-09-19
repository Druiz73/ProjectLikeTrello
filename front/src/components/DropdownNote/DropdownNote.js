import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { capitalizeText } from '../../utils/handleText';
import { BsReplyAllFill } from 'react-icons/bs';

const DropdownNote = ({ options, updateNote, removeNote, noteId, organizationId, status }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="d-flex justify-content-end align-items-center">
       { status === 'shareable' && <BsReplyAllFill />}
      <Dropdown focusFirstItemOnShow>
        <Dropdown.Toggle 
          className="note_header_dropdown note_dropdown_list"
          onTouchStart={() => setShow(true)}
        >
          ...
          <Dropdown.Menu className={`note_header_dropdown_menu ${show ? show : null}`}>
            {
              options.map((option, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    eventKey={option}
                    onSelect={() => {updateNote(noteId,  {status: option }, 'update')}}
                    onTouchStart={() => { updateNote(noteId, { status: option }, 'update') }}
                  >
                    {capitalizeText(option)}
                  </Dropdown.Item>
                )
              })
            }
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>
      <span
        onTouchStart={() => removeNote(noteId, organizationId)}
        onClick={() => removeNote(noteId, organizationId)}
        className='button remove'
      >
        X
      </span>
    </div>
  );
}
 
export default DropdownNote;