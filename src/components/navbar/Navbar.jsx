import React, {useRef, useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import gql from 'graphql-tag'
import navUtils from './navbar_utils'
import {useDropdown} from '../../utils'
import loadable from '@loadable/component'

//components
import {CCLogo, MapMarkerCircle, DropdownIcon} from '../icons'
import Searchbar from '../searchbar/Searchbar'
import LoadingDots from '../loading/LoadingDots'

//styles
import {
  navButton,
  locationContent,
  closeButton,
  navatar,
} from './Navbar.module.scss'

// Apollo
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {
  GET_CACHE,
  GET_USER_PICTURE,
  GET_USER_PICTURE_FROM_CACHE,
} from '../../graphql'

//Okta
import {useOktaAuth} from '@okta/okta-react'

const Geocoder = loadable(
  () => import(/* webpackChunkName: "geocoder" */ '../geocoder/Geocoder'),
  {
    fallback: (
      <div className='is-flex justify-center'>
        <LoadingDots />
      </div>
    ),
  },
)

export default function Navbar() {
  const pageLocation = useLocation()

  const client = useApolloClient()
  const {data: localCache} = useQuery(GET_CACHE)
  const {data: userImage} = useQuery(GET_USER_PICTURE)
  const {data: profileImageFromCache} = useQuery(GET_USER_PICTURE_FROM_CACHE)

  const {authState, authService} = useOktaAuth()
  const [user, setUser] = useState(null)
  const login = () => authService.login('/')
  const logout = () => authService.logout('/')

  useEffect(() => {
    if (userImage && userImage.user && userImage.user.profileImage) {
      client.writeQuery({
        query: GET_USER_PICTURE_FROM_CACHE,
        data: {
          profileImage: userImage.user.profileImage,
        },
      })
    }
  }, [userImage])

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUser(null)
    } else {
      authService.getUser().then((info) => {
        setUser(info)
      })
    }
  }, [authState, authService])

  // used to show/hide the dropdown menu
  const dropMenu = useRef(null)

  // drop down menu state
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false)
  const [locationIsOpen, setLocationIsOpen] = useDropdown(closeLocation, false)

  // close location dropdown if user clicks outside of it
  function closeLocation(e) {
    if (!/^location-geocoder/gi.test(e.target.getAttribute('data-id'))) {
      setLocationIsOpen(false)
    }
  }

  // used by geocoder to update local cache
  function setUserLocation(changes) {
    if (changes.selectedItem) {
      const place = {...changes.selectedItem}
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
    const profileDropdownTrigger = (e) => {
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
        <div className='navbar-end'>
          <div
            className={`dropdown  navDropdown ${
              locationIsOpen ? 'is-active' : ''
            }`}
            data-id='location-geocoder-wrapper'
          >
            <div
              role='button'
              className='dropdown-trigger level is-clickable hover-underline'
              aria-haspopup='true'
              aria-controls='dropdown-menu2'
              data-testid='location-geocoder-trigger'
              data-id='location-geocoder-trigger'
              onClick={() => setLocationIsOpen(!locationIsOpen)}
            >
              <span
                className={` is-size-5-desktop is-size-6-tablet no-outline-focus no-pointer-events`}
              >
                My Location
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
              className={` dropdown-menu drop-center ${
                locationIsOpen ? 'is-active' : ''
              }`}
              id='location-dropdown-menu '
              role='menu'
              style={{minWidth: '250px'}}
            >
              <div
                className='dropdown-content '
                data-id='location-geocoder-dropdown'
              >
                <div
                  className={locationContent}
                  data-id='location-geocoder-dropdown-content'
                >
                  {localCache.userAddress && (
                    <p
                      data-id='location-geocoder-address-box'
                      className='level-left'
                      style={{marginBottom: '8px'}}
                    >
                      <span data-id='location-geocoder-icon' className='level'>
                        <MapMarkerCircle />
                      </span>
                      <span
                        data-id='location-geocoder-address'
                        style={{marginLeft: '8px'}}
                      >
                        {localCache.userAddress}
                      </span>
                    </p>
                  )}
                  <Geocoder
                    labelText='Enter Location:'
                    onSelectedItemChange={setUserLocation}
                    dataIdPrefix='location-geocoder'
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
            className={`has-text-centered is-size-6-tablet  is-size-5-desktop ${navButton} no-outline-focus`}
            onClick={() => setNavMenuIsOpen(false)}
          >
            Events
          </Link>

          {user ? (
            /* user has logged in */
            <>
              <Link
                to='/create-event'
                className={`${navButton} is-size-6-tablet is-size-5-desktop no-border no-outline-focus`}
                role='button'
                onClick={() => setNavMenuIsOpen(false)}
              >
                Create Event
              </Link>

              <Link
                to={'/myprofile'}
                role='button'
                className={`is-hidden-tablet is-flex has-text-centered ${navButton} no-outline-focus`}
                onClick={() => setNavMenuIsOpen(false)}
              >
                My Profile
              </Link>

              <div
                role='button'
                className={` is-hidden-tablet is-flex has-text-centered ${navButton} is-clickable no-outline-focus`}
                onClick={logout}
              >
                Log Out
              </div>
              <Link
                to='/about-us'
                role='button'
                className={`has-text-centered is-size-6-tablet is-size-5-desktop ${navButton} no-outline-focus`}
                onClick={() => setNavMenuIsOpen(false)}
              >
                About
              </Link>
              <div
                className={`dropdown is-right is-hidden-mobile is-clickable`}
              >
                <div
                  className='dropdown-trigger is-round'
                  aria-haspopup='true'
                  aria-controls='dropdown-menu2'
                  data-testid='nav-dropdown-trigger'
                  data-id='navbar-profile-dropdown'
                >
                  <img
                    src={`${
                      profileImageFromCache &&
                      profileImageFromCache.profileImage
                    }`}
                    className={`${navatar} is-round`}
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
                    {/* <div className='dropdown-item'>Profile</div> */}
                    <Link
                      to='/myprofile'
                      className='dropdown-item is-clickable'
                    >
                      My Profile
                    </Link>
                    <div
                      className='dropdown-item is-clickable'
                      onClick={logout}
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
                onClick={login}
                className={`${navButton} has-text-weight-bold is-size-6-tablet is-size-5-desktop no-outline-focus `}
              >
                Sign In
              </button>
              <button
                onClick={login}
                className={`${navButton}  is-size-6-tablet  is-size-5-desktop no-outline-focus `}
              >
                Sign Up
              </button>
              <Link
                to='/about-us'
                role='button'
                className={`has-text-centered is-size-5-tablet ${navButton} no-outline-focus`}
                onClick={() => setNavMenuIsOpen(false)}
              >
                About
              </Link>
            </>
          )}
        </div>
        {/* navbar-end */}
      </div>
      {/* navbar-menu */}
    </nav>
  )
}
