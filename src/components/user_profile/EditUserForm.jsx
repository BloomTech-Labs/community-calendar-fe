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

//graphql
import {useMutation} from '@apollo/react-hooks'
import {UPDATE_USER} from '../../graphql'


// styles
import {
  editUserForm,
  formFlex,
  profilePhoto,
  editProfilePhotoWrap,
  editProfilePhotoFilter,
  editPhoto,
  profileImg,
  editProfileImg,
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
  editNameLabel,
  hideText
} from './UserProfile.module.scss'

//  TODO Add camera Icon and User Icon to image upload



const EditUserForm = (props) => {
  const {
    first,
    last,
    attending,
    saved,
    created,
    isEditing,
    profileImage,
    setProfileImage,
    setFirstName,
    setLastName
  } = props;
  
  const [updateUser, {data, error, loading}] = useMutation(UPDATE_USER)
  
  const fullName = {
      first: first,
      last: last,
    }
    const [profilePicture, setProfilePicture] = useState(null);
    const [editedName, setEditName] = useState(fullName)
    
    const handleFormChange = event => {
      const updatedValue = {
        ...editedName,
        [event.currentTarget.name]: event.currentTarget.value,
      }
      console.log('updatedValue in EditUSerForm.jsx:', updatedValue)
      setEditName(updatedValue)
    }


   const updateInfo = () => {
    const {first, last} = editedName;
    console.log(profilePicture);
    updateUser({variables: {firstName: first, lastName: last, image: profilePicture || undefined}})
    .then(res => {
      setFirstName(res.data.updateUser.firstName)
      setLastName(res.data.updateUser.lastName)
      setProfileImage(res.data.updateUser.profileImage);
    })
   }

  return (
    <>
      {/* {isEditing && (
        <small className={`${profileSmall} ${hideText}`}>
          save changes
        </small>
      )} */}
      <form>
        <div className={editUserForm}>  
          <input className={imageInput} type="file" onChange={e => {
            console.log(e.target)
            setProfilePicture(e.target.files[0])}} id="imageInput" 
              
            />
          <div className={`${profilePhoto} ${editProfilePhotoWrap}`}>
            <label htmlFor="imageInput">
              <div className={editProfilePhotoFilter}>
                <div className={editPhoto}>
                  Edit
                  <CameraIcon />
                </div>
                <div className={`${profileImg} ${editProfileImg}`} style={
                  profileImage && {backgroundImage: `url('${profileImage}')`
                  }}></div>
              </div>
            </label>
          </div>
          <div className={`${editNameWrap} field`}>
          <label className={`${editNameLabel} label`}>
            Edit:
            <div className={`${formFlex} control`}>
              <input 
                className={`${editFirstNameField} input`} 
                name="first" value={editedName.first} 
                onChange={handleFormChange} 
                type="text">
              </input>
              <input 
                className={`${editLastNameField} input`} 
                name="last" value={editedName.last} 
                onChange={handleFormChange} 
                type="text">
              </input>
            </div>
          </label>
        </div>
          <h2 className={profileUserTitle}>Event Organizer</h2>
          {/* <div className={location}>
            <LocationPin />
            <small className={profileSmall}>San Francisco, California</small>
          </div> */}
          <div className={eventNumbers}>
            <div className={`created ${evNum}`}>
              <h4>Events Created</h4>
              <h4>{created}</h4>
            </div>
            <div className={`saved ${evNum}`}>
              <h4>Events Saved</h4>
              <h4>{saved}</h4>
            </div>
            <div className={`attended ${evNum}`}>
              <h4>Events Attended</h4>
              <h4>{attending}</h4>
            </div>
            <button onClick={e => {
              e.preventDefault()
              updateInfo()
            }}>Submit changes</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditUserForm