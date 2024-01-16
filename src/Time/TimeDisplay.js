// TimerDisplay.js
import React from 'react';
import './TimerDisplay.css';

// Utility function to format seconds into HH:MM:SS
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const TimerDisplay = ({ currentState, time, taskName }) => {
  const formattedTime = formatTime(time);

  // Determine the bar color based on the currentState
  let barColor = 'white'; // Default color for no task
  if (currentState === 'Timer') {
    barColor = 'green';
  } else if (currentState === 'Due Task') {
    barColor = 'blue';
  }

  return (
    <div>
      <h2 className='timerdisplay'>{currentState}</h2>      
      {taskName && <p className='taskname'>{taskName}</p>}
      <div className='rounded-bar' style={{ backgroundColor: barColor }}></div>
      <p className='time'>{formattedTime}</p>
    </div>
  );
};

export default TimerDisplay;
