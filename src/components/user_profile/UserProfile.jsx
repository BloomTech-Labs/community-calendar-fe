import React, { useState } from 'react'

import UserInfo from './UserInfo'
import UserEvents from './UserEvents'
import EditUserForm from './EditUserForm'
import GearIcon from '../icons/GearIcon'

import {
  userProfile,
  profileInfo,
  profileSmall,
  gearWrapper,
  hideText
} from './UserProfile.module.scss'

const UserProfile = () => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={userProfile}>
      <div className={profileInfo}>
        <div className={gearWrapper} onClick={() => setIsEditing(!isEditing)}>
          <GearIcon isActive={isEditing} />
          {isEditing && <small className={`${profileSmall} ${hideText}`}>save changes</small>}
        </div>
        {isEditing ? <EditUserForm /> : <UserInfo />}
      </div>
      <UserEvents/>
      />
    </div>
  )
}

export default UserProfile