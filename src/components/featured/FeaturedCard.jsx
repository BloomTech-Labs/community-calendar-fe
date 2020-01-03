import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//styles
import {featuredCard, eventImage} from './Featured.module.scss'

export default function FeaturedCard(props) {
  const {item} = props

  return (
    <Link className={`card ${featuredCard}`} to={`events/${item.id}`}>
      <div className='card-image'>
        <img
          className={eventImage}
          src={item.event_images[0].url}
          alt='Event image'
        />
      </div>

      <div className='card-content'>
        <p>
          <time className='subtitle is-6' dateTime='2016-1-1'>
            11:09 PM - 1 Jan 2016
          </time>
        </p>
        <p className='title is-6'>{item.title}</p>
      </div>
    </Link>
  )
}

FeaturedCard.propTypes = {
  item: PropTypes.object,
}
