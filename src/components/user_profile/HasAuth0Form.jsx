import React from 'react'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import {
  profilePhoto,
  profileUserName,
  profileSmall,
  hasA0Wrapper,
  hasA0Msg,
  hasA0Name,
  profileUserTitle,
  location
} from './UserProfile.module.scss'

const HasAuth0Form = () => {
  return (
    <>
      <div className={`${profilePhoto} ${hasA0Wrapper}`}></div>
      <small className={`${profileSmall} ${hasA0Msg}`}>Photo and name imported from google</small>
      <h1 className={`${profileUserName} ${hasA0Name}`}>Cici Adams</h1>
      <h2 className={profileUserTitle}>Edit Title</h2>
      <div className={location}>
        <LocationPin />
        <small className={profileSmall}>San Francisco, CA</small>
      </div>
  </>
  )
}

export default HasAuth0Form;