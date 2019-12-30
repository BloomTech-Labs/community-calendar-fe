import React, {useState} from 'react'
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
  // used to toggle dropdown
  const [showDropdown, setShowDropdown] = useState(false)

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
            <>
              <div className={`dropdown is-right is-hoverable`}>
                <div
                  class='dropdown-trigger is-flex'
                  aria-haspopup='true'
                  aria-controls='dropdown-menu2'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={`${user.picture}`}
                    className='is-round'
                    width='35'
                    height='35'
                    alt=''
                  />
                </div>
                <div class='dropdown-menu' id='dropdown-menu' role='menu'>
                  <div className='dropdown-content'>
                    <div className='dropdown-item' onClick={handleLogout}>
                      Log Out
                    </div>
                  </div>
                </div>
              </div>
            </>
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

/* className={`dropdown is-right is-hoverable ${
                  showDropdown ? 'is-active' : ''
                } `}*/
