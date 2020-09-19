import React, { useContext } from 'react';
import noteContext from '../../context/notes/noteContext';
import './ImageOverlay.css'

const ImageOverlay = ({ image }) => {
  const NoteContext = useContext(noteContext);
  const { hideImageOverlay } = NoteContext;
  return (
    <div className="image-overlay">
      <div className="close-btn-container">
        <span onClick={hideImageOverlay} className="close-btn">X</span>
      </div>
        <div className="image-container">
          <img src={image} alt="Test" />
        </div>
    </div>
  );
}
 
export default ImageOverlay;