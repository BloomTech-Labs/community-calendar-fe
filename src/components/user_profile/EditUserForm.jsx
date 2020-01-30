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
  profilePhotoWrap,
  profilePhotoFilter,
  editPhoto,
  profileImg,
  editNameWrap,
  editFirstNameField,
  editLastNameField,
  profileUserTitle,
  profileSmall,
  location,
  eventNumbers,
  evNum,
  imageInput,
  editNameLabel
} from './UserProfile.module.scss'

//  TODO Add camera Icon to image upload


const EditUserForm = (props) => {

  const image = {
    url: ''
  }

  const { editName, handleFormChange } = props;

  return (
    <form>
      <div className={editUserForm}>  

        <input className={imageInput} />
        <div className={profilePhotoWrap}>
          <label htmlFor="imageInput">{image.url ? (
            <div className={profilePhotoFilter}>
              <div className={editPhoto}>
                Edit
                <p>CameraIcon</p>
              </div>
              <div className={profileImg} style={{backgroundImage: `url('${image.url}')`}}></div>
            </div>) : (
            <div className={profilePhotoFilter}>
              <div className={editPhoto}>
                Edit
                <p>CameraIcon</p>
              </div>
              <p>userIcon</p>
            </div>
          )}</label>
        </div>

        <div className={profilePhoto}>
          <p>img upload</p>
        </div>
        <div className={`${editNameWrap} field`}>
        <label className={`${editNameLabel} label`}>
          Edit:
          <div className={`${formFlex} control`}>
            <input className={`${editFirstNameField} input`} name="first" value={editName.first} onChange={handleFormChange} type="text"></input>
            <input className={`${editLastNameField} input`} name="last" value={editName.last} onChange={handleFormChange} type="text"></input>
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