import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import {useAuth0} from '../../contexts/auth0-context'

const PrivateRoute = ({component: Component, path, ...rest}) => {
  const {loading, isAuthenticated, loginWithRedirect} = useAuth0()

  useEffect(() => {
    // if the user is authenticated they will be moved to the page they requested
    if (loading || isAuthenticated) {
      return
    }
    // else send the user to the login page.
    // redirect back to request page after successful login
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: path},
      })
    }
    fn()
  }, [loading, isAuthenticated, loginWithRedirect, path])

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
