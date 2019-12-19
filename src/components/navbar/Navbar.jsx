import React, {useRef} from 'react'
import {useAuth0} from '../../contexts/auth0-context.jsx'
import {
  navbar,
  profileButton,
  navsearch,
} from '../style_modules/Navbar.module.scss'
import CCLogo from 'icons/CCLogo'
import NavbarSearch from './NavbarSearch'

export default function Navbar() {
  const {user, loginWithRedirect, logout} = useAuth0()
  const dropContainer = useRef(null)
  const toggleDropdown = () => {
    dropContainer.current.classList.toggle('is-active')
  }

  return (
    <nav className={`${navbar} navbar has-background-white is-fixed-top  `}>
      <div className='navbar-brand'>
        <a
          className='is-flex level is-marginless'
          href={window.location.origin}
          title='Go to CommunityCalendar.netlify.com'
        >
          <CCLogo dimensions={35} />
        </a>
      </div>
      <div className='navbar-menu'>
        <div className={`navbar-start  ${navsearch}`}>
          <NavbarSearch />
        </div>
        <div className='navbar-end'>
          {user ? (
            <div className='dropdown is-right ' ref={dropContainer}>
              <div className='dropdown-trigger'>
                <button
                  onClick={toggleDropdown}
                  className={`${profileButton} is-paddingless is-marginless`}
                  aria-haspopup='true'
                  aria-controls='dropdown-menu6'
                >
                  <img className='is-rounded' src={user.picture} alt='' />
                </button>
              </div>
              <div className='dropdown-menu' id='dropdown-menu6' role='menu'>
                <div className='dropdown-content'>
                  <div
                    className='dropdown-item'
                    onClick={() => logout({returnTo: window.location.origin})}
                  >
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='column is-narrow '>
                <button
                  onClick={loginWithRedirect}
                  className='button navbutton has-text-weight-bold is-size-5'
                >
                  Sign In
                </button>
                <button
                  onClick={loginWithRedirect}
                  className='button navbutton is-size-5'
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
        {/* navbar end*/}
      </div>{' '}
      {/* navbar menu*/}
    </nav>
  )
}
/* 
        <div className='column is-narrow '>
          <button
            onClick={() => logout({returnTo: window.location.origin})}
            className='button is-size-5'
          >
            Log Out
          </button>
        </div>
 */
