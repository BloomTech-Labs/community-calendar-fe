import React, { useState } from 'react'

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import ErrorModal from '../event_forms/ErrorModal'
import NoAuth0Form from './NoAuth0Form'
import HasAuth0Form from './HasAuth0Form'

// utils
import {fetchGeocode} from '../../utils'

// icons
import LocationPin from '../icons/LocationPin'

// styles
import UploadIcon from '../icons/UploadIcon'
import {
  editUserForm,
  profilePhoto,
  profileUserName,
  profileUserTitle,
  location,
  eventNumbers,
  evNum,
  aboutUser,
  profileSmall,
  hasA0Msg,
  hasA0Wrapper,
  hasA0Name
} from './UserProfile.module.scss'

const EditUserForm = () => {

  const [ hasProfile, setHasProfile ] = useState(true);


  return (
    <div className={editUserForm}>  
      {hasProfile ? 
        (
          <HasAuth0Form />
        ) : (
          <NoAuth0Form />
        )
      }
      

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
        <p>Edit About me Text Area</p>
      </div>
    </div>
  )
}

export default EditUserForm