import React from 'react';
import './List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const formatDueDate = (dueDate) => {
  // Ensure consistent date format (e.g., MMDDYYYY)
  const formattedDueDate = dueDate.replace(/[^0-9]/g, "");

  // Extract year, month, and day
  const year = formattedDueDate.slice(4);
  const month = formattedDueDate.slice(0, 2);
  const day = formattedDueDate.slice(2, 4);

  // Create Date object with proper month indexing (0-based)
  const dateObj = new Date(year, month - 1, day);

  // Format using locale options
  const options = { month: 'short', day: 'numeric', year: 'numeric', minimumIntegerDigits: 2 }; // Ensure 2-digit year
  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  return formattedDate;
};


const formatDueTime = (dueTime) => {
  const timeObj = new Date(`2000-01-01T${dueTime}`);
  
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedTime = timeObj.toLocaleTimeString('en-US', options);

  return formattedTime;
};

const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <div className='list-container'>
      <div className="tasklist-header">
        <h2 className='tasklistname'>Timers</h2>
      </div>
        {tasks.length === 0 ? (
      <div className="list-content">
      <div className="no-timer-container">
            <p className="no-timer-text">Press 'Add Timer' to display</p>
            <FontAwesomeIcon icon={faAngleDoubleLeft} className="arrow-icon" />
          </div>
            </div>
        ) : (
          <ul>
            <div className="tasklist-content">
            {tasks.map((task, index) => (
              <li key={index} className="task-container">
                <div className="task">
                  <div className="due-date-time">
                    <div className="due-date">{formatDueDate(task.dueDate)}</div>
                    <div className="due-time">{formatDueTime(task.dueTime)}</div>
                  </div>
                  <div className='taskdets'>
                    <div className="task-name">{task.taskName}</div>
                    <div className="task-time">{task.taskDuration} <span>mins</span></div>
                    <button className="taskbutton" onClick={() => onDeleteTask(index)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
            </div>
          </ul>
        )}
      </div>
  );
};

export default TaskList;

