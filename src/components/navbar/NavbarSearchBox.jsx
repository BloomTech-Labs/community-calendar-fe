import React, {useState, useEffect} from 'react'
import {navsearch} from './Navbar.module.scss'
import {useHistory} from 'react-router-dom'
import {buildQS} from '../../utils'

/* 
This component appears in the NavBar.
*/
const NavbarSearchBox = props => {
  const [searchText, setSearchText] = useState('')
  const rccHistory = useHistory()

  const handleChange = e => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    //encode text to query string searchtext=stuff
    const qs = buildQS({searchText})
    // push to /search with query string
    rccHistory.push(`/search${qs}`)
  }

  return (
    <div className={` navbar-search control justify-center is-relative `}>
      <input
        className={` input navbar-search-input border-radius`}
        type='text'
        placeholder='Search'
        onChange={e => handleChange(e)}
        value={searchText}
        onKeyDown={e => {
          if (e.keyCode === 13 && searchText.length) {
            handleSearch()
          }
        }}
      />
      <button
        className={`button small-btn is-size-7 is-primary ${
          !searchText.length ? 'willFadeIn' : 'fadeIn'
        }`}
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  )
}

export default NavbarSearchBox
