import React from 'react'
import {buildQS, createQSObj} from '../../utils'
import {useHistory} from 'react-router-dom'

const RecentSearches = ({recentSearches = null}) => {
  const rccHistory = useHistory()
  return (
    <div className='is-flex'>
      <p className='has-text-grey-lighter'>
        Recent Searches:&nbsp;
        {recentSearches.length &&
          recentSearches.map((search, ind) => {
            // determine how many filters were applied to search
            let filterCount = Object.keys(search).reduce((acc, curr) => {
              return !/(index)|(__typename)/i.test(curr) && search[curr]
                ? (acc += 1)
                : acc
            }, 0)

            return (
              <span
                key={`${JSON.stringify(search)}-${ind} `}
                onClick={() => {
                  console.log('search in RecentSearches', search)
                  let qsObj = createQSObj(
                    search.index,
                    search,
                    search.filterAddress,
                  )
                  rccHistory.push(`/search${buildQS(qsObj)}`)
                }}
                className='has-text-link is-clickable'
              >
                {`${search.index}${filterCount ? `(${filterCount})` : ''}`}
                {ind !== recentSearches.length - 1 && ', '}
              </span>
            )
          })}
      </p>
    </div>
  )
}

export default RecentSearches
