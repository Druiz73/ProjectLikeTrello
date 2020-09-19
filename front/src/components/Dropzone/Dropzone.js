import React, { useCallback, useContext } from 'react';
import { storage } from '../../firebase';
import { useDropzone } from 'react-dropzone';
//Styles
import './Dropzone.css';
//Context
import noteContext from '../../context/notes/noteContext';
import fileContext from '../../context/file/fileContext';

const Dropzone = ({ id }) => {
  const NoteContext = useContext(noteContext);
  const { updateNote } = NoteContext;

  const FileContext = useContext(fileContext);
  const { loadingImage, showAlert, uploadImage, loading, message } = FileContext;

  const onDrop = useCallback((acceptedFiles) => {
    if(acceptedFiles[0]) {
      const uploadTask = storage.ref(`images/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          loadingImage();
        },
        error => {
          console.log(error);
          showAlert(error);
        },
        () => {
          storage
            .ref("images")
            .child(acceptedFiles[0].name)
            .getDownloadURL()
            .then(url => {
              uploadImage(url);
              updateNote(id, { image: url }, 'update');
            });
        }
      );
    }
  }, []);

  const { getRootProps,
          getInputProps, 
          isDragActive,
          acceptedFiles,
          open,
          fileRejections } = useDropzone({ 
            onDrop, 
            accept: 'image/*',
            minSize: 0,
            maxSize: 1000000,
          });

  return (
    <>
      {fileRejections.length > 0 ?
        <p className="instruction-text small text-center">{fileRejections[0].errors[0].message}</p> :
        null
      }
      {message &&
        <p className="instruction-text small text-center">{message}</p>
      }
      <div onClick={open} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
              isDragActive ? 
                <p className="text-center instruction-text m-0">Arrastre su foto aquí</p> :
                <p className="text-center instruction-text m-0 py-2">Arrastre una foto</p>
            )
        }
      </div>
    </>
  );
}
 
export default Dropzone;