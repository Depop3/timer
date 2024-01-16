// App.js
import React from 'react';
import TimerApp from './Time/Timersapp';
import AgeContainer from './DOBs/AgeCont';
import logo from './Assets/timerlogo2.png';
import './App.css';

const App = () => {
  return (
    <div className='App-header'>
      <div className='container'>
        <div className="column-container">
        <img src={logo} alt="Logo" className="logo" />
        <AgeContainer />
      </div>
          <TimerApp className='timercontainer' />
        </div>
      </div>
  );
};

export default App;
