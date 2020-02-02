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

const UserInfo = ({first, last, image, attending, saved, created}) => {
  return (
    <div className={userInfo}>  
      <div className={profilePhoto} style={image && {backgroundImage: `url(${image})`}}/>
      <h1 className={profileUserName}>{first} {last}</h1>
      <h2 className={profileUserTitle}>Event Organizer</h2>
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
      </div>
    </div>
  ) 
}

export default UserInfo