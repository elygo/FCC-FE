import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    breakLength: 5,
    sessionLength: 25,
    counterStatus: false,
    breakStatus: false,
    counter: new Date(25 * 60 * 1000).toISOString(),
}

let breakTimerSlice = createSlice({
    name: 'timer',
    initialState: initialState,
    reducers: {
        incrementBreak: function (state, action) {
            if (state.breakLength < 60) {
                state.breakLength = state.breakLength + 1;
            }
        },
        decrementBreak: function (state, action) {
            if (state.breakLength > 1) {
                state.breakLength = state.breakLength - 1;
            }
        },
        incrementSession: function (state, action) {
            if (state.sessionLength < 60) {
                state.sessionLength = state.sessionLength + 1;
                state.counter = new Date( state.sessionLength * 60 * 1000).toISOString();
            }
        },
        decrementSession: function (state, action) {
            if (state.sessionLength > 1) {
                state.sessionLength = state.sessionLength - 1;
                state.counter = new Date( state.sessionLength * 60 * 1000).toISOString();
            }
        },
        reset: function (state, action) {
            state.breakLength = initialState.breakLength;
            state.sessionLength = initialState.sessionLength;
            state.counter = initialState.counter;
            state.counterStatus = false;
            state.breakStatus = false;
            let audio = document.getElementById("beep");
                audio.pause();
                audio.currentTime = 0;
        },
        counterStart: function (state, action) {
            if (new Date(state.counter).getTime() >= 1000 && state.breakStatus === false) {
                state.counter = new Date(new Date(state.counter).getTime() - 1000).toISOString();
            } else if (new Date(state.counter).getTime() === 0 && state.breakStatus === false) {
                let audio = document.getElementById("beep");
                audio.play();
                state.breakStatus = true;
                state.counter =  new Date(state.breakLength * 60 * 1000).toISOString();
            } else if (new Date(state.counter).getTime() >= 1000 && state.breakStatus === true) {
                state.counter = new Date(new Date(state.counter).getTime() - 1000).toISOString();
            } else if (new Date(state.counter).getTime() === 0 && state.breakStatus === true) {
                let audio = document.getElementById("beep");
                audio.play();
                state.breakStatus = false;
                state.counter =  new Date(state.sessionLength * 60 * 1000).toISOString();
            }
        },
        counterStatusChange: function (state, action) {
            state.counterStatus = !state.counterStatus
        },

    }
});

export const { incrementBreak, decrementBreak, incrementSession, decrementSession, reset, counterStart, counterStatusChange } = breakTimerSlice.actions;
export default breakTimerSlice.reducer;