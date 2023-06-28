import React from 'react';
import "./stopwatch.css"
import { useState, useEffect } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';


const StopWatch = () => {

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(59);
  const [second, setSecond] = useState(0);
  const [milliSec, setMilliSec] = useState(0);
  const [stop, setStop] = useState(true);

  const onStart = () => {
setStop(false);

  }

  const onStop = () => {
setStop(true)
  }

  const onReset = () => {
setHour(0);
setMin(0);
setSecond(0);
setMilliSec(0)
  }

  useEffect(() => {
    let inntervalId = null;
    if (!stop) {
      inntervalId = setInterval(() => {

        if (min > 50) {
          setHour(hour + 1);
          setMin(0);
          clearInterval(inntervalId);
        }
        if (second > 59) {
          setMin(min + 1);
          setSecond(0);
          clearInterval(inntervalId);

        }
        if (milliSec > 99) {
          setSecond(second + 1);
          setMilliSec(0);
          clearInterval(inntervalId);
        }
        if (milliSec <= 99) {
          setMilliSec(milliSec + 1);
        }
      }, 10);

    }
    else{
      clearInterval(inntervalId);
    }


    return ()=>{
      clearInterval(inntervalId)
    }
  })
  return (
    <div className='stopwatch-container'>
      <h1 className='stopwatch-time'>{hour} : {min} : {second} : {milliSec} </h1>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={onStart} >start</button>
        <button className="stopwatch-button stop" onClick={onStop}>Stop</button>
        <button className="stopwatch-button" onClick={onReset}>Reset</button>
      </div>

    </div>
  )
}

export default StopWatch;