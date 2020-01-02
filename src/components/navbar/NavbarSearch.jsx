import React from 'react'
import {navsearch} from './Navbar.module.scss'

const NavbarSearch = () => (
  <div className={`${navsearch} navbar-start control`}>
    <input className={` input`} type='text' placeholder='Search' />
  </div>
)

export default NavbarSearch
