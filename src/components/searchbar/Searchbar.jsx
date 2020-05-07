import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import {
  searchbar,
  searchbarInput,
  searchbarInputLarge,
  large,
  searchbarInputSmall,
} from './Searchbar.module.scss'

import {buildQS, createQSObj} from '../../utils'
import {SearchIcon} from '../icons'

const Searchbar = ({
  isLarge,
  cb,
  filters = null,
  setRecentSearches = null,
  setRecentSearchesLimited = null,
  recentSearches = null,
  initialText = '',
  address = null,
}) => {
  const [index, setIndex] = useState(initialText)
  const rccHistory = useHistory()

  const handleChange = (e) => {
    setIndex(e.target.value)
  }

  const handleSearch = () => {
    //encode text and filters to query string
    let qsObj = createQSObj(index, filters, address)

    // if use is on SearchResult page update the list of recent searches
    setRecentSearchesLimited &&
      setRecentSearchesLimited(recentSearches, setRecentSearches, {
        ...filters,
        index,
        filterAddress: address,
      })

    // On user search, the components / page will not rereender, instead it will add on
    //  to the existing URL with what the user searches for, this however effects only the url
    // for user feedback
    window.history.pushState(null, null, `${buildQS(qsObj)}`)
    // injects what the user searches for in location.search
    rccHistory.location.search = `${buildQS(qsObj)}`

    // execute callback if provided
    cb && cb()
  }

  useEffect(() => {
    setIndex(initialText)
  }, [initialText])

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
        onChange={(e) => handleChange(e)}
        value={index}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && index.length) {
            handleSearch()
          }
        }}
      />
      <button
        className={`button small-btn  is-primary   ${
          !index.length && !isLarge ? 'willFadeIn' : 'fadeIn'
        }`}
        onClick={() => {
          if (index.length) handleSearch()
        }}
      >
        Search
      </button>
    </div>
  )
}

Searchbar.propTypes = {
  isLarge: PropTypes.bool,
  cb: PropTypes.func,
  initialText: PropTypes.string,
}
export default Searchbar
