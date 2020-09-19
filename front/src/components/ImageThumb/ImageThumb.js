import React, { useContext } from 'react';
import './ImageThumb.css'
import noteContext from '../../context/notes/noteContext';
import { storage } from '../../firebase';

const ImageThumb = ({ image, id }) => {

  const NoteContext = useContext(noteContext);
  const { showImageOverlay, updateNote } = NoteContext;

  const deleteNote = () => {
    updateNote(id, { image: ''}, 'update')
  }

  return (
    <div className="note-img-container">
      <span onClick={deleteNote} className="button btn-close-img">
        X
      </span>
      <div onClick={showImageOverlay} className="note-img">
        <img src={image} />
      </div>
    </div>
  );
}
 
export default ImageThumb;