import React, {useState} from 'react'

//styles
import {
  deleteEventModal,
  deleteEventModalContent,
  deleteEventModalBody,
  deleteEventModalButtonContainer,
  yes,
  no,
  button,
  checkboxes,
} from './styles/DeleteEventModal.module.scss'

function DeleteEventModal({deleteEvent, deleteSeries, toggleModal, isSeries}) {
  const [deleteOption, setDeleteOption] = useState('single')
  const handleDeleteOptionChange = (event) => {
    setDeleteOption(event.target.value)
  }
  return isSeries ? (
    <div className={`${deleteEventModal}`}>
      <div className={`${deleteEventModalContent}`}>
        <div className={`${deleteEventModalBody}`}>
          This event if part of a series!
          <br />
          Would you like to:
          <div className={`${checkboxes}`}>
            <label for='single'>
              <input
                onClick={handleDeleteOptionChange}
                id='single'
                type='radio'
                name='delete'
                value='single'
                checked={deleteOption === 'single'}
              />
              Delete this event
            </label>
          </div>
          <div className={`${checkboxes}`}>
            <label for='series'>
              <input
                onClick={handleDeleteOptionChange}
                id='series'
                type='radio'
                name='delete'
                value='series'
                checked={deleteOption === 'series'}
              />
              Delete this series
            </label>
          </div>
        </div>
      </div>
      <div className={`${deleteEventModalButtonContainer}`}>
        <button
          onClick={() => {
            deleteOption === 'single' ? deleteEvent() : deleteSeries()
          }}
          className={`${button} ${yes}`}
        >
          Confirm
        </button>
        <button
          onClick={() => {
            toggleModal()
          }}
          className={`${button} ${no}`}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className={`${deleteEventModal}`}>
      <div className={`${deleteEventModalContent}`}>
        <div className={`${deleteEventModalBody}`}>
          Are you sure you want to delete this event?
        </div>
      </div>
      <div className={`${deleteEventModalButtonContainer}`}>
        <button
          onClick={() => {
            deleteEvent()
          }}
          className={`${button} ${yes}`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            toggleModal()
          }}
          className={`${button} ${no}`}
        >
          No
        </button>
      </div>
    </div>
  )
}

export default DeleteEventModal
