import React from 'react'

import LocationPin from '../icons/LocationPin'

import {
  userInfo,
  profilePhoto,
  profileUserName,
  profileUserTitle,
  location,
  eventNumbers,
  evNum,
  aboutUser,
  profileSmall
} from './UserProfile.module.scss'

const UserInfo = () => {
  return (
    <div className={userInfo}>  
      <div className={profilePhoto}>
        <p>img placeholder</p>
      </div>
      <h1 className={profileUserName}>Cici Adams</h1>
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
  ) 
}

export default UserInfo