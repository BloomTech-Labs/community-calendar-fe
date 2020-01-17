import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

// components
import LoadingLogo from '../components/loading/LoadingLogo'

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_EVENT_BY_ID_WITH_DISTANCE, GET_CACHE} from '../graphql'
import {months, weekDays} from '../utils/time-helpers.js'

//styles
import {
  banner,
  top_sec,
  date_display,
  space_letters,
  middle_div,
  horizontalBar,
  descriptionDiv,
  descriptionText,
  panel_right,
  eventView,
  socialOptions,
} from './styles/EventView.module.scss'

/* Show all of the details and information about an event.
Users can RSVP to an event from here.
 */
const EventView = () => {
  const queryParams = useParams()

  const {data: localCache} = useQuery(GET_CACHE)
  const {userLatitude, userLongitude} = localCache
  console.log("coords", userLongitude, userLatitude)

  // destructure event information passed through props
  const apolloData = useQuery(GET_EVENT_BY_ID_WITH_DISTANCE, {
    variables: {id: queryParams.id, userLatitude: userLatitude, userLongitude: userLongitude},
  })
  const {data, loading, error, refetch} = apolloData

  // find distance from user and update events with results if user location changes
  useEffect(() => {
    refetch({userLatitude, userLongitude})
  }, [userLatitude, userLongitude])

  // render loading spinner or error message if fetch fails
  if (loading)
    return (
      <div
        className='container level is-flex'
        style={{height: '100vh', width: '100vw'}}
      >
        <LoadingLogo />
      </div>
    )
  if (error) return <p>Error</p>


  // destructure and render event properties when fetch successful
  const {
    id,
    title,
    description,
    start,
    end,
    creator,
    locations,
    eventImages,
    tags,
  } = data.events.length && data.events[0]

  //destructure first item in locations array
  const {
    name,
    streetAddress,
    streetAddress2,
    city,
    zipcode,
    state,
    distanceFromUser,
    distanceUnit
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
      {eventImages.length > 0 && <img
        className={`${banner} is-block mx-auto`}
        // className='mx-auto'
        src={eventImages[0].url}
        alt='banner'
      />}
      {/* Event title, location, RSVP info */}
      <section className={top_sec}>
        <div>
          <h1 className='is-family-secondary is-size-1 is-size-4-mobile'>{title}</h1>
          <p className={`has-text-weight-bold is-size-6-mobile ${date_display}`}>
            {`
            ${months[startDate.getMonth()]} ${startDate.getDate()},
             ${startDate.getFullYear()} ${weekDays[startDate.getDay()]}
            `}
          </p>
          <p className='has-text-weight-bold is-size-6-mobile'>
            {name}
            {/* Display distance from user if user's position was provided to server */}
            {(distanceFromUser && distanceUnit && (
              <span className='is-size-7-mobile'>
                &nbsp; &#8226; &nbsp; 
                { distanceFromUser && <span className={space_letters}>{`${distanceFromUser.toFixed(1)}`}</span>}
                &nbsp;
                { distanceFromUser && `${distanceUnit === 'miles' ? 'mi' : 'km'} away`}
              </span>
            ))}
          </p>
          <p className='is-size-7-mobile'>
              {`${streetAddress}, ${streetAddress2 ? `${streetAddress2}, ` : ''}
              ${city}, ${state}, ${zipcode}`}
          </p>
        </div> 
        <div className={panel_right}>
          {/* Manage Buton, only displays if logged-in user is the event creator  */}
          {/* <div>
            <button className="manage-button butto n">Manage</button>
          </div> */}

          {/* numbers to be replaced with event information */}
          {/* <div>
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
          </div> */}
        </div>
      </section>
      <section className=''>
        <div className={middle_div}>
          <div>
            {' '}
            {/* container which separates social links/tags from event info  */}
            <div className={`columns is-mobile ${horizontalBar}`}>
              {/* Host Name, Time, Type */}
              <div className='column has-text-centered-mobile'>
                <p className='color_chalice is-size-6half-mobile'>Hosted by:</p>
              </div>
              {/* <p className="color_shark">{creator}</p> */}
              <div className='column has-text-centered-mobile'>
                <p className='color_chalice is-size-6half-mobile'>Time:</p>
                <p className='color_shark is-size-6half-mobile has-text-weight-bold'>{`${eventStartTime} - ${eventEndTime}`}</p>
              </div>
              <div className='column has-text-centered-mobile'>
                <p className='color_chalice is-size-6half-mobile'>Ticket Type:</p>
                <p className='has-text-danger is-size-6half-mobile'>Free</p>
              </div>
            </div>
            <div className={descriptionDiv}>
              <p className='has-text-weight-bold is-size-5 is-size-6-mobile'>Event Details</p>
              <p className={`${descriptionText} is-size-7-mobile`}>{description}</p>
              {/* Attend functionality not yet implemented
              <button className='button  is-dark'>Attend</button> */}
            </div>

          </div>
          {/* Appears to right of event info on tablet+ */}
        </div>
        <div className={socialOptions}>
          {/* Follow host functionality not yet implemented
          <button className='button  is-dark '>Follow Host</button> */}
          <div>
            <div className='tags'>
              <p className='has-text-weight-bold is-size-5 is-size-6-mobile'>Tags</p>
              {tags &&
                tags.map((tag, indx) => (
                  <span className='tag is-small is-white' key={'tag-' + indx}>
                    {tag.title}
                  </span>
                ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default EventView
