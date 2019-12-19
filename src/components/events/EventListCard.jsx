import React from 'react'
import * as moment from 'moment';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

//styles
import {
  event_details,
  event_image,
  // community,
} from '../style_modules/EventListCard.module.scss'

export default function EventListCard(props) {
  const {item} = props

  return (
    <Link to={{pathname: '/events', state: {item}}} >
      <div className='columns'>
        <img
          src={item.event_images[0].url}
          className={`column is-narrow ${event_image}`}
        />
        <div className={`column ${event_details}`}>
          <p
            data-id='event_location'
            className=' is-size-7 is-uppercase has-text-weight-bold color_chalice'
          >
            {(item.locations && item.locations.neighborhood) || 'North End'}
          </p>
          <p data-id='event_title' className='is-size-5 has-text-weight-bold'>
            {item.title}
          </p>
          <p className='is-size-6'>
            <span data-id='event_time' className='color_chalice'>
              {`${moment(item.start).format('h:mm a')} - ${moment(
                item.end,
              ).format('h:mm a')}`}
            </span>
            &nbsp;
            <span>&#8226;</span>
            &nbsp;
            <span className='color_chalice'>Free</span>
          </p>
          <br />
          <p data-id='event_description' className='is-size-7'>
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

EventListCard.propTypes = {
  item: PropTypes.object,
}
