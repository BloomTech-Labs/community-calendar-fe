import React, {useState} from "react"

//styles
import {
    updateEventModal,
    updateEventModalContent,
    updateEventModalBody,
    updateEventModalButtonContainer,
    modalLabel,
    yes,
    no,
    button,
    checkboxes
  } from './styles/UpdateEventModal.module.scss'



  function UpdateEventModal({modalCreateEvent, toggleEditModal, isSeries}) {
    const [updateOption, setUpdateOption] = useState('single')
    return (
        isSeries ?
        <div className={`${updateEventModal}`}>
            <div className={`${updateEventModalContent}`}>
                <div className={`${updateEventModalBody}`}>
                    This event if part of a series!
                    <br/>
                    Would you like to:
                    <div className={`${checkboxes}`}>
                        <input onClick={() =>setUpdateOption('single')} type="radio" name='update' value='single' checked/> 
                        <label className={`${modalLabel}`}> Update this event</label>
                    </div>
                    <div className={`${checkboxes}`}>
                        <input onClick={() =>setUpdateOption('series')} type="radio" name='update' value='series'/>
                        <label className={`${modalLabel}`}> Update this series</label>
                    </div>
                </div>
            </div>
            <div className={`${updateEventModalButtonContainer}`}>
                <button onClick={() => {modalCreateEvent()}} className={`${button} ${yes}`}>Confirm</button>
                <button onClick={() => {toggleEditModal()}} className={`${button} ${no}`}>Cancel</button> 
            </div>
        </div> : <div className={`${updateEventModal}`}>
            <div className={`${updateEventModalContent}`}>
                <div className={`${updateEventModalBody}`}>
                    Are you sure you want to update this event?
                </div>
            </div>
            <div className={`${updateEventModalButtonContainer}`}>
                <button onClick={() => {modalCreateEvent()}} className={`${button} ${yes}`}>Yes</button>
                <button onClick={() => {toggleEditModal()}} className={`${button} ${no}`}>No</button>
            </div>
        </div>
    )
}

export default UpdateEventModal;