import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import './AgeCO.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
const newTheme = createTheme({
  transitions: {
    duration: {
      enteringScreen: 225,
    },
  },

  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: '#bbdefb',
          borderRadius: 3,
          backgroundColor: '#0d47a1',
        }
      }
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          color: '#0e47a1',
        }
      }
    }
  }
});


function AgeBox({ onAgeSubmit }) {
  const [expanded, setExpanded] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleDateChange = (date) => {
    // Use the selected date and set it to the state
    setBirthdate(date);
  };

  const handleClick = () => {
    setExpanded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the stored birthdate from the state
    calculateAge(birthdate);
    setExpanded(false);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const calculateAge = (birthdate) => {
    const now = moment();
    const birthdateMoment = moment(birthdate, 'YYYY-MM-DD', true);

    if (birthdateMoment.isValid()) {
      const duration = moment.duration(now.diff(birthdateMoment));

      setAge({
        years: duration.years(),
        months: duration.months(),
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    } else {
      // Handle invalid date
      setAge({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateAge(birthdate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [birthdate]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} >
      <div className={`age-container ${expanded ? 'expanded' : ''}`} onClick={handleClick}>
        {expanded ? (
          <form onSubmit={handleSubmit}>
           <button  className={'close-button'} onClick={handleClose}>
            <CloseIcon/> 
            </button>
            <p 
            className={'question'}>
                When were you born?</p>
            <ThemeProvider theme={newTheme}>

        <DesktopDatePicker sx = {{  

          marginBottom:2,
          marginTop:-4,        
          color: '#bbdefb',
          borderRadius: 3,
          backgroundColor: '#0d47a1',
          transition: 'opacity 0.3s ease-in-out'}}
              label="Enter Birthdate"
              onChange={handleDateChange}
              value={birthdate}
              type="date"
              id="birthdate-input"/>
            </ThemeProvider>
            <Button sx = {{     
                marginBottom:0, 
                borderRadius: 3,
                backgroundColor: '#0d47a1',}}
                variant="outlined" type="submit">
              Submit
            </Button>
          </form>
        ) : (  <>
          {age.years > 0 ? (
             <>
             <h1 className='ager'>Age</h1>
             <p className="age-text" style={{ color: '#0d47a1' }} id="age-text">
               {age.years}.{age.months}{age.days}{age.hours}{age.minutes}{age.seconds}
             </p>
           </>
          ) : (
            <p className="add-age-text "style={{ color: '#0066b4' }} id="age-text">
              Add Age
            </p>
          )}
        </>
      )}
    </div>
  </LocalizationProvider>
);
}
export default AgeBox;
