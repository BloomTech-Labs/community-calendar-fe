import React from 'react'
import {useAuth0} from '../contexts/auth0-context.jsx'
import {useQuery} from '@apollo/react-hooks'
import GET_USERS from '../graphql/users.query'

export default function Header() {
  const {isLoading, user, loginWithRedirect, logout} = useAuth0()

  //just to test making a request to apollo server
  const {data, loading, error} = useQuery(GET_USERS)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }

  if (user && data) {
    console.log(data)
  }

  return (
    <header className='has-background-info'>
      <nav>
        <div>
          <button className='navbar-item'>Community Calendar</button>
        </div>
        <div>
          {!isLoading && !user && (
            <button onClick={loginWithRedirect}>Login</button>
          )}

          {!isLoading && user && (
            <>
              <button>{user.name}</button>
              <button
                onClick={() => logout({returnTo: window.location.origin})}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
