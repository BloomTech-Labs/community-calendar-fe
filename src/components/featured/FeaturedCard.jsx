import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//styles
import {
  featuredCard,
  featuredCardContent,
  eventImage,
} from './Featured.module.scss'

/*
Cards for the Featured Events carousel.
*/

export default function FeaturedCard(props) {
  const {item} = props
  let location = item.locations.length
    ? item.locations[item.locations.length - 1]
    : null

  return (
    <Link className={`${featuredCard}`} to={`events/${item.id}`}>
      {item.eventImages.length > 0 && (
        <img
          className={eventImage}
          src={item.eventImages[0].url}
          alt='Event image'
        />
      )}

      <div className={featuredCardContent}>
        <p>
          <time
            className='subtitle is-7'
            dateTime={moment(item.start).format('YYYY-MM-DD')}
          >
            {moment(item.start).format('MMMM DD, YYYY')}
          </time>
        </p>
        <p
          className='is-6 Butler has-text-weight-bold'
          style={{height: '48px'}}
        >
          {item.title}
        </p>
        <p>
          <time
            className='subtitle is-size-7'
            dateTime={moment(item.start).format('HH:mm')}
          >
            {moment(item.start).format('h:mm a')}
          </time>
          &nbsp;&#8208;&nbsp;
          <time
            className='subtitle is-size-7'
            dateTime={moment(item.end).format('HH:mm')}
          >
            {moment(item.end).format('h:mm a')}
          </time>
        </p>
        {location && (
          <p className='is-size-7 has-text-weight-bold'>
            <span className='has-text-weight-light'>Location: </span>
            {`${location.streetAddress}, ${location.city}`}
          </p>
        )}
      </div>
    </Link>
  )
}

FeaturedCard.propTypes = {
  item: PropTypes.object,
}
