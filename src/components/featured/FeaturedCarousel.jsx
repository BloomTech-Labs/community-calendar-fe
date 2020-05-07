import React from 'react'

//components
import FeaturedCard from './FeaturedCard.jsx'
import LoadingLogo from '../loading/LoadingLogo'

//styles
import {featuredWrapper} from './Featured.module.scss'

// Carousel
import ReactSimpleCarousel from 'react-spring-carousel'

function FeatCarousel({apolloData: {data, loading, error}}) {
  const filtered =
    !loading && data.events
      ? data.events
          .filter((i) => new Date(i.start) - new Date() > 0)
          .slice(0, 6)
      : null
  return (
    <section style={{paddingBottom: 0}} className='section mobile-section'>
      <h3 className='is-family-secondary is-size-3-mobile is-size-2-tablet has-text-black-bis'>
        Featured
      </h3>

      {/*carousel container*/}
      <div className={`${featuredWrapper}`}>
        {/* Render loading spinner during fetch */}
        {loading && <LoadingLogo />}

        {/* Render error message if loading fails */}
        {error && <p>ERROR</p>}

        {/* map over events and create cards */}
        {!loading && data && (
          <ReactSimpleCarousel slidesToShow={filtered.length}>
            {filtered.map((event) => (
              <FeaturedCard key={event.id} item={event} />
            ))}
          </ReactSimpleCarousel>
        )}

        {/* Render message if no events in data */}
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

export default FeatCarousel
