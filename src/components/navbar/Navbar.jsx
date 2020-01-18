import React, {useRef, useState, useEffect} from 'react'
import {useAuth0} from '../../contexts/auth0-context.jsx'
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga'
import gql from 'graphql-tag'
import navUtils from './navbar_utils'

//components
import {CCLogo, MapMarkerCircle} from 'icons'
import NavbarSearchBox from './NavbarSearchBox'
import Geocoder from 'geocoder/Geocoder'

//styles
import {navButton} from './Navbar.module.scss'

// Apollo
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_CACHE} from '../../graphql'

export default function Navbar() {
  const {user, loginWithRedirect, logout} = useAuth0()

  // used to show/hide the dropdown menu
  const dropMenu = useRef(null)
  const hamburgerIcon = useRef(null)
  const navMenu = useRef(null)

  const [locationIsOpen, setLocationIsOpen] = useState(false)

  useEffect(() => {
    /* 
if the dropdown menu is open and the user clicks 
outside of it close the dropdown menu
 */
    const navMenuTrigger = e => {
      if (e.target.getAttribute('data-id') === 'hamburger-icon') {
        navMenu.current.classList.toggle('is-active')
        e.target.classList.toggle('is-active')
        // if user clicks outside of dropdown menu close menu
      } else if (!/(navbar*)/gi.test(e.target.className)) {
        hamburgerIcon.current.classList.remove('is-active')
        navMenu.current.classList.remove('is-active')
      }
    } // end profileDropdownTrigger

    const profileDropdownTrigger = e => {
      // if user clicks div.dropdown-trigger toggle the menu&&
      if (e.target.getAttribute('data-id') === 'navbar-profile-dropdown') {
        dropMenu.current.classList.toggle('is-active')
        // if user clicks outside of dropdown menu close menu
      } else if (!/(dropdown-(trigger|content))/g.test(e.target.className)) {
        dropMenu.current.classList.remove('is-active')
      }
    } // end profileDropdownTrigger

    window.addEventListener('click', navMenuTrigger)

    // add event listener if user object exists
    if (user) {
      window.addEventListener('click', profileDropdownTrigger)
      // remove event listener when navbar is dismounted
    } else {
      // remove event listener when user logs out
      window.removeEventListener('click', profileDropdownTrigger)
    }
    return () => {
      window.removeEventListener('click', profileDropdownTrigger)
      window.removeEventListener('click', navMenuTrigger)
    }
  }, [user])
  return (
    <nav
      className={` navbar has-background-white is-fixed-top `}
      role='navigation'
      aria-label='main navigation'
      data-id='navbar'
    >
      <div className='navbar-brand'>
        <Link to='/' title='Go to Community Calendar home page'>
          <CCLogo dimensions={35} />
        </Link>
        <div className='is-hidden-tablet'>
          <NavbarSearchBox />
        </div>
        <a
          role='button'
          className='navbar-burger burger is-hidden-tablet'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarMenu'
          data-id='hamburger-icon'
          ref={hamburgerIcon}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>{' '}
      {/* end navbar-brand */}
      <div
        className='navbar-menu'
        id='navbarMenu'
        data-id='navbar-menu'
        ref={navMenu}
      >
        <div className='navbar-start '>
          <div className='is-hidden-mobile'>
            {' '}
            <NavbarSearchBox />
          </div>
        </div>
        <div className='navbar-end'>
          <div className={`dropdown  ${locationIsOpen ? 'is-active' : ''}`}>
            <div
              className='dropdown-trigger is-flex is-clickable'
              aria-haspopup='true'
              aria-controls='dropdown-menu2'
              data-testid='location-dropdown-trigger'
              data-id='location-dropdown'
              onClick={() => setLocationIsOpen(!locationIsOpen)}
            >
              {/* <div role='button' className={`navbar-item has-dropdown `}> */}
              <button
                className={`${navButton} is-size-5-tablet no-outline-focus`}
              >
                Location
              </button>
              {/* </div> */}
            </div>
            <div
              className={` dropdown-menu drop-center`}
              id='location-dropdown-menu '
              role='menu'
            >
              <div className='dropdown-content '>
                <div className=''>
                  <Geocoder
                    labelText='Enter Location'
                    onSelectedItemChange={changes =>
                      console.log('selected item updated', changes)
                    }
                  />
                </div>
              </div>
              {/* end dropdown-content*/}
            </div>
            {/* end dropdown-menu*/}
          </div>

          <Link
            to='/'
            role='button'
            className={`has-text-centered is-size-5-tablet ${navButton} no-outline-focus`}
          >
            Events
          </Link>

          {user ? (
            /* user has logged in */
            <>
              <Link to='/create-event' className={`   color_shark`}>
                <button
                  className={`${navButton} is-size-5-tablet  no-border no-outline-focus`}
                >
                  Create Event
                </button>
              </Link>
              <Link
                to='#'
                role='button'
                className={` is-hidden-tablet  is-flex has-text-centered ${navButton} no-outline-focus`}
              >
                Profile
              </Link>
              <div
                role='button'
                className={` is-hidden-tablet  is-flex has-text-centered ${navButton} is-clickable no-outline-focus`}
                onClick={e => navUtils.handleLogout(e, logout)}
              >
                Log Out
              </div>
              <div
                ref={dropMenu}
                className={`dropdown is-right is-hidden-mobile is-clickable`}
              >
                <div
                  className='dropdown-trigger is-flex'
                  aria-haspopup='true'
                  aria-controls='dropdown-menu2'
                  data-testid='nav-dropdown-trigger'
                  data-id='navbar-profile-dropdown'
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
                    <div
                      className='dropdown-item is-clickable'
                      onClick={e => navUtils.handleLogout(e, logout)}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No user */
            <>
              <button
                onClick={e => navUtils.handleLogin(e, loginWithRedirect)}
                className={`${navButton} has-text-weight-bold is-size-5-tablet no-outline-focus `}
              >
                Sign In
              </button>
              <button
                onClick={e => navUtils.handleLogin(e, loginWithRedirect)}
                className={`${navButton}  is-size-5-tablet no-outline-focus `}
              >
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
