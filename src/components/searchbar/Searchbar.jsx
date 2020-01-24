import React, {useState, useEffect} from 'react'
import {searchbar, searchbarInput} from './Searchbar.module.scss'
import {useHistory} from 'react-router-dom'
import {buildQS} from '../../utils'

const Searchbar = props => {
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
    <div className={`  control justify-center is-relative ${searchbar}`}>
      <input
        className={searchbarInput}
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
        className={`button small-btn is-size-7 is-primary  ${
          !searchText.length ? 'willFadeIn' : 'fadeIn'
        }`}
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  )
}

export default Searchbar
