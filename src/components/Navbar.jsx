import React from 'react'
import {navbar} from './style_modules/Navbar.module.scss'
import CCLogo from './CCLogo'

export default function Navbar() {
  return (
    <nav className={`${navbar} has-background-info nav-bar level`}>
      <CCLogo />
      <div>
        <button className='navbar-item'>Community Calendar</button>
      </div>
      <h3 className='butler-font'>Butler Font</h3>
    </nav>
  )
}
