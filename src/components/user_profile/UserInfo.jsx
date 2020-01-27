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
      <div className={aboutUser}>
        <small className={profileSmall}>About Me</small>
        <p>I am an event organizer from the North End. I like to organize events that will leave an impact on the community. My mission is to unify communities in a fun and caring way.</p>
        <p>Want to connect with me? Feel free to reach out!</p>
      </div>
    </div>
  ) 
}

export default UserInfo