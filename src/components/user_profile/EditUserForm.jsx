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



  // conditionally renders components based on Auth0
  return (
    <div className={editUserForm}>  
      {hasProfile ? 
        (
          <HasAuth0Form />
        ) : (
          <NoAuth0Form />
        )
      }
    </div>
  )
}

export default EditUserForm