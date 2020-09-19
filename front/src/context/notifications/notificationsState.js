import React, { useReducer } from 'react';
import notificationsContext from './notificationsContext';
import notificationsReducer from './notificationsReducer.js';
import moment from 'moment';
import {
  SHOW_NOTIFICATION,
  SHOW_NEXT_MEETING,
  UPDATE_REMINDERS,
  UPDATE_NEXT_MEETING,
  POSPONE_MEETING,
  CLEAR_POSPONE,
  DISCARD_MEETING,
  CHECK_TIME
} from '../../types';

const NotificationState = ({ children }) => {

  const INITIAL_STATE = {
    displayNotification: false,
    displayNextMeeting: true,
    reminders: [],
    nextMeeting: {},
    checkTime: true
  }

  const [state, dispatch] = useReducer(notificationsReducer, INITIAL_STATE);

  const showNotification = value => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: value
    })
  }

  const showNextMeeting = value => {
    dispatch({
      type: SHOW_NEXT_MEETING,
      payload: value
    })
  }

  const updateReminders = (meetings) => {
    if (meetings.length > 0) {

      let meetRemind = meetings.map((m) => {
        let now = moment();
        let meetTime = m.initHourOfDaily.split(':');
        meetTime = moment().set({ 'h': meetTime[0], 'm': meetTime[1], 's': '00' });
        let diff;

        if (moment(meetTime).isAfter(now)) {
          diff = meetTime.diff(now);
          const meet = {
            id: m._id,
            name: m.nameRoom,
            startTime: m.initHourOfDaily,
            discarded: false,
            posponed: false
          }
          return meet;
        } else return null;

      })
      meetRemind = meetRemind.filter(Boolean);
      dispatch({
        type: UPDATE_REMINDERS,
        payload: meetRemind
      })
    }
  }

  const updateNextMeeting = (reminders) => {
    let nextM = {};
    let auxReminders = [];
    reminders.map( r => {
      if(!r.discarded){
        auxReminders.push(r)
      }
    })
    if (auxReminders.length > 1) {
      nextM = auxReminders[0];
      let minTime = auxReminders[0].startTime.split(':');
      minTime = moment().set({ 'h': minTime[0], 'm': minTime[1], 's': '00' });
      auxReminders.map(r => {
        let meetTime = r.startTime.split(':');
        meetTime = moment().set({ 'h': meetTime[0], 'm': meetTime[1], 's': '00' })

        if (meetTime.isBefore(minTime) && !r.discarded) {
          nextM = r;
          return nextM;
        }
      })

    } else if(auxReminders.length === 1){
        nextM = auxReminders[0];
    }
    dispatch({
      type: UPDATE_NEXT_MEETING,
      payload: nextM
    })
  }

  const pospone = () => {
    dispatch({
      type: POSPONE_MEETING
    })
    dispatch({
      type: CHECK_TIME,
      value: false
    })
    setTimeout(() => {
      dispatch({
        type: CLEAR_POSPONE
      })
    }, 300000);
  }

  const discard = (reminders, nextMeeting) => {
    let newReminders = reminders.map(r => {
      if (r.id === nextMeeting.id) {
        const rem = { ...r, discarded: true }
        return rem
      } else {
        const rem = { ...r }
        return rem
      }
    })
    dispatch({
      type: DISCARD_MEETING,
      payload: newReminders
    })
    dispatch({
      type: CHECK_TIME,
      value: false
    })
  }

  const setCheckTime = (value) => {
    dispatch({
      type: CHECK_TIME,
      payload: value
    })
  }

  return (
    <notificationsContext.Provider
      value={{
        displayNotification: state.displayNotification,
        displayNextMeeting: state.displayNextMeeting,
        reminders: state.reminders,
        nextMeeting: state.nextMeeting,
        checkTime: state.checkTime,
        pospone,
        discard,
        showNextMeeting,
        showNotification,
        updateReminders,
        updateNextMeeting,
        setCheckTime
      }}
    >
      {children}
    </notificationsContext.Provider>
  );
}

export default NotificationState;