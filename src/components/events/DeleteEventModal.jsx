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

function DeleteEventModal({deleteEvent, toggleModal, isSeries}) {
  const [deleteOption, setDeleteOption] = useState('single')
  return isSeries ? (
    <div className={`${deleteEventModal}`}>
      <div className={`${deleteEventModalContent}`}>
        <div className={`${deleteEventModalBody}`}>
          This event if part of a series!
          <br />
          Would you like to:
          <div className={`${checkboxes}`}>
            <input
              onClick={() => setDeleteOption('single')}
              type='radio'
              name='delete'
              value='single'
              checked
            />
            <label> Delete this event</label>
          </div>
          <div className={`${checkboxes}`}>
            <input
              onClick={() => setDeleteOption('series')}
              type='radio'
              name='delete'
              value='series'
            />
            <label> Delete this series</label>
          </div>
        </div>
      </div>
      <div className={`${deleteEventModalButtonContainer}`}>
        <button
          onClick={() => {
            deleteEvent()
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
