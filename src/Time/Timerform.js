import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css'
const TaskForm = ({ onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      taskName,
      taskDuration: parseInt(taskDuration, 10),
      dueDate: dueDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      dueTime: dueTime.toTimeString().split(' ')[0], // Format due time to HH:mm:ss
    });

    // Optionally, you can reset the form state after submission
    setTaskName('');
    setTaskDuration('');
    setDueDate(new Date());
    setDueTime(new Date());
    // Hide the form after submission
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button className='addbutton' onClick={toggleModal}>Add Timer</button>
      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="TaskFormModal">
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
              <button className='closebutton' onClick={toggleModal}>Close</button>
                <h1 className='taskname'>Add Timer</h1>
                <label className='titleform'>
                  <input className='inputbox' placeholder='Name' type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </label>
                <br />
                <label className='titleform'>

                  <input className='inputbox'
                   placeholder='Duration (Minutes)'
                    type="number"
                    value={taskDuration}
                    onChange={(e) => setTaskDuration(e.target.value)}
                  />
                </label>
                <br />
                <label className='titleform'>
                  Due Date
                  <DatePicker className='inputbox' placeholder='DueDate'selected={dueDate} onChange={(date) => setDueDate(date)} />
                </label>
                <br />
                <label className='titleform'>
                  Due Time
                  <DatePicker
                  className='inputbox'
                    selected={dueTime}
                    onChange={(date) => setDueTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                  />
                </label>
                <br />
                <button type="submit">Add Task</button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
export default TaskForm;
