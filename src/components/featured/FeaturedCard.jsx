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

export default function FeaturedCard(props) {
  const {item} = props

  return (
    <Link className={`${featuredCard}`} to={`events/${item.id}`}>
      <img
        className={eventImage}
        src={item.event_images[0].url}
        alt='Event image'
      />

      <div className={featuredCardContent}>
        <p>
          <time className='subtitle is-7' dateTime='2016-1-1'>
            January 17, 2020
          </time>
        </p>
        <p className='is-6 Butler has-text-weight-bold'>{item.title}</p>
        <p>
          <time className='subtitle is-size-7' dateTime='2016-1-1'>
            5:00 pm - 10:00 pm
          </time>
        </p>
        <p className='is-size-7 has-text-weight-bold'>
          <span className='has-text-weight-light'>Location: </span>142 Main St.,
          Anywhere
        </p>
      </div>
    </Link>
  )
}

FeaturedCard.propTypes = {
  item: PropTypes.object,
}
