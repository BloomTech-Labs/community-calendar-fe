import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//styles
import {
  column,
  columns,
  isNarrow,
  listCard,
  gridCard,
  eventDescription,
  event_details,
  space_letters,
  event_image,
  descriptionUnderline,
  title,
  description,
  tileTitle,
  zIndex1,
} from './styles/EventListCard.module.scss'

/* 
The cards shown on the EventList component.
Changing the class names on the Link element
sets the style to List format or Grid format
 */
export default function EventListCard(props) {
  const {item, useListView} = props
  const location =
    item.locations && item.locations[0].streetAddress
      ? item.locations[item.locations.length - 1]
      : null

  return (
    //  Use `listCard` or `gridCard` style based on `useListView` bool from parent
    <Link
      className={useListView ? `${listCard}  ${columns}` : gridCard}
      to={`/events/${item.id}`}
    >
      {item.eventImages && item.eventImages.length > 0 && (
        <img
          src={item.eventImages[0].url}
          className={(column, isNarrow, event_image)}
        />
      )}
      <div className={`${column} ${event_details}`}>
        <p
          data-id='event_location'
          data-testid='event_location'
          className={`${zIndex1} has-text-weight-bold color_chalice`}
        >
          {/* display neighborhood if defined, otherwise city */}
          <span className='is-size-6 is-uppercase'>
            {location.neighborhood ? location.neighborhood : location.city}
          </span>
          {/* display distanceFromUser if defined */}
          {location && location.distanceFromUser && (
            <span className={`is-size-7`}>
              &nbsp; &#8226; &nbsp;
              <span
                className={space_letters}
              >{`${location.distanceFromUser.toFixed(1)}`}</span>
              &nbsp;
              {`${location.distanceUnit === 'miles' ? 'mi' : 'km'} away`}
            </span>
          )}
        </p>
        <p
          data-id='event_title'
          data-testid='event_title'
          className={`is-size-5 has-text-weight-bold color_black ${title} ${!useListView ? tileTitle : ''}`}
          data-desc={`${item.title}`}
        >
          {item.title}
        </p>
        {Math.ceil(
          moment.duration(moment(item.end).diff(moment(item.start))).asDays(),
        ) === 1 && (
          <p className='is-size-6'>
            <span data-id='event_time' className='color_chalice'>
              {`${moment(item.start).format('ddd, MMMM Do YYYY')}`}
            </span>
          </p>
        )}
        <p className='is-size-6'>
          <span data-id='event_time' className='color_chalice'>
            {Math.ceil(
              moment
                .duration(moment(item.end).diff(moment(item.start)))
                .asDays(),
            ) === 1
              ? `${moment(item.start).format('h:mm a')} - ${moment(
                  item.end,
                ).format('h:mm a')}`
              : `${moment(item.start).format('MMM Do YYYY h:mm a')} - ${moment(
                  item.end,
                ).format('MMM Do YYYY h:mm a')}`}
          </span>
          &nbsp;
          <span>&#8226;</span>
          &nbsp;
          <span className='color_chalice'>
            {item.ticketPrice ? `$${item.ticketPrice}` : 'FREE'}
          </span>
        </p>
        <p
          data-id='event_description'
          data-testid='event_description'
          className={`${eventDescription} ${description} is-size-7 color_black is-hidden-mobile`}
        >
          {item.description}
        </p>
        <div className={descriptionUnderline}></div>
      </div>
    </Link>
  )
}

EventListCard.propTypes = {
  item: PropTypes.object,
  useListView: PropTypes.bool,
}
