import React, { useContext, useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import moment from 'moment';
import 'moment/locale/es';
import { Rnd } from 'react-rnd';
//Components
import ImageOverlay from '../ImageOverlay/ImageOverlay';
import ImageThumb from '../ImageThumb/ImageThumb';
import Dropzone from '../Dropzone/Dropzone';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import DropdownNote from '../DropdownNote/DropdownNote';
import Textarea from '../Textarea/Textarea';
//Hooks
import { useTranslation } from "react-i18next";
//icons
import { FaMicrophoneAlt, FaRegStopCircle, FaHistory } from 'react-icons/fa'
//Context
import NoteContext from '../../context/notes/noteContext';
import NotesCompanyContext from '../../context/notesCompany/notesCompanyContext';
import organizationContext from '../../context/organizations/organizationContext';
//Styles
import './Note.css'
//utils
import VoiceRecognition from '../../utils/VoiceRecognition'



const Note = ({ note, noteList, handleList, isCompany }) => {
  //State
  const [showMarkdown, setShowMarkdown] = useState(true);
  const [noteValues, setNoteValues] = useState({});

  useEffect(() => {
    setNoteValues(note);
  }, [note])

  //Context
  const noteContext = useContext(NoteContext);
  const { updateNote, deleteNote, imageOverlay, updateCoordinates } = noteContext;
  const notesCompanyContext = useContext(NotesCompanyContext);
  const { updateCompanyNote, updateCoordinatesCompanyNotes, deleteCompanyNote } = notesCompanyContext;
  const OrganizationContext = useContext(organizationContext);
  const { actualOrganization } = OrganizationContext;
  //Hooks
  const { t } = useTranslation();
  const saveNote = e => {
    const noteId = e.target.closest("form").id;
    updateNote(noteId, { title: noteValues.title, description: noteValues.description }, 'update');
  }
  const { transcript, isListening, validatorSpeech, setIsListening, resetTranscript } = VoiceRecognition(noteValues.description, setNoteValues);

  const removeNote = id => {
    if (deleteNote) {
      const newList = noteList.filter(n => n._id !== id);
      handleList(newList);
    }
    deleteNote(id, 'delete');
  }

  const backgroundNote = note.status === 'completed' ? 'note_active' : null;

  return (
    <>
      {
        imageOverlay ?
          <ImageOverlay image={note.image} /> : null
      }
      <Rnd
        default={isCompany
          ? null
          : {
            x: note.ejeX,
            y: note.ejeY
          }
        }
        onDragStop={(e, d) => {
          if (d.x > 0 && d.y > 0) {
            if (isCompany) {
              updateCoordinatesCompanyNotes(note._id, { ejeX: d.x, ejeY: d.y, organization: actualOrganization._id })
            } else {
              updateCoordinates(note._id, { ejeX: d.x, ejeY: d.y }, 'updateCoordinates')
            }
          }
        }}
        disableDragging={!showMarkdown}
      >
        <form onBlur={saveNote} id={note._id} className={`note ${backgroundNote}`}>
          <DropdownNote
            options={isCompany ? ['announcement', 'birthday'] : ['active', 'completed']}
            updateNote={isCompany ? updateCompanyNote : updateNote}
            removeNote={isCompany ? deleteCompanyNote : removeNote}
            noteId={note._id}
            organizationId={isCompany && actualOrganization ? actualOrganization._id : null}
          />
          <div className='note_cnt'>
            <Textarea
              name='title'
              isResize="true"
              maxLength="30"
              placeholder={t("NoteTitlePlaceholder")}
              showMarkdown={showMarkdown}
              setShowMarkdown={setShowMarkdown}
              handleOnChange={setNoteValues}
              noteValues={noteValues}

            />
            <div className="d-flex justify-content-between">
              <p
                className='subtitle  description-size'
                placeholder={t("NoteSubTitlePlaceholder")}
              >Descripción</p>
              {!validatorSpeech ? null : <>
                <div className="mb-3">
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">grabar</Tooltip>}>
                    <button className="mic border-0 bg-transparent my-auto text-info" data-toggle="tooltip" data-placement="right"
                      onClick={(e) => { e.preventDefault(); setIsListening(prevState => !prevState) }}
                      disabled={!note}>{isListening ? <FaRegStopCircle /> : <FaMicrophoneAlt />}</button>
                  </OverlayTrigger>


                  {/* <button className="mic border-0 bg-transparent my-auto text-danger" data-toggle="tooltip" data-placement="right"
                    onClick={(e) => { e.preventDefault(); resetTranscript(); setNoteValues({ ...noteValues, description: '' }) }}>Reescribir <FaHistory /> </button> */}
                </div>
              </>
              }
            </div>
            <div
              onBlur={() => setShowMarkdown(!showMarkdown)}
              onClick={() => setShowMarkdown(false)}
              onTouchStart={() => setShowMarkdown(false)}
            >
              {showMarkdown && noteValues.description ? (
                <div className="d-flex flex-column">
                  <ReactMarkdown className="font-size text-ellipsis markdown-size" source={noteValues.description} />
                  {note.image && <ImageThumb image={note.image} id={note._id} />}
                </div>
              ) : (
                  <>
                    <Textarea
                      handleOnChange={setNoteValues}
                      noteValues={noteValues}
                      maxLength="300"
                      placeholder={t("NoteDescriptionPlaceholder")}
                      classes="cnt"
                      value={noteValues.description || transcript}
                      name="description"
                      showMarkdown={showMarkdown}
                      setShowMarkdown={setShowMarkdown}
                    />
                    {note.image ? <ImageThumb image={note.image} id={note._id} /> : <Dropzone handleOnClick={() => setShowMarkdown(false)} id={note._id} />}
                  </>
                )}
            </div>
          </div>
          <small className='small_time'>
            {t("LastModified")}{" "}
            {moment(note.updateDate).locale('es').fromNow()}
          </small>
        </form>
      </Rnd>
    </>
  );
}

export default Note;