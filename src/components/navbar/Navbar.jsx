import React, {useState, useRef, useEffect} from 'react'
import {useAuth0} from '../../contexts/auth0-context.jsx'
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga'

//components
import CCLogo from '../icons/CCLogo'
import NavbarSearch from './NavbarSearch'

//styles
import {cc_navbar} from '../style_modules/Navbar.module.scss'

export default function Navbar() {
  const {user, loginWithRedirect, logout} = useAuth0()
  console.log('auth0 context user', user)

  // used to show/hide the dropdown menu
  const dropMenu = useRef(null)
  /* 
if the dropdown menu is open and the user clicks 
outside of it close the dropdown menu
 */
  useEffect(() => {
    const wasDropdownClicked = e => {
      // if user clicks div.dropdown-trigger toggle the menu
      if (/dropdown-trigger/g.test(e.target.className)) {
        dropMenu.current.classList.toggle('is-active')
        // if clicks outside of dropdown menu close menu
      } else if (!/(dropdown-(trigger|content))/g.test(e.target.className)) {
        dropMenu.current.classList.remove('is-active')
      }
    }
    // add event listener
    window.addEventListener('click', wasDropdownClicked)
    // remove event listener when navbar is dismounted
    return () => {
      window.removeEventListener('click', wasDropdownClicked)
    }
  }, [])

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
      className={`${cc_navbar} navbar has-background-white is-fixed-top `}
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
              <div ref={dropMenu} className={`dropdown is-right`}>
                <div
                  className='dropdown-trigger is-flex'
                  aria-haspopup='true'
                  aria-controls='dropdown-menu2'
                >
                  <img
                    src={`${user.picture}`}
                    className='is-round'
                    width='35'
                    height='35'
                    alt=''
                  />
                </div>
                <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                  <div className='dropdown-content'>
                    <div className='dropdown-item'>Profile</div>
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
