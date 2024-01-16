// DueTimeTimer.js
import React from 'react';

const DueTimeTimer = ({ time }) => (
  <div>
    <p className='timer2display'>DUE IN {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')} minutes</p>
  </div>
);

export default DueTimeTimer;
