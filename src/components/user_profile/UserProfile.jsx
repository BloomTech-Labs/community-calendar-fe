import React, { useState } from 'react'

import UserInfo from './UserInfo'
import UserEvents from './UserEvents'
import EditUserForm from './EditUserForm'
import GearIcon from '../icons/GearIcon'

import {
  userProfile,
  profileInfo
} from './UserProfile.module.scss'

const UserProfile = () => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={userProfile}>
      <div className={profileInfo}>
        <div onClick={() => setIsEditing(!isEditing)}>
          <GearIcon isActive={isEditing} />
        </div>
        {isEditing ? <EditUserForm /> : <UserInfo />}
      </div>
      <UserEvents />
    </div>
  )
}

export default UserProfile