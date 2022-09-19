import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    incrementBreak, 
    decrementBreak, 
    incrementSession, 
    decrementSession,
    reset,
    counterStart,
    counterStatusChange
} from "../redux/datastored/data.stored"

function Timebreaker () {
    let dispatch = useDispatch();
    const timer = useSelector((state) => state.timer);
    
    useEffect(() => {
        let interval;
        if (timer.counterStatus) {
            interval = setInterval(() => { dispatch(counterStart()) }, 1000);
            document.getElementById('break-increment').disabled = true;
            document.getElementById('session-increment').disabled = true;
            document.getElementById('break-decrement').disabled = true;
            document.getElementById('session-decrement').disabled = true;
        } else {
            clearInterval(interval);
            interval = null;
            
            document.getElementById('break-increment').disabled = false;
            document.getElementById('session-increment').disabled = false;
            document.getElementById('break-decrement').disabled = false;
            document.getElementById('session-decrement').disabled = false;
        }
        return () => clearInterval(interval);
    }, [timer.counterStatus]) 
    return (
        <div className="wrapper">
            <audio src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" id="beep"></audio>
            <div className="card border-secondary" id="break-label">
                <div className="card-header">Break length</div>
                <div className="card-body">
                    <div className="content-center">   
                        <button className="btn btn-light" id="break-increment" onClick={ () => { dispatch(incrementBreak()) } }>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                        <div id="break-length">{timer.breakLength}</div>
                        <button className="btn btn-light" id="break-decrement" onClick={ () => { dispatch(decrementBreak()) } }>
                            <i className="bi bi-dash-circle"></i>
                        </button>
                    </div>                    
                </div>
            </div>    

            <div className="card text-primary bg-light border-primary" id="timer-label">
                <div className="card-header">{timer.breakStatus ? "Break" : "Session" } </div>
                <div className="card-body">
                    <div className="content-center">
                        <button className="btn btn-light" id="start_stop" onClick={ () => { dispatch(counterStatusChange()); }}>
                            { timer.counterStatus ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
                        </button>
                        <div id="time-left">{ timer.sessionLength === 60 && timer.counter.substring(14,19) === (new Date(60 * 60 * 1000).toISOString()).substring(14,19) ? ("60:00") : timer.counter.substring(14,19)}</div>
                        <button className="btn btn-light" id="reset" onClick={ () => { dispatch(reset()) } }>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="card border-secondary" id="session-label">
                <div className="card-header">Session length</div>
                <div className="card-body">
                    <div className="content-center">
                        <button className="btn btn-light" id="session-increment" onClick={ () => { dispatch(incrementSession()) } }>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                        <div id="session-length">{timer.sessionLength}</div>
                        <button className="btn btn-light" id="session-decrement"onClick={ () => { dispatch(decrementSession()) } }>
                            <i className="bi bi-dash-circle"></i>
                        </button> 
                    </div>
                    
                </div>           
            </div>
            
        </div>
    )
}

export default Timebreaker;
