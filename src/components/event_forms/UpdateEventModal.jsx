import React, {useState} from "react"

//styles
import{
    updateEventModal,
    updateEventModalContent,
    updateEventModalBody,
    updateEventModalButtonContainer,
    yes,
    no,
    button,
    checkboxes
  } from './styles/UpdateEventModal.scss'



  function UpdateEventModal({updateEvent, toggleModal, isSeries}) {
    const [updateOption, setUpdateOption] = useState('single')
    console.log('hello world')
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
                        <label> Update this event</label>
                    </div>
                    <div className={`${checkboxes}`}>
                        <input onClick={() =>setUpdateOption('series')} type="radio" name='update' value='series'/>
                        <label> Update this series</label>
                    </div>
                </div>
            </div>
            <div className={`${updateEventModalButtonContainer}`}>
                <button onClick={() => {updateEvent()}} className={`${button} ${yes}`}>Confirm</button>
                <button onClick={() => {toggleModal()}} className={`${button} ${no}`}>Cancel</button> 
            </div>
        </div> : <div className={`${updateEventModal}`}>
            <div className={`${updateEventModalContent}`}>
                <div className={`${updateEventModalBody}`}>
                    Are you sure you want to delete this event?
                </div>
            </div>
            <div className={`${updateEventModalButtonContainer}`}>
                <button onClick={() => {updateEvent()}} className={`${button} ${yes}`}>Yes</button>
                <button onClick={() => {toggleModal()}} className={`${button} ${no}`}>No</button>
            </div>
        </div>
    )
}

export default UpdateEventModal;