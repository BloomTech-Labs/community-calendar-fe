import React from 'react'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import {
  profilePhoto,
  profileUserName,
  profileUserTitle,
  location,
  profileSmall,
  eventNumbers,
  evNum,
  aboutUser
} from './UserProfile.module.scss'

const NoAuth0Form = () => {
  return (
    <>
      <div className={profilePhoto}>
        <p>img upload</p>
      </div>
      <h1 className={profileUserName}>Edit Name</h1>
      <h2 className={profileUserTitle}>Edit Title</h2>
      <div className={location}>
        <LocationPin />
        <small className={profileSmall}>San Francisco, CA</small>
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
        <p>Edit About me Text Area</p>
      </div>
    </>
  )
}

export default NoAuth0Form;