import React, {useRef, useState, useEffect} from 'react'
import {useAuth0} from '../../contexts/auth0-context.jsx'
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga'
import gql from 'graphql-tag'
import navUtils from './navbar_utils'

//components
import {CCLogo, MapMarkerCircle, DropdownIcon} from 'icons'
import NavbarSearchBox from './NavbarSearchBox'
import Geocoder from 'geocoder/Geocoder'

//styles
import {navButton, locationContent, closeButton} from './Navbar.module.scss'

// Apollo
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_CACHE} from '../../graphql'

export default function Navbar() {
  const client = useApolloClient()
  const {data: localCache} = useQuery(GET_CACHE)
  console.log('localCache', localCache)

  const {user, loginWithRedirect, logout} = useAuth0()

  // used to show/hide the dropdown menu
  const dropMenu = useRef(null)
  const locationMenu = useRef(null)

  // drop down menu state
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false)
  const [locationIsOpen, setLocationIsOpen] = useState(false)

  // used by geocoder to update local cache
  function setUserLocation(changes) {
    console.log('Geocoder changes in Navbar', changes)
    if (changes.selectedItem) {
      const place = {...changes.selectedItem}
      console.log(' selected place', place)
      //update user data in local cache
      client.writeData({
        data: {
          userAddress: place.place_name.replace(/united states$/i, 'US'),
          userLatitude: place.geometry.coordinates[1],
          userLongitude: place.geometry.coordinates[0],
        },
      })
    }
  }

  useEffect(() => {
    const profileDropdownTrigger = e => {
      // if user clicks div.dropdown-trigger toggle the menu&&
      if (e.target.getAttribute('data-id') === 'navbar-profile-dropdown') {
        dropMenu.current.classList.toggle('is-active')
        // if user clicks outside of dropdown menu close menu
      } else if (!/(dropdown-(trigger|content))/g.test(e.target.className)) {
        dropMenu.current.classList.remove('is-active')
      }
    } // end profileDropdownTrigger

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
    }
  }, [user])

  return (
    <nav
      className={`${
        navMenuIsOpen ? 'is-active' : ''
      } navbar has-background-white is-fixed-top `}
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
          className={`navbar-burger burger is-hidden-tablet ${
            navMenuIsOpen ? 'is-active' : ''
          }`}
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarMenu'
          data-id='hamburger-icon'
          onClick={() => setNavMenuIsOpen(!navMenuIsOpen)}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>{' '}
      {/* end navbar-brand */}
      <div
        className={`navbar-menu ${navMenuIsOpen ? 'is-active' : ''}`}
        id='navbarMenu'
        data-id='navbar-menu'
      >
        <div className='navbar-start '>
          <div className='is-hidden-mobile'>
            {' '}
            <NavbarSearchBox />
          </div>
        </div>
        <div className='navbar-end'>
          <div
            className={`dropdown  navDropdown ${
              locationIsOpen ? 'is-active' : ''
            }`}
          >
            <div
              role='button'
              className='dropdown-trigger level is-clickable hover-underline'
              aria-haspopup='true'
              aria-controls='dropdown-menu2'
              data-testid='location-dropdown-trigger'
              data-id='location-dropdown'
              onClick={() => setLocationIsOpen(!locationIsOpen)}
            >
              <span
                className={` is-size-5-tablet no-outline-focus no-pointer-events`}
              >
                Location
              </span>
              <span
                className={`${
                  locationIsOpen ? 'flip' : ''
                } no-pointer-events icon`}
                style={{transition: 'transform 0.2s'}}
              >
                <DropdownIcon />
              </span>
            </div>
            <div
              className={` dropdown-menu drop-center `}
              id='location-dropdown-menu '
              role='menu'
              ref={locationMenu}
            >
              <div className='dropdown-content '>
                <div className={locationContent}>
                  {localCache.userAddress && (
                    <p data-id='address-box'>
                      <span>
                        <MapMarkerCircle />
                      </span>
                      <span>{localCache.userAddress}</span>
                    </p>
                  )}
                  <Geocoder
                    labelText='Enter Location:'
                    onSelectedItemChange={setUserLocation}
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
                <div
                  className='dropdown-menu'
                  id='dropdown-menu'
                  role='menu'
                  ref={dropMenu}
                >
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
