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
  dont_break_out,
  descriptionFade,
} from './styles/EventListCard.module.scss'

import {TimeIcon, CalendarIcon} from '../icons'

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
          alt={item.title}
          className={(column, isNarrow, event_image)}
        />
      )}
      <div className={`${column} ${event_details}`}>
        <div
          data-id='event_location'
          data-testid='event_location'
          className='has-text-weight-bold color_chalice is-flex justify-between'
        >
          {/* display neighborhood if defined, otherwise city */}
          <p className='is-size-7-mobile is-size-6-tablet '>
            <span className='is-uppercase'>
              {location.neighborhood ? location.neighborhood : location.city}
            </span>
            {/* display distanceFromUser if defined */}
            {location && location.distanceFromUser && (
              <>
                <span className='color_shark is-size-7 '>
                  &nbsp; &#8226; &nbsp;
                </span>
                <span
                  className={`${space_letters} is-size-7 has-text-weight-normal`}
                >
                  {`${location.distanceFromUser.toFixed(1)}`}
                  &nbsp;
                  {`${location.distanceUnit === 'miles' ? 'mi' : 'km'}`}
                </span>
                <span className='hidden-xs has-text-weight-normal is-size-7'>
                  &nbsp;away
                </span>
              </>
            )}
          </p>
          {Math.ceil(
            moment.duration(moment(item.end).diff(moment(item.start))).asDays(),
          ) === 1 && (
            <p className='is-hidden-tablet is-size-6-tablet is-size-7-mobile is-inline-block'>
              <span data-id='event_time_mobile' className='color_chalice'>
                {`${moment(item.start).format('ll')}`}
              </span>
            </p>
          )}
        </div>
        <p
          data-id='event_title'
          data-testid='event_title'
          className={`is-size-5-tablet is-size-6-mobile has-text-weight-bold color_black ${title} ${
            !useListView ? tileTitle : ''
          }`}
        >
          {item.title}
        </p>
        {Math.ceil(
          moment.duration(moment(item.end).diff(moment(item.start))).asDays(),
        ) === 1 && (
          <p className='is-hidden-mobile is-size-6-tablet is-size-7-mobile'>
            <span data-id='event_time' className='color_chalice'>
              {`${moment(item.start).format('ddd, MMMM Do YYYY')}`}
            </span>
          </p>
        )}
        <p className='is-size-6-tablet is-size-7-mobile '>
          <span data-id='event_time' className='color_chalice hidden-xs'>
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
          <span className='color_chalice hidden-xs'>
            <span className='color_shark is-size-6-tablet hidden-xs'>
              &nbsp;&#8226;&nbsp;
            </span>
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
        <div
          className={`${descriptionFade} ${useListView ? '' : 'd-none'}`}
        ></div>
        <div className={descriptionUnderline}></div>
      </div>
    </Link>
  )
}

EventListCard.propTypes = {
  item: PropTypes.object,
  useListView: PropTypes.bool,
}
