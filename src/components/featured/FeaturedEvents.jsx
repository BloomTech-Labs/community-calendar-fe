import React from 'react'
import PropTypes from 'prop-types'

//components
import FeaturedCard from './FeaturedCard.jsx'
import LoadingLogo from '../loading/LoadingLogo'

//styles
import {featuredWrapper} from './Featured.module.scss'

const FeaturedEvents = ({apolloData: {data, loading, error}}) => {
  return (
    <section className='section'>
      <h3 className='is-family-secondary is-size-2 has-text-black-bis'>
        Featured
      </h3>
      {/*carousel container*/}
      <div className={`${featuredWrapper} `}>
        {loading && <LoadingLogo />}
        {error && <p>ERROR</p>}
        {/* map over events and create cards */}
        {!loading &&
          data &&
          data.events.map(event => (
            <FeaturedCard key={event.id} item={event} />
          ))}
        {!loading && data && !data.events.length && (
          <div className='container'>
            <h5 className='has-text-centered color_chalice'>
              No events found for the selected date(s)
            </h5>
          </div>
        )}
      </div>
    </section>
  )
}

FeaturedCard.propTypes = {
  apolloData: PropTypes.object,
}

export default FeaturedEvents
