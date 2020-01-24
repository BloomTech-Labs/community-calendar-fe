import React, {useState, useEffect} from 'react'
import {
  searchbar,
  searchbarInput,
  searchbarInputLarge,
  large,
  searchbarInputSmall,
} from './Searchbar.module.scss'
import {useHistory} from 'react-router-dom'
import {buildQS} from '../../utils'
import {SearchIcon} from 'icons'

const Searchbar = ({isLarge}) => {
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
    // clear search text
    setSearchText('')
  }

  return (
    <div
      className={`   is-relative ${searchbar} ${
        isLarge ? `${large} is-size-3` : ''
      }`}
    >
      {isLarge && <SearchIcon dimensions={40} />}
      <input
        className={`${searchbarInput} ${
          isLarge ? searchbarInputLarge : searchbarInputSmall
        }`}
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
        className={`button small-btn  is-primary   ${
          !searchText.length && !isLarge ? 'willFadeIn' : 'fadeIn'
        }`}
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  )
}

export default Searchbar
