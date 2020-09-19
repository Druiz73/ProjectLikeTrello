import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import moment from "moment-timezone";
import { Prompt } from 'react-router-dom';
//Context
import ProjectsContext from '../../context/projects/projectsContext';
import AuthContext from '../../context/auth/authContext';
import OrganizationContext from '../../context/organizations/organizationContext'
//Components
import { Container, Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Countdown from '../Countdown/Countdown';
import Canva from '../Canva/Canva';
import DailyCard from '../DailyCard/DailyCard';
import DailyCheckbox from '../DailyCheckbox/DailyCheckbox';
import LargeModal from '../LargeModal/LargeModal';
import Jitsi from '../Jitsi/Jitsi';
import { MdCall, MdCallEnd } from 'react-icons/md'
//Styles
import './DailyRoom.css';
import { roundToNearestMinutes } from 'date-fns';


let socket;

const DailyRoom = ({ match, history }) => {
  let timeofentry = moment(Date.now())._d;
  let disabledBtn;
  let initHourDaily;
  let finishTimeDaily;
  let init;
  let timeZone;
  //Context
  const projectsContext = useContext(ProjectsContext);
  const { actualRoom, getActualRoom, cleanRoom, getMeetingError, meetingError, saveMeeting } = projectsContext;
  const authContext = useContext(AuthContext);
  const { user, user: { email } } = authContext;
  const organizationContext = useContext(OrganizationContext);
  const { actualOrganization } = organizationContext;
  const { t } = useTranslation();
  const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
  const [usersList, setUsersList] = useState([]);
  const [dailyNote, setDailyNote] = useState({
    userId: user._id,
    roomId: match.params.id,
    yesterday: '',
    today: '',
    blocked: '',
    pending: '',
    checked: false,
    timeofentry: timeofentry
  });

  const [messages, setMessages] = useState([{
    userId: user._id,
    roomId: match.params.id,
    yesterday: '',
    today: '',
    blocked: '',
    pending: '',
    checked: false
  }]);

  const [daily, setDaily] = useState({
    roomId: null,
    initDaily: moment(Date.now()).d,
    finishDaily: moment(Date.now()).d,
    participantsDaily: []
  })
  const [allMessages, setAllMessages] = useState([]);
  const [finishMessage, setFinishMessage] = useState('');
  const [leftPage, setLeftPage] = useState(false);
  const [finishTime, setFinishTime] = useState(false);
  const [onCall, setOnCall] = useState(false)
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  if (actualRoom) {
    disabledBtn = actualRoom.createBy !== user._id;
    init = moment.tz(actualRoom.initHourOfDaily, 'HH:mm', actualRoom.timeZone);
    timeZone = moment.tz.guess();
    initHourDaily= init.clone().tz(timeZone).format();
    finishTimeDaily = moment(initHourDaily).add(15, 'm')._d;
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    if (!actualRoom) {
      getActualRoom(match.params.id);
    } else {
      const timeZone = moment.tz.guess();
      socket.emit('joinRoom', { email, actualRoom, userId: user._id,timeZone }, error => {
        if (error) {
          getMeetingError(error);
        }
      });
    }

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [actualRoom, ENDPOINT]);

  useEffect(() => {
    socket.on('roomData', ({ users, messages }) => {
      setUsersList(users);
      if (messages) {
        setMessages(messages);
        const myMessage = messages.find(message => message.userId === user._id);
        if (myMessage !== undefined) {
          setDailyNote(myMessage);
        }
      }
    });
    socket.on('otherMessages', userMessages => {
      let newArray = userMessages.filter(user => user.userId !== user._id);
      setMessages(newArray);
    });

    socket.on('allMessages', messages => {
      setAllMessages(messages);
    })

    socket.on('finishAll', ({ finish, message }) => {
      setLeftPage(false);
      setFinishMessage(message);
    })

    if (finishTime && finishMessage === '') {
      socket.emit('endTime', ({ userId: user._id }))
      finishRoom();
      setFinishTime(false);
    }
    socket.on('sendAllFinishTime', ({ message }) => {
      setLeftPage(false);
      setFinishMessage(message);
    })

  }, [usersList, actualRoom, finishTime])

  const writingDaily = e => {
    setLeftPage(true);
    setDailyNote({
      ...dailyNote,
      checked: true
    })
    socket.emit('sendMessage', ({ dailyNote, userId: user._id }), error => {
      if (error) {
        console.log(error);
      }
    })
  }

  function finishRoom(isClicked) {
    const finishDaily = moment(Date.now())._d;
    const daily = {
      roomId: match.params.id,
      initDaily: initHourDaily,
      finishDaily,
      participantsDaily: allMessages
    }
    saveMeeting(daily);
    if (isClicked) {
      socket.emit('finishDaily', { userId: user._id, finish: true })
      history.push(`/dashboard/${actualOrganization._id}`);
    }
  }

  function startCall() {
    setName(user.email);
    setRoom(actualRoom._id);
    setOnCall(true);
  }

  return (
    <Container fluid className="h-100 my-3">
      {
        disabledBtn &&
        <Prompt when={leftPage} message="¿Desea abandonar la página?" />
      }
      {onCall &&
        <Row className="justify-content-center">
          <Jitsi onCall={onCall} setOnCall={setOnCall} name={name} room={room}/>
        </Row>
      }
      <Row>
        {meetingError && !finishMessage && <LargeModal isDaily text={meetingError} buttonText={t("RoomBackModalBtn")} />}
        {finishMessage ? <LargeModal isDaily text={finishMessage} buttonText={t("RoomBackModalBtn")} /> : null}
        <Col>
          <Card>
            <Card.Header className="text-center d-flex align-items-center">
              <Col xs={1}>
              {onCall ?
                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Colgar</Tooltip>}>
                  <Button variant="danger" onClick={() => setOnCall(false)}><MdCallEnd size="1.5rem" /></Button>
                </OverlayTrigger>
                :
                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Unirse a videollamada</Tooltip>}>
                  <Button variant="success" onClick={startCall}><MdCall size="1.5rem" /></Button>
                </OverlayTrigger>
              }</Col>
              <Col  xs={11} className="d-flex justify-content-center">
              Daily Meeting
              </Col>
            </Card.Header>
            <div className="p-2">
              <div className="d-flex justify-content-center align-items-center">
                <p className="mx-2 my-0">{t("TimeLeftDaily")} </p>
                <Countdown
                  isDaily
                  timeRemaining={finishTimeDaily && finishTimeDaily}
                  finishDailyAction={setFinishTime}
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-9 d-flex justify-content-between align-items-center flex-wrap">
                  {usersList.length > 0 ?
                    usersList.map(u => {
                      return (
                        <DailyCheckbox
                          key={u.userId}
                          user={u}
                          checked={u.userId === user._id ? dailyNote.checked : false}
                          handleOnChange={setDailyNote}
                        />
                      )
                    })
                    :
                    (<p className="text-center m-0">Todavía no hay usuarios</p>)
                  }
                </div>
                <Button
                  onClick={() => finishRoom(true)}
                  type="button"
                  className="mx-auto"
                  size="sm"
                  variant="danger"
                  disabled={disabledBtn}
                >{t("FinishBtn")}</Button>
              </div>
            </div>
            <Card.Body>
              <Canva isDaily>
                <h1 className="text-center">Daily Meeting</h1>
                <div className="d-flex align-items-center flex-wrap">
                  {
                    usersList.length > 0 ?
                      (usersList.map(u =>
                        <DailyCard
                          isMine={u.userId === user._id ? true : false}
                          key={u.userId}
                          user={u}
                          values={u.userId === user._id ? dailyNote : messages.find((m) => m.userId === u.userId)}
                          handleOnchange={setDailyNote}
                          sendDaily={writingDaily}
                        />
                      )) :
                      (<p className="text-center">No ingresaron usuarios a la daily </p>)
                  }
                </div>
              </Canva>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyRoom;
