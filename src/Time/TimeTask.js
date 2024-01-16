// TaskTimer.js
import React from 'react';

const TaskTimer = ({ time }) => (
  <div>
    <p className='timer2display'>Finish In {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')} minutes</p>
  </div>
);

export default TaskTimer;
