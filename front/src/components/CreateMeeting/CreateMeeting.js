import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import useForm from "../../hooks/useForm";
import projectsContext from "../../context/projects/projectsContext";
import notificationsContext from '../../context/notifications/notificationsContext';
import { validateMeeting } from "../../utils/validateForm";
import AlertMsg from "../AlertMsg/AlertMsg";
import { useTranslation } from "react-i18next";
import './CreateMeeting.css';
import moment from "moment-timezone";
import { tr } from 'date-fns/locale';

const INITIAL_STATE = {
  nameRoom: '',
  initHourOfDaily: '',
};

const CreateMeeting = () => {
  let hora = moment().format("HH:mm");
  //Translator
  const { t, i18n } = useTranslation();
  //States
  const [dayOfDaily, setDays] = useState([1, 2, 3, 4, 5]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Hubo un error');
  const [errorVar, setErrorVar] = useState('danger');
  const [isLoading, setLoading] = useState(false);

  //Modal show and hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //When the user opens the form
  const OpenForm = () => {
    setLoading(false);
    cleanForm();
    setError(false);
    handleShow();
  }
  //Context
  const NotificationsContext = useContext(notificationsContext);
  const { updateReminders, showNextMeeting } = NotificationsContext;
  const projContext = useContext(projectsContext);
  const { project, createMeeting, newMeeting, getMeetings } = projContext;
  let members = project.members.map((u) => u._id);
  let projectId = project._id;
  
  //UseForm
  const { values, handleOnChange, handleOnSubmit, cleanForm } = useForm(
    INITIAL_STATE,
    validateMeeting,
    create);
  const { nameRoom, initHourOfDaily } = values;
  
  //Create Meeting
  async function create() {
    try {
      if(dayOfDaily.length > 0){
        setLoading(true);
        setError(false);
        const timeZone = moment.tz.guess();
        createMeeting({ nameRoom, initHourOfDaily, members, dayOfDaily, projectId,timeZone });
        getMeetings();
        showNextMeeting(true);
      } else {
        setErrorMsg("Es necesario al menos un día de reunión");
        setErrorVar("danger")
        setError(true);

      }
    } catch (error) {
      console.log("Ocurrió un error");
    }
  }

  //Handles the checkboxes
  const handleDay = e => {
    let num = parseInt(e.target.value);
    let newDays = dayOfDaily;
    let hasDay = dayOfDaily.find(d => d===num);
    //This handles the click on the day Saturday
    if(e.target.value===6 || e.target.value===7){
      if (hasDay===6 || hasDay===7){ 
        newDays = dayOfDaily.filter(d=> d!==hasDay);
        setDays(newDays);
      } else {
        setDays([...dayOfDaily]);
      }
    }
    //This handles days from Mon to Fri
    if (hasDay === undefined){
      newDays.push(num);
      setDays([...dayOfDaily]);
    } else {
      newDays = dayOfDaily.filter(d=> d!==hasDay);
      setDays(newDays);
    }
  }

  //This shows Success or Error messages depending on the backend response
  useEffect(() => {
    if (newMeeting) {
        if (newMeeting.message === "The Room already exists!") {
            setErrorMsg("Ya tiene una sala con ese nombre");
            setErrorVar("danger")
            setError(true);
            setLoading(false);
        } else if (newMeeting.active) {
            setErrorMsg("Sala creada exitosamente");
            setErrorVar("success");
            setError(true);
            setTimeout(() => {
              handleClose();
              getMeetings();
            }, 1500);
        }
    }
}, [newMeeting]);

  return (
    <Fragment>
      <Button block variant="success" onClick={OpenForm}>
      {t("NewMeeting")}
        </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleOnSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {t("NewMeeting")}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row>
                <Col xs={12} sm={8} md={8} lg={8}>
                  <Form.Group>
                    <Form.Label className="text-muted">{t("RoomName")}</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength="30"
                      name="nameRoom"
                      value={nameRoom}
                      onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4} md={4} lg={4}>
                  <Form.Group>
                    <Form.Label className="text-muted">{t("Hour")}</Form.Label>
                    <Form.Control
                      required
                      type="time"
                      name="initHourOfDaily"
                      value={initHourOfDaily}
                      onChange={handleOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Label className="text-muted">{t("MeetingDays")}</Form.Label>
              <Row className="weekDays-selector d-flex justify-items-center mb-3">
                <Form.Check type="checkbox" id="mon" name="dayOfDaily" value={1} onChange={handleDay} label={t("Mon")} defaultChecked />
                <Form.Check type="checkbox" id="tue" name="dayOfDaily" value={2} onChange={handleDay} label={t("Tue")} defaultChecked />
                <Form.Check type="checkbox" id="wed" name="dayOfDaily" value={3} onChange={handleDay} label={t("Wed")} defaultChecked />
                <Form.Check type="checkbox" id="thu" name="dayOfDaily" value={4} onChange={handleDay} label={t("Thu")} defaultChecked />
                <Form.Check type="checkbox" id="fri" name="dayOfDaily" value={5} onChange={handleDay} label={t("Fri")} defaultChecked />
                <Form.Check type="checkbox" id="sat" name="dayOfDaily" value={6} onChange={handleDay} label={t("Sat")} />
                <Form.Check type="checkbox" id="sun" name="dayOfDaily" value={7} onChange={handleDay} label={t("Sun")} />
              </Row>
              {error && (errorVar === "danger") ? <AlertMsg text={errorMsg} variant={errorVar} /> : null}
              {error && (errorVar === "success") ?
                  <AlertMsg text={errorMsg} variant={errorVar} />
                : null
              }
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button disabled={isLoading} variant="success" type='submit'>
            {isLoading?"Creando...": t("Create")}
                </Button>
            <Button variant="secondary" onClick={handleClose}>
            {t("Cancel")}
                </Button>
          </Modal.Footer>

        </Form>
      </Modal>
    </Fragment>
  );
}

export default CreateMeeting;