import React from 'react'
import {useAuth0} from '../contexts/auth0-context.jsx'
import {navbar, searchbar} from './style_modules/Navbar.module.scss'
import CCLogo from './CCLogo'
import NavbarSearch from './NavbarSearch'

export default function Navbar() {
  const {user, loginWithRedirect, logout} = useAuth0()

  return (
    <nav
      className={`${navbar} navbar has-background-white is-fixed-top columns level `}
    >
      <div className='column is-narrow is-flex level is-marginless'>
        <a
          className='is-flex level is-marginless'
          href='https://communitycalendar.netlify.com'
          title='Go to CommunityCalendar.netlify.com'
        >
          <CCLogo dimensions={35} />
        </a>
      </div>
      <div className='column   is-flex level is-marginless'>
        <NavbarSearch />
      </div>
      {user ? (
        <div className='column is-narrow '>
          <button
            onClick={() => logout({returnTo: window.location.origin})}
            className='button is-size-5'
          >
            Log Out
          </button>
        </div>
      ) : (
        <>
          <div className='column is-narrow '>
            <button
              onClick={loginWithRedirect}
              className='button has-text-weight-bold is-size-5'
            >
              Sign In
            </button>
            {/* </div> */}
            {/* <div className='column is-narrow '> */}
            <button className='button is-size-5'>Sign Up</button>
          </div>
        </>
      )}
    </nav>
  )
}
