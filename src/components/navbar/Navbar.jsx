import React from 'react'
import {useAuth0} from '../../contexts/auth0-context.jsx'
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga'

//components
import CCLogo from 'icons/CCLogo'
import NavbarSearch from './NavbarSearch'

//styles
import {navbar} from '../style_modules/Navbar.module.scss'

export default function Navbar() {
  const {user, loginWithRedirect, logout} = useAuth0()

  const handleLogin = event => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Login',
    })
    loginWithRedirect()
  }

  const handleLogout = event => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Logout',
    })
    logout({returnTo: window.location.origin})
  }

  return (
    <nav
      className={`${navbar} navbar has-background-white is-fixed-top `}
      role='navigation'
      aria-label='main navigation'
    >
      <Link
        className='navbar-brand'
        to='/'
        title='Go to CommunityCalendar.netlify.com'
      >
        <CCLogo dimensions={35} />
      </Link>
      <div className='navbar-menu'>
        <NavbarSearch />
        <div className='navbar-end'>
          {user ? (
            <button onClick={handleLogout} className='button is-size-5'>
              Log Out
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className='button has-text-weight-bold is-size-5'
              >
                Sign In
              </button>
              <button onClick={handleLogin} className='button is-size-5'>
                Sign Up
              </button>
            </>
          )}
        </div>
        {/* navbar-end */}
      </div>
      {/* navbar-menu */}
    </nav>
  )
}
