import React, { useState } from 'react'
import PropTypes from 'prop-types'

//  Components
import UserProfile from '../components/user_profile/UserProfile'


const UserProfilePage = ({profileImage, setProfileImage}) => {
  return <UserProfile profileImage={profileImage} setProfileImage={setProfileImage}/>
}

export default UserProfilePage