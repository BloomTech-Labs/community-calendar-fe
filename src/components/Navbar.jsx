import React from 'react'
import {useAuth0} from '../contexts/auth0-context.jsx'
import {navbar, searchbar} from './style_modules/Navbar.module.scss'
import CCLogo from './CCLogo'
import NavbarSearch from './NavbarSearch'

export default function Navbar() {
  const {
    isLoading,
    user,
    loginWithRedirect,
    logout,
    getTokenSilently,
  } = useAuth0()

  return (
    <nav
      className={`${navbar} navbar has-background-white is-fixed-top columns `}
    >
      <div className='column is-narrow'>
        <a
          href='https://communitycalendar.netlify.com'
          title='Go to CommunityCalendar.netlify.com'
        >
          <CCLogo dimensions={35} />
        </a>
      </div>
      <div className='column is-one-quarter'>
        <NavbarSearch />
      </div>
      <div className='column'></div>
      <div className='column is-narrow '>
        <button className='has-text-weight-bold is-size-5'>Sign In</button>
      </div>
      <div className='column is-narrow is-size-5'>
        <button>Sign Up</button>
      </div>
    </nav>
  )
}
