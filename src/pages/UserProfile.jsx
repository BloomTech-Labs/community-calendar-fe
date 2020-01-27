import React, { useState } from 'react'
import PropTypes from 'prop-types'

//  Components
import GearIcon from 'icons/GearIcon'



import {
  userProfile,
  profileInfo,
  userEvents,
  userInfo
} from "./styles/UserProfile.module.scss"


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