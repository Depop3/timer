import React, { useState } from 'react';
import AgeBox from './AgeBox';

function AgeContainerr() {
  const [age, setAge] = useState('');

  const handleAgeSubmit = (newAge) => {
    setAge(newAge);
  };

  return (
    <div className='ageheader'>
      <AgeBox age={age} onAgeSubmit={handleAgeSubmit} />
    </div>
  );
}

export default AgeContainerr;