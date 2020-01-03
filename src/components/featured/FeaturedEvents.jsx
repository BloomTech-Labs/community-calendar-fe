import React from 'react'
import PropTypes from 'prop-types'

//components
import FeaturedCard from './FeaturedCard.jsx'

//styles
import {featuredWrapper} from './Featured.module.scss'

const FeaturedEvents = ({apolloData: {data, loading, error}}) => {
  return (
    <section className='section'>
      <h3 className='is-family-secondary is-size-2 has-text-black-bis'>
        Featured
      </h3>
      <div className={`${featuredWrapper} `}>
        {loading && <p>LOADING</p>}
        {error && <p>ERROR</p>}
        {data &&
          data.events
            .slice(0, 6)
            .map((event, idx) => <FeaturedCard key={idx} item={event} />)}
      </div>
    </section>
  )
}

FeaturedCard.propTypes = {
  apolloData: PropTypes.object,
}

export default FeaturedEvents
