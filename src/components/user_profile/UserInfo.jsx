import React from 'react'

import {
  userInfo,
  profilePhoto,
  profileUserName,
  profileUserTitle,
  location
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
        <small>San Francisco, California</small>
      </div>
    </div>
  ) 
}

export default UserInfo