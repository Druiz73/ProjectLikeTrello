import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
//Components
import Countdown from '../Countdown/Countdown';
import moment from 'moment';
//Context
import notificationsContext from '../../context/notifications/notificationsContext';
//Styles
import './Notifications.css';

const Notifications = (props) => {
  //conext
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
    pospone,
    discard
   } = NotificationsContext;
  const {canPospone} = props;
  const { t } = useTranslation();
  let meetingTime= nextMeeting.startTime.split(":");
  meetingTime = moment().set({ 'h': meetingTime[0], 'm': meetingTime[1], 's': '00'})

  const discardMeeting = () => {
    discard(reminders, nextMeeting);
    updateNextMeeting(reminders);
  }
  return (
    <div className="overlay">
      <div className="main-wrapper">
        <div className="noise-wrapper">
          <div className="noise"></div>
        </div>
        <div className="d-flex align-items-center">
          <h3 className="loader countdown">La reunion {nextMeeting.name} comienza en </h3>
          <Countdown className="ml-2 countdown title-size text-white" isDaily timeRemaining={meetingTime} />
        </div>
        <div className="d-flex mt-3" id="buttons">
          <button onClick={pospone} disabled={!canPospone} type="button" className="mx-2 btn btn-secondary button-small">{t("AlertSnoopzeBtn")}</button> 
          <button onClick={() => discard(reminders, nextMeeting)} type="button" className="mx-2 btn btn-danger button-small">{t("AlertDiscardBtn")}</button>
          <Link to={`/daily/${nextMeeting.id}`}>
          <button type="button" className="mx-2 btn btn-success button-small">{t("AlertEnterBtn")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
 
export default Notifications;