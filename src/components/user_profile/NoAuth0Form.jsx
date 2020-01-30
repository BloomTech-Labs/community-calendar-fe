import React from 'react'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import {
  profilePhoto,
  location,
  profileSmall,
  eventNumbers,
  evNum,
  aboutUser,
  editTitleWrap,
  editTitle,
  editTitleField,
  editAboutMeWrap,
  editAboutMe,
  editNameWrap,
  editName,
  editNameField,
  editAboutMeTextArea
} from './UserProfile.module.scss'

const NoAuth0Form = () => {
  return (
    <>
      <div className={profilePhoto}>
        <p>img upload</p>
      </div>
      <div className={`${editNameWrap} field`}>
        <label className={`${editTitle} label`}>
          Edit Name:
          <div className="control">
            <input className={`${editNameField} input`} type="text" placeholder={`Cici Adams`}></input>
          </div>
        </label>
      </div>
      <div className={`${editTitleWrap} field`}>
        <label className={`${editName} label`}>
          Edit Role:
          <div className="control">
            <input className={`${editTitleField} input`} type="text" placeholder={`Event Organizer`}></input>
          </div>
        </label>
      </div>
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
      <div className={aboutUser}>
        <small className={profileSmall}>About Me</small>
        <div className={`${editAboutMeWrap} field`}>
          <label className={`${editAboutMe} label`}>
            Edit 'About Me':
            <div className="control">
              <textarea className={`${editAboutMeTextArea} textarea`} placeholder="About Me" ></textarea>
            </div>
          </label>
        </div>
      </div>
    </>
  )
}

export default NoAuth0Form;