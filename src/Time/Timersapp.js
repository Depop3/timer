// TimerApp.js
import React, { useState, useEffect } from 'react';
import TimerDisplay from './TimeDisplay';
import TaskForm from './Timerform';
import TaskTimer from './TimeTask';
import DueTimeTimer from './DueTime';
import TaskList from './TimeList';

const TimerApp = () => {
  const [currentState, setCurrentState] = useState('No Task');
  const [time, setTime] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [oldestTaskIndex, setOldestTaskIndex] = useState(null);
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);
let prevTasks =[]

  useEffect(() => {
    if (tasks.length > 0) {
      setOldestTaskIndex(0); // Set to the first task initially
    }
  }, [tasks]);

  useEffect(() => {
    const handleTaskCompletion = () => {
      // Remove the completed task
      const newTasks = [...tasks];
      newTasks.splice(oldestTaskIndex, 1);
  
      if (newTasks.length > 0) {
        // If there are remaining tasks, transition to the next task
        const nextTask = newTasks[0];
        setCurrentState('Timer');
        setTime(nextTask.taskDuration * 60);
      } else {
        // If no remaining tasks, transition to 'No Task' state
        setCurrentState('No Timer');
        setTime(0);
        setActiveTaskIndex(null);
      }
  
      setTasks(newTasks);
    };
  
    const interval = setInterval(() => {
      if (currentState === 'Timer' && time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else if (currentState === 'Timer' && time === 0) {
        // Transition to the next task or 'No Task' state and delete the completed task
        handleTaskCompletion();
      } else if (currentState === 'Due Task' && time > 0) {
        const now = new Date();
        const dueDateTime = new Date(`${tasks[oldestTaskIndex].dueDate} ${tasks[oldestTaskIndex].dueTime}`);
        const timeDifference = dueDateTime.getTime() - now.getTime();
  
        if (timeDifference <= 0) {
          // If the due time is in the past, treat it as a regular task with duration
          setCurrentState('Timer');
          setTime(tasks[oldestTaskIndex].taskDuration * 60);
        } else {
          // If the due time is in the future, set the timer to the due time
          setTime(Math.floor(timeDifference / 1000));
        }
      } else if (currentState === 'No Timer') {
        setTime((prevTime) => prevTime + 1); // Count up
      } else if (currentState === 'Due Task' && time === 0) {
        // Transition to the Task state for the oldest task
        setCurrentState('Timer');
        setTime(tasks[oldestTaskIndex].taskDuration * 60);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [currentState, time, tasks, oldestTaskIndex]);
  useEffect(() => {
    setCurrentState('No Timer');
    setTime(0);
    setActiveTaskIndex(null);
  }, []);

  const handleTaskSubmit = ({ taskName, taskDuration, dueDate, dueTime }) => {
    const now = new Date();
    const dueDateTime = new Date(`${dueDate} ${dueTime}`);
    const timeDifference = dueDateTime.getTime() - now.getTime();
  
    const newTask = {
      taskName,
      taskDuration,
      dueDate,
      dueTime,
      priority: tasks.length, // Assign a priority based on the number of existing tasks
    };
  
    if (currentState === 'No Timer' && (activeTaskIndex === null || time <= 0)) {
      // Only update the timer state if currently in 'No Task' state and no active task or the active task is past due
      if (timeDifference <= 0) {
        // If the due time is in the past, treat it as a regular task with duration
        setCurrentState('Timer');
        setTime(taskDuration * 60);
      } else {
        // If the due time is in the future, set the timer to the due time
        setCurrentState('Due Task');
        setTime(Math.floor(timeDifference / 1000));
      }
    }
  
    // Add the new task to the tasks array
    setTasks((prevTasks) => [...prevTasks, newTask]);
  
    // If no task is currently active or the new task has higher priority, set the new task as active
    if (activeTaskIndex === null || newTask.priority < tasks[activeTaskIndex].priority) {
      setActiveTaskIndex(prevTasks.length);
    }
  };

  const handleDeleteTask = (index) => {
    // Remove the task at the specified index
    const newTasks = tasks.filter((_, i) => i !== index);
  
    if (currentState === 'Due Task' || currentState === 'Timer') {
      // If the deleted task is the current due task or current task, reset to 'No Task' state
      setCurrentState('No Timer');
      setTime(0);
    }
  
    // If there are remaining tasks, set the timer to the due date/time state of the next task
    if (newTasks.length > 0) {
      const nextTask = newTasks.reduce((acc, task) => (task.priority < acc.priority ? task : acc));
  
      const now = new Date();
      const dueDateTime = new Date(`${nextTask.dueDate} ${nextTask.dueTime}`);
      const timeDifference = dueDateTime.getTime() - now.getTime();
  
      if (timeDifference <= 0) {
        // If the next task is already due, treat it as a regular task with duration
        setCurrentState('Timer');
        setTime(nextTask.taskDuration * 60);
      } else {
        // If the next task is not due yet, set the timer for the due time
        setCurrentState('Due Task');
        setTime(Math.floor(timeDifference / 1000));
      }
  
      setActiveTaskIndex(newTasks.indexOf(nextTask));
    } else {
      // If no remaining tasks, reset the active task index
      setActiveTaskIndex(null);
    }
  
    setTasks(newTasks);
  };
  
  return (
<div className='alltimer'>
  <div className="timer-column">
    <TimerDisplay currentState={currentState} time={time} taskName={tasks[activeTaskIndex]?.taskName} />
    {currentState === 'Timer' && <TaskTimer time={time} />}
    {currentState === 'Due Task' && <DueTimeTimer time={time} />}
    <TaskForm onSubmit={handleTaskSubmit} className="taskform" />
  </div>
  <div className="tasklist-column">
    <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} className="tasklist" />
  </div>
</div>
  );
};

export default TimerApp;
