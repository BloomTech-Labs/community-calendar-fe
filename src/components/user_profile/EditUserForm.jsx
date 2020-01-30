import React, { useState, useEffect } from 'react'

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import ErrorModal from '../event_forms/ErrorModal'

// utils
import {fetchGeocode} from '../../utils'

// icons
import LocationPin from '../icons/LocationPin'
import UserIcon from '../icons/UserIcon'
import CameraIcon from '../icons/CameraIcon'


// styles
import {
  editUserForm,
  formFlex,
  profilePhoto,
  editProfilePhotoWrap,
  editProfilePhotoFilter,
  editPhoto,
  profileImg,
  defaultProfilePhoto,
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

//  TODO Add camera Icon and User Icon to image upload


const EditUserForm = (props) => {
  const { 
    editName, 
    handleFormChange
   } = props;
  
  const [profilePicture, setProfilePicture] = useState(null);

  const image = {
    url: false
  }

  useEffect(() => {
    if (profilePicture) {
      const formData = new FormData();
      formData.append();
      // append/edit formData and send as mutation
    }
  }, [profilePicture])

  return (
    <form>
      <div className={editUserForm}>  

      
        {/* <div className={profilePhotoWrap}>
          <label htmlFor="imageInput">
            {image.url ? (
              <div className={profilePhotoFilter}>
                <div className={editPhoto}>
                  Edit
                  <CameraIcon />
                </div>
                <div className={profileImg} style={{backgroundImage: `url('${image.url}')`}}></div>
              </div>) : (
              <div className={profilePhotoFilter}>
                <div className={editPhoto}>
                  Edit
                  <CameraIcon />
                </div>
                <UserIcon className={defaultProfilePhoto} />
              </div>
            )}
          </label>
        </div> */}

        <input className={imageInput} type="file" onChange={e => setProfilePicture(e.target.target.files[0])} id="imageInput" />
        <div className={`${profilePhoto} ${editProfilePhotoWrap}`}>
          <label htmlFor="imageInput">
            <div className={editProfilePhotoFilter}>
              <div className={editPhoto}>
                Edit
                <CameraIcon />
              </div>
              <div className={profileImg} style={{backgroundImage: `url('${image.url}')`}}></div>
            </div>
          </label>
        </div>
        <div className={`${editNameWrap} field`}>
        <label className={`${editNameLabel} label`}>
          Edit:
          <div className={`${formFlex} control`}>
            <input 
              className={`${editFirstNameField} input`} 
              name="first" value={editName.first} 
              onChange={handleFormChange} 
              type="text">
            </input>
            <input 
              className={`${editLastNameField} input`} 
              name="last" value={editName.last} 
              onChange={handleFormChange} 
              type="text">
            </input>
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