import React from 'react';
import { useTranslation } from 'react-i18next';
import './DailyCard.css'
const DailyCard = ({ user, sendDaily, handleOnchange, values, isMine }) => {
  const { t } = useTranslation();
  const { email, userId } = user;
  const data = values || {};

  return (
    <form className={`daily-note ${isMine ? 'myNote' : ''}`} id={userId}>
      <h3 className="text-center daily-note--title">{email}</h3>
      <div className="note_cnt">
        <label
          className="text-center m-0 daily-note--text"
        >{t("DailyQuestion1")}</label>
        {
          isMine ? (
            <textarea
              onBlur={e => sendDaily(e)}
              onChange={e => handleOnchange({ ...data, [e.target.name]: e.target.value })}
              value={data.yesterday}
              name="yesterday"
              maxLength="300"
              className="title m-0"></textarea>
          ) : (
              <span className="d-block daily-note--users">{data ? data.yesterday : null}</span>
            )
        }
      </div>
      <div className="note_cnt">
        <label
          className="m-0 daily-note--text"
        >{t("DailyQuestion2")}</label>
        {
          isMine ? (
            <textarea
              onBlur={e => sendDaily(e)}
              onChange={e => handleOnchange({ ...data, [e.target.name]: e.target.value })}
              value={data.today}
              name="today"
              maxLength="300"
              className="title m-0"></textarea>
          ) : (
              <span className="d-block daily-note--users">{data ? data.today : null}</span>
            )
        }
      </div>
      <div className="note_cnt">
        <label
          className="text-danger m-0 daily-note--text"
        >{t("DailyQuestion3")}</label>
        {
          isMine ? (
            <textarea
              onBlur={e => sendDaily(e)}
              onChange={e => handleOnchange({ ...data, [e.target.name]: e.target.value })}
              value={data.blocked}
              name="blocked"
              maxLength="300"
              className="title m-0"></textarea>
          ) : (
              <span className="d-block daily-note--users">{data ? data.blocked : null}</span>
            )
        }
      </div>
      <div className="note_cnt">
        <label
          className="text-danger m-0 daily-note--text"
        >{t("DailyQuestion4")}</label>
        {
          isMine ? (
            <textarea
              onBlur={e => sendDaily(e)}
              onChange={e => handleOnchange({ ...data, [e.target.name]: e.target.value })}
              value={data.pending}
              name="pending"
              maxLength="300"
              className="title m-0"></textarea>
          ) : (
              <span className="d-block daily-note--users">{data ? data.pending : null}</span>
            )
        }
      </div>
    </form>
  );
}

export default DailyCard;