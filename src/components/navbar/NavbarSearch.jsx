import React, {useState} from 'react'
import {navsearch} from './Navbar.module.scss'

/* 
This component appears in the NavBar.
*/
const NavbarSearch = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = e => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    alert(searchText);
  }

  return (
    <div className={`${navsearch} navbar-start control`}>
      <input className={` input`} type='text' placeholder='Search' onChange={e => handleChange(e)} value={searchText}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default NavbarSearch
