import React from 'react'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import {
  profilePhoto,
  profileUserName,
  profileUserTitle,
  location,
  profileSmall
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
    </>
  )
}

export default NoAuth0Form;