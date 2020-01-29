import React from 'react'

const RecentSearches = ({recentSearches = null}) => {
  return (
    <div className='is-flex'>
      <p className='has-text-grey-lighter'>
        Recent Searches:&nbsp;
        {recentSearches && recentSearches.map( search =>{
  let filterCount = Object.keys(search).length - 1
        return <span className='has-text-link'>{`${search.index}${filterCount ? `(${filterCount})`: ''}`}</span>
        })}
      </p>
    </div>
  )
}

export default RecentSearches
