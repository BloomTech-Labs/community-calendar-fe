import React, {useState, useEffect} from 'react'
import {navsearch} from './Navbar.module.scss'
import {useHistory} from 'react-router-dom'

/* 
This component appears in the NavBar.
*/
const NavbarSearchBox = props => {
  const [searchText, setSearchText] = useState('')
  const rccHistory = useHistory()

  const handleChange = e => {
    setSearchText(e.target.value)
  }

  const handleSearchClick = () => {
    if (searchText.length) {
      rccHistory.push(`/search/${searchText}`)
    }
  }

  return (
    <div className={` navbar-search control justify-center`}>
      <input
        className={` input navbar-search-input`}
        type='text'
        placeholder='Search'
        onChange={e => handleChange(e)}
        value={searchText}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            handleSearchClick()
          }
        }}
      />
    </div>
  )
}

export default NavbarSearchBox
