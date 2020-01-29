import React, { useState } from 'react'

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import ErrorModal from '../event_forms/ErrorModal'

// utils
import {fetchGeocode} from '../../utils'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import {
  editUserForm,
  formFlex,
  profilePhoto,
  editNameWrap,
  editFirstNameField,
  editLastNameField,
  profileUserTitle,
  profileSmall,
  location,
  eventNumbers,
  evNum,
  editNameLabel
} from './UserProfile.module.scss'


const EditUserForm = () => {

  // manages local form state
  const fullName = {
    first: "Cici",
    last: "Adams"
  }
  const [editName, setEditName] = useState(fullName);
  const handleChange = event => {
    const updatedValue = {
      ...editName,
      [event.currentTarget.name]: event.currentTarget.value
    };
    console.log("updatedValue in EditUSerForm.jsx:", updatedValue);
    setEditName(updatedValue);
  }

  return (
    <form>
      <div className={editUserForm}>  
        <div className={profilePhoto}>
          <p>img upload</p>
        </div>
        <div className={`${editNameWrap} field`}>
        <label className={`${editNameLabel} label`}>
          Edit:
          <div className={`${formFlex} control`}>
            <input className={`${editFirstNameField} input`} name="first" value={editName.first} onChange={handleChange} type="text"></input>
            <input className={`${editLastNameField} input`} name="last" value={editName.last} onChange={handleChange} type="text"></input>
          </div>
        </label>
      </div>
        <h2 className={profileUserTitle}>Event Organizer</h2>
        <div className={location}>
          <LocationPin />
          <small className={profileSmall}>San Francisco, California</small>
        </div>
        <div className={eventNumbers}>
          <div className={`created ${evNum}`}>
            <h4>Events Created</h4>
            <h4>00</h4>
          </div>
          <div className={`saved ${evNum}`}>
            <h4>Events Saved</h4>
            <h4>00</h4>
          </div>
          <div className={`attended ${evNum}`}>
            <h4>Events Attended</h4>
            <h4>00</h4>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditUserForm