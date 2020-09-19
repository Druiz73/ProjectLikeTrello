import React, { useState, useEffect, useRef } from 'react';


const Countdown = ({ timeRemaining, isDaily, className, finishDailyAction }) => {
  const [timer, setTimer] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })
  let interval = useRef();
  const startTime = (time) => {
    const countdownDate = new Date(time).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = countdownDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60) / 1000));

      if(difference < 0) {
        clearInterval(interval.current);
        finishDailyAction(true);
      } else {
        setTimer({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      }
    }, 1000)
  }
  useEffect(() => {
    startTime(timeRemaining);
    return () => {
      clearInterval(interval);
    }
  }, [timeRemaining])

  const { days, hours, minutes, seconds } = timer;
  return (
    isDaily ? 
      (<span className={className}> {minutes < 10 ? `0${minutes}`: minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>) :
      (<span className={className}>{days} : {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds > 10 ? `0${seconds}` : seconds}</span>)
  );
}
 
export default Countdown;