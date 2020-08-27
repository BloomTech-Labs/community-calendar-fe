import React from 'react'
import {LoginCallback} from '@okta/okta-react'
import {Redirect} from 'react-router-dom'

const ErrorRedirect = ({error}) => {
  // this is a copy/paste from this library's ./OktaError.js
  if (error.name && error.message) {
    console.log(error.name, error.message)
    return <Redirect to='/' />
  } else if (error) {
    console.log('Okta error', error.toString())

    return <Redirect to='/' />
  } else return null
}

const ImplicitCallback = () => <LoginCallback errorComponent={ErrorRedirect} />

export default ImplicitCallback
