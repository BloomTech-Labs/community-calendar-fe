import React from 'react'

//styles
import {
    deleteEventModal,
    deleteEventModalContent,
    deleteEventModalBody,
    deleteEventModalButton,
    deleteEventModalButtonContainer,
    yes,
    no,
    button
  } from './styles/DeleteEventModal.module.scss'

function DeleteEventModal({deleteEvent, toggleModal}) {
    return (
        <div className={`${deleteEventModal}`}>
            <div className={`${deleteEventModalContent}`}>
                <div className={`${deleteEventModalBody}`}>
                    Are you sure you want to delete this event?
                </div>
            </div>
            <div className={`${deleteEventModalButtonContainer}`}>
                <button onClick={() => {deleteEvent()}} className={`${button} ${yes}`}>Yes</button>
                <button onClick={() => {toggleModal()}} className={`${button} ${no}`}>No</button>
            </div>
        </div>
    )
}

export default DeleteEventModal;