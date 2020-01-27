import React from 'react'

import GearIcon from '../icons/GearIcon'

import {
  userProfile,
  profileInfo,
  userInfo,
  userEvents
} from './UserProfile.module.scss'

const UserProfile = () => {
  return (
    <div className={userProfile}>
      <div className={profileInfo}>
        <GearIcon />
        <div className={userInfo}>
        
        </div>
      </div>
      <div className={userEvents}>
        <p>User Events</p>
      </div>
    </div>
  )
}

export default UserProfile