import React from 'react'
import {navsearch} from '../style_modules/Navbar.module'

const NavbarSearch = () => (
  <div className={`${navsearch} navbar-start control`}>
    <input
      className={` input`}
      style={{borderRadius: '6px', width: '350px'}}
      type='text'
      placeholder='Search'
    />
  </div>
)

export default NavbarSearch
