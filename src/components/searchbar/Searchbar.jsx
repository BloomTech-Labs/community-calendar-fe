import React, {useState, useEffect} from 'react'
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import {
  GET_EVENTS_FILTERED,
  GET_CACHE,
  GET_RECENT_SEARCHES,
} from '../../graphql'
import {
  searchbar,
  searchbarInput,
  searchbarInputLarge,
  large,
  searchbarInputSmall,
} from './Searchbar.module.scss'
import {useHistory} from 'react-router-dom'
import {buildQS, createQSObj} from '../../utils'
import {SearchIcon} from 'icons'

const Searchbar = ({
  isLarge,
  cb,
  filters = null,
  setRecentSearches = null,
  recentSearches = null,
  initialText = '',
  address = null,
}) => {
  const [index, setIndex] = useState(initialText)
  const rccHistory = useHistory()

  const handleChange = e => {
    setIndex(e.target.value)
  }

  const handleSearch = () => {
    //encode text and filters to query string
    let qsObj = createQSObj(index, filters, address)

    // if use is on SearchResult page update the list of recent searches
    setRecentSearches && setRecentSearches([...recentSearches, qsObj])

    // push to /search with query string
    rccHistory.push(`/search${buildQS(qsObj)}`)

    // execute callback if provided
    cb && cb()
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
        value={index}
        onKeyDown={e => {
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
