import React, { useContext, useEffect, useState } from "react";
import { Alert } from 'react-bootstrap'
//Context
import authContext from '../../context/auth/authContext';
import projectsContext from '../../context/projects/projectsContext';
import notificationsContext from '../../context/notifications/notificationsContext';
import Notifications from '../Notifications/Notifications';
import moment from 'moment';

const MeetingsReminder = () => {

  const NotificationsContext = useContext(notificationsContext);
  const { 
    displayNotification, 
    showNotification,
    displayNextMeeting, 
    showNextMeeting, 
    reminders, 
    updateReminders, 
    nextMeeting, 
    updateNextMeeting,
    checkTime,
    setCheckTime
    } = NotificationsContext;
  const ProjectsContext = useContext(projectsContext);
  const { meetings, getMeetings } = ProjectsContext;
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;
  let userId = user._id

  const [canPospone, setCanPospone] = useState(true);
  
  
  //This Effect gets the meetings from the DB on render
  useEffect(() => {
    if (userId && checkTime) {
      getMeetings(userId);
    }
  }, [])

  useEffect(() => {
    if(checkTime){
   updateReminders(meetings);
    }
  }, [meetings])

  useEffect(() => {
    if(checkTime){
      updateNextMeeting(reminders);
    }
  }, [reminders]) 

  //Once nextMeeting is set, this checks the time remaining in order to show a Notificaiton
  useEffect(() => {
    if(Object.entries(nextMeeting).length>0){
      //showNextMeeting(true);
      const interval = setInterval(() => {
        let now = moment();
        let nextTime = nextMeeting.startTime.split(':'); 
        nextTime = moment().set({ 'h': nextTime[0], 'm': nextTime[1], 's': '00' });
        let diff = nextTime.diff(now)
       // console.log(`${(diff/1000)/60} min para la prox reunion`) 
        
          if(!nextMeeting.discarded){
            if(diff<600000 && diff>=0 && !nextMeeting.posponed){
                showNotification(true);
              if(diff>300000) {setCanPospone(true)} else setCanPospone(false)

            } else if(diff<0) {
              showNotification(false);
              setCheckTime(true);
              updateReminders(meetings);
              updateNextMeeting(reminders);
            }
          } else {
            //updateReminders(meetings);
            updateNextMeeting(reminders);
           // setCheckTime(true);
            showNotification(false)}
      }, 1100);
      return () => clearInterval(interval); 
    }
  }, [nextMeeting])

  return (
    <>
    { displayNotification && 
    <Notifications 
    canPospone={canPospone}
    /> }
    {Object.entries(nextMeeting).length>0 ? 
       displayNextMeeting && <Alert dismissible onClose={() => showNextMeeting(false)} className="m-1" variant="info">
         Próxima reunión: {nextMeeting.name} a las {nextMeeting.startTime}
         </Alert>
     : <Alert variant="info">Hoy no tiene reuniones</Alert>
    } 
    </>
  );
}

export default MeetingsReminder;