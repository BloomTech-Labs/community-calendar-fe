import React from 'react'

//styles
import {
    modalBackground,
    modalCard,
    modalBody,
    modalButtonContainer,
    yes,
    no,
    button
  } from './styles/ErrorModal.module.scss'

function ErrorModal({toggleModal}) {
    return (
        <div className={`${modalBackground}`}>
            <div className={`${modalCard}`}>
                <div className={`${modalBody}`}>
                    The server encountered an error. Please try again.
                </div>
            </div>
            <div className={`${modalButtonContainer}`}>
                <button onClick={() => toggleModal()} className={`${button} ${no}`}>Return to Form</button>
            </div>
        </div>
    )
}

export default ErrorModal;