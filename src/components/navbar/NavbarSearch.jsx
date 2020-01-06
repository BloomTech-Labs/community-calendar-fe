import React from 'react'
import {navsearch} from './Navbar.module.scss'

/* 
This component appears in the NavBar.
*/
const NavbarSearch = () => (
  <div className={`${navsearch} navbar-start control`}>
    <input className={` input`} type='text' placeholder='Search' />
  </div>
)

export default NavbarSearch
