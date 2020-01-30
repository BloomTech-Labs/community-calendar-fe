import React from 'react'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import {
  profilePhoto,
  profileUserName,
  profileSmall,
  hasA0Wrapper,
  hasA0Msg,
  hasA0Name,
  location,
  eventNumbers,
  evNum,
  aboutUser,
  editTitle,
  editTitleWrap,
  editTitleField,
  editAboutMeWrap,
  editAboutMe,
  editAboutMeTextArea
} from './UserProfile.module.scss'

const HasAuth0Form = () => {
  return (
    <>
      <div className={`${profilePhoto} ${hasA0Wrapper}`}></div>
      <small className={`${profileSmall} ${hasA0Msg}`}>Photo and name imported from google</small>
      <h1 className={`${profileUserName} ${hasA0Name}`}>Cici Adams</h1>
      <div className={`${editTitleWrap} field`}>
        <label className={`${editTitle} label`}>
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

export default HasAuth0Form;