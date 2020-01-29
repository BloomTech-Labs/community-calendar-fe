import React, { useState } from 'react'

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import ErrorModal from '../event_forms/ErrorModal'
import NoAuth0Form from './NoAuth0Form'
import HasAuth0Form from './HasAuth0Form'

// utils
import {fetchGeocode} from '../../utils'

// styles
import {
  editUserForm
} from './UserProfile.module.scss'


const EditUserForm = () => {

  const [ hasProfile, setHasProfile ] = useState(true);

  // conditionally renders components based on Auth0
  return (
    <form>
      <div className={editUserForm}>  
        {hasProfile ? 
          (
            <HasAuth0Form />
          ) : (
            <NoAuth0Form />
          )
        }
      </div>
    </form>
  )
}

export default EditUserForm