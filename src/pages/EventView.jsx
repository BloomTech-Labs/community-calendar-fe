import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

// components
import LoadingLogo from '../components/loading/LoadingLogo'

//graphql
import {useQuery} from 'react-apollo'
import {GET_EVENT_BY_ID} from '../graphql/events.query'
import {months, weekDays} from '../utils/time-helpers.js'

//styles
import {
  banner,
  top_sec,
  middle_div,
  descriptionDiv,
  panel_right,
  eventView,
  socialOptions,
} from './styles/EventView.module.scss'

/* Show all of the details and information about an event.
Users can RSVP to an event from here.
 */
const EventView = () => {
  const queryParams = useParams()
  //destructure event information passed through props
  const {data, loading, error} = useQuery(GET_EVENT_BY_ID(queryParams.id))

  if (loading)
    return (
      <div
        className='container level'
        style={{height: '100vh', width: '100vw'}}
      >
        <LoadingLogo />
      </div>
    )
  if (error) return <p>Error</p>

  const {
    id,
    title,
    description,
    start,
    end,
    creator,
    locations,
    event_images,
    tags,
  } = data.events.length && data.events[0]

  //destructure first item in locations array
  const {
    name,
    street_address,
    // street_address_2,
    // city,
    // zipcode,
    // state,
  } = locations[0]

  //convert start date to Date object
  const startDate = new Date(start)
  const endDate = new Date(end)

  //create string for displaying event time in hours and minutes
  const startHours = startDate.getHours()
  const startMinutes = startDate.getMinutes()
  const eventStartTime =
    startHours > 12
      ? `${startHours - 12}:${String(startMinutes).padStart(2, '0')} pm`
      : `${startHours}:${String(startMinutes).padStart(2, '0')} am`

  const endHours = endDate.getHours()
  const endMinutes = endDate.getMinutes()
  const eventEndTime =
    endHours > 12
      ? `${endHours - 12}:${String(endMinutes).padStart(2, '0')} pm`
      : `${endHours}:${String(endMinutes).padStart(2, '0')} am`

  return (
    <div className={eventView}>
      {/* Banner image */}
      <img
        className={`${banner} is-block mx-auto`}
        src={event_images[0].url}
        alt='banner'
      />
      {/* Event title, location, RSVP info */}
      <section className={top_sec}>
        <div>
          <h1 className='is-family-secondary'>{title}</h1>
          <p>{`${
            months[startDate.getMonth()]
          } ${startDate.getDate()}, ${startDate.getFullYear()} ${
            weekDays[startDate.getDay()]
          }`}</p>
          <p>{`${street_address}, ${name}`}</p>
        </div>
        {/* <div className={panel_right}>
          <p>
            Going:
            <br />
            <span className='has-text-weight-bold'>50</span>
          </p>
          <p>
            Interested:
            <br />
            <span className='has-text-weight-bold'>100</span>
          </p>
        </div>
 */}{' '}
      </section>
      <section className=''>
        <div className={middle_div}>
          <div>
            {' '}
            {/* container which separates social links/tags from event info  */}
            <div className='columns'>
              {/* Host Name, Time, Type */}
              <div className='column'>
                <p className='color_chalice'>Hosted by:</p>
              </div>
              {/* <p className="color_shark">{creator}</p> */}
              <div className='column'>
                <p className='color_chalice'>Time:</p>
                <p className='color_shark has-text-weight-bold'>{`${eventStartTime} - ${eventEndTime}`}</p>
              </div>
              <div className='column'>
                <p className='color_chalice'>Ticket Type:</p>
                <p className='has-text-danger'>Free</p>
              </div>
            </div>
            <div className={descriptionDiv}>
              <p className='has-text-weight-bold is-size-5'>Event Details</p>
              <p>{description}</p>
              {/* <button className='button  is-dark'>Attend</button> */}
            </div>
          </div>
          {/* Appears to right of event info on tablet+ */}
          <div className={socialOptions}>
            {/* <button className='button  is-dark '>Follow Host</button> */}
            <div>
              <p className=' is-size-5'>Tags</p>
              <div className='tags'>
                {tags &&
                  tags.map((tag, indx) => (
                    <span className='tag is-small is-white' key={'tag-' + indx}>
                      {tag.title}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventView
