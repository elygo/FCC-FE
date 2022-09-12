import { useEffect } from 'react';
import './App.css';

function App() { 

  const buttons = [
    {id: 1, text: "Q", description: "Heater 1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
    {id: 2, text: "W", description: "Heater 2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
    {id: 3, text: "E", description: "Heater 3", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
    {id: 4, text: "A", description: "Heater 4", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
    {id: 5, text: "S", description: "Clap", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
    {id: 6, text: "D", description: "Open-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
    {id: 7, text: "Z", description: "Kick-n'-Hat", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
    {id: 8, text: "X", description: "Kick", audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
    {id: 9, text: "C", description: "Closed-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"},
  ]

  const play = (source) => {
    buttons.map(button => button.text === source.target.innerText ? ( document.getElementById("display").innerText = button.description ) : null)
    const audio = document.getElementById(source.target.innerText);
    audio.volume = document.getElementById("volume-slider").value / 100;
    audio.play();
  }

  useEffect(() => {
    window.addEventListener('keypress', e => {
      if(buttons.some(item => item.text === e.key.toUpperCase())) {
        const audio = document.getElementById(e.key.toUpperCase());
        buttons.map(button => button.text === e.key.toUpperCase() ? ( document.getElementById("display").innerText = button.description ) : null);
        audio.volume = document.getElementById("volume-slider").value / 100;
        audio.play();        
      }
    });
  }, []);

  return (
    <div className="drum-machine" id="drum-machine">
      <div className="wrapper">
        <div className="buttons" id="buttons">
          {
            buttons.map((button) => {
              return (<div className="drum-pad" id="drum-pad" key={button.id} 
                            onClick={ 
                              (source) => {
                                play(source)
                              } 
                            }
                      >
                {button.text}
                <audio src={button.audio} className="clip" id={button.text}></audio>
              </div>)
            })
          }
        </div>
        <div className="display-wrapper">
          <div className="display" id="display"></div>
          <input type="range" id="volume-slider" />
        </div>
      </div>
    </div>
  );
}

export default App;
