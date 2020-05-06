import React from 'react'
import {buildQS, createQSObj} from '../../utils'
import {useHistory} from 'react-router-dom'

const RecentSearches = ({
  recentSearches = null,
  setTags,
  setLocation,
  setDateRange,
  setPrice010,
  setPrice1020,
  setPrice2040,
  setPrice4080,
  setPrice80,
}) => {
  const rccHistory = useHistory()

  return (
    <div className='is-flex'>
      <p className='has-text-grey-lighter'>
        Recent Searches:&nbsp;
        {recentSearches &&
          recentSearches.map((search, ind) => {
            // determine how many filters were applied to search
            let filterCount = Object.keys(search).reduce((acc, curr) => {
              return !/(index)|(__typename)/i.test(curr) && search[curr]
                ? (acc += 1)
                : acc
            }, 0)

            let qs = buildQS(
              createQSObj(search.index, search, search.filterAddress),
            )

            return (
              <span
                key={`${JSON.stringify(search)}-${ind} `}
                onClick={() => {
                  setLocation(search.location ? {...search.location} : {})

                  setDateRange(
                    search.dateRange
                      ? {
                          start: search.dateRange.start,
                          end: search.dateRange.end,
                        }
                      : {},
                  )

                  setTags(search.tags ? search.tags : [])

                  setPrice010(
                    search.ticketPrice
                      ? search.ticketPrice.some(
                          (pr) => pr.minPrice === 0 && pr.maxPrice === 10,
                        )
                      : false,
                  )

                  setPrice1020(
                    search.ticketPrice
                      ? search.ticketPrice.some(
                          (pr) => pr.minPrice === 10 && pr.maxPrice === 20,
                        )
                      : false,
                  )

                  setPrice2040(
                    search.ticketPrice
                      ? search.ticketPrice.some(
                          (pr) => pr.minPrice === 20 && pr.maxPrice === 40,
                        )
                      : false,
                  )

                  setPrice4080(
                    search.ticketPrice
                      ? search.ticketPrice.some(
                          (pr) => pr.minPrice === 40 && pr.maxPrice === 80,
                        )
                      : false,
                  )

                  setPrice80(
                    search.ticketPrice
                      ? search.ticketPrice.some(
                          (pr) =>
                            pr.minPrice === 80 && pr.maxPrice === 100000000,
                        )
                      : false,
                  )

                  // On user search, the components / page will not rereender, instead it will add on
                  //  to the existing URL with what the user searches for, this however effects only the url
                  // for user feedback
                  window.history.pushState(null, null, `${qs}`)
                  // injects what the user searches for in location.search
                  rccHistory.location.search = `${qs}`
                }}
                className='has-text-link is-clickable'
              >
                {/* display an asterisk if search.index is undefined */}
                {`${search.index ? search.index : '*'}${
                  filterCount ? `(${filterCount})` : ''
                }`}
                {ind !== recentSearches.length - 1 && ', '}
              </span>
            )
          })}
      </p>
    </div>
  )
}

export default RecentSearches
