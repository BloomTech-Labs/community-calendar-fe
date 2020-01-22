import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

// components
import LoadingLogo from 'loading/LoadingLogo'
import LoadingDots from 'loading/LoadingDots'
import {DropdownIcon} from 'icons'
import DeleteEventModal from 'events/DeleteEventModal'

//graphql
import {useQuery, useMutation} from '@apollo/react-hooks'
import {
  GET_EVENT_BY_ID_WITH_DISTANCE,
  GET_CACHE,
  GET_USER_ID,
  DELETE_EVENT,
  ADD_RSVP,
} from '../graphql'

import {months, weekDays, buildQS, useDropdown} from '../utils'

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
const EventView = ({history}) => {
  const [showModal, setShowModal] = useState(false)
  const queryParams = useParams()

  const {data: localCache} = useQuery(GET_CACHE)
  const {userLatitude, userLongitude} = localCache

  const {data: cacheUserId} = useQuery(GET_USER_ID)
  console.log('userID in cache', cacheUserId.userId)

  const [
    deleteEventMutation,
    {data: deleteData, error: deleteError, loading: deleteLoading},
  ] = useMutation(DELETE_EVENT)

  if (deleteData) {
    console.log(deleteData)
    history.push('/')
  }

  const [
    addRsvpMutation,
    {data: rsvpData, error: rsvpError, loading: rsvpLoading},
  ] = useMutation(ADD_RSVP)

  // destructure event information passed through props
  const apolloData = useQuery(GET_EVENT_BY_ID_WITH_DISTANCE, {
    variables: {
      id: queryParams.id,
      userLatitude: userLatitude,
      userLongitude: userLongitude,
    },
  })
  const {data, loading, error, refetch} = apolloData

  // event management dropdown
  const [manageIsOpen, setManageOpen] = useDropdown(closeManage, false)

  function closeManage(e) {
    if (e.target.getAttribute('data-id') !== 'manage-dropdown') {
      setManageOpen(false)
    }
  }

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
    rsvps,
  } = data.events.length && data.events[0]
  console.log('rsvps', rsvps)
  const didRsvp =
    rsvps.length && cacheUserId
      ? rsvps.filter(rsvpData => rsvpData.id === cacheUserId.userId)[0]
      : null
  console.log('didRsvp', didRsvp)

  //destructure first item in locations array
  const {
    name,
    streetAddress,
    streetAddress2,
    city,
    zipcode,
    state,
    distanceFromUser,
    distanceUnit,
  } = locations[locations.length - 1]

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

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const deleteEvent = () => {
    deleteEventMutation({variables: {id}})
  }

  const addRSVP = () => addRsvpMutation({variables: {id}})

  return (
    <div className={eventView}>
      {/* Banner image */}
      {eventImages.length > 0 && (
        <img
          className={`${banner} is-block mx-auto`}
          // className='mx-auto'
          src={eventImages[0].url}
          alt='banner'
        />
      )}
      {/* Event title, location, RSVP info */}
      <section className={top_sec}>
        <div>
          <h1 className='is-family-secondary is-size-1 is-size-4-mobile'>
            {title}
          </h1>
          <p
            className={`has-text-weight-bold is-size-6-mobile ${date_display}`}
          >
            {`
            ${months[startDate.getMonth()]} ${startDate.getDate()},
             ${startDate.getFullYear()} ${weekDays[startDate.getDay()]}
            `}
          </p>
          <p className='has-text-weight-bold is-size-6-mobile'>
            {name}
            {/* Display distance from user if user's position was provided to server */}
            {distanceFromUser && distanceUnit && (
              <span className='is-size-7-mobile'>
                &nbsp; &#8226; &nbsp;
                {distanceFromUser && (
                  <span className={space_letters}>{`${distanceFromUser.toFixed(
                    1,
                  )}`}</span>
                )}
                &nbsp;
                {distanceFromUser &&
                  `${distanceUnit === 'miles' ? 'mi' : 'km'} away`}
              </span>
            )}
          </p>
          <p className='is-size-7-mobile'>
            {`${streetAddress}, ${streetAddress2 ? `${streetAddress2}, ` : ''}
              ${city}, ${state}, ${zipcode}`}
          </p>
        </div>
        <div className={panel_right}>
          {/* Manage Button, only displays if logged-in user is the event creator  */}
          {cacheUserId && creator && cacheUserId.userId === creator.id && (
            <div
              className={`dropdown  has-background-danger button ${
                manageIsOpen ? 'is-active' : ''
              }  no-border`}
              onClick={() => setManageOpen(!manageIsOpen)}
              data-id='manage-dropdown'
            >
              <div
                className='dropdown-trigger has-text-centered no-pointer-events'
                style={{width: '100px'}}
                aria-haspopup='true'
                aria-controls='dropdown-menu2'
                data-id='manage-trigger'
              >
                <span className='no-pointer-events has-text-white'>Manage</span>
                <span
                  className={`icon  no-pointer-events  ${
                    manageIsOpen ? 'flip' : ''
                  }`}
                  style={{transition: 'transform 0.2s'}}
                  aria-hidden='true'
                >
                  <DropdownIcon isLight />
                </span>
              </div>
              <div className='dropdown-menu drop-center w-100' role='menu'>
                <div className='dropdown-content'>
                  <Link to={`/events/${id}/update`}>
                    <div className='dropdown-item has-text-centered'>Edit</div>
                  </Link>
                  <div
                    onClick={() => {
                      toggleModal()
                    }}
                    className='dropdown-item has-text-centered has-text-danger'
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* end manage dropdown */}
          {didRsvp && (
            <div className='has-background-success button has-text-centered has-text-white no-border'>
              Going
            </div>
          )}
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
              {/* <div className='column has-text-centered-mobile'>
                <p className='color_chalice is-size-6half-mobile'>Hosted by:</p>
              </div> */}
              {/* <p className="color_shark">{creator}</p> */}
              <div
                className='column has-text-centered-mobile'
                style={{paddingLeft: 0}} //remove this style when Hosted By is implemented
              >
                <p className='color_chalice is-size-6half-mobile'>Time:</p>
                <p className='color_shark is-size-6half-mobile has-text-weight-bold'>{`${eventStartTime} - ${eventEndTime}`}</p>
              </div>
              <div className='column has-text-centered-mobile'>
                <p className='color_chalice is-size-6half-mobile'>
                  Ticket Type:
                </p>
                <p className='has-text-danger is-size-6half-mobile'>Free</p>
              </div>
            </div>
            <div className={descriptionDiv}>
              <p className='has-text-weight-bold is-size-5 is-size-6-mobile'>
                Event Details
              </p>
              <p className={`${descriptionText} is-size-7-mobile`}>
                {description}
              </p>
              {cacheUserId && !rsvpLoading && !didRsvp && (
                <button className='button  is-dark' onClick={() => addRSVP()}>
                  Attend
                </button>
              )}
              {cacheUserId && rsvpLoading && !didRsvp && (
                <button className='button  is-dark'>
                  <LoadingDots bgColor='#fff' />
                </button>
              )}
            </div>
          </div>
          {/* Appears to right of event info on tablet+ */}
        </div>
        <div className={socialOptions}>
          {/* Follow host functionality not yet implemented
          <button className='button  is-dark '>Follow Host</button> */}
          <div>
            <div className='tags'>
              <p className='has-text-weight-bold is-size-5 is-size-6-mobile'>
                Tags
              </p>
              {tags &&
                tags.map(tag => (
                  <Link
                    to={`/search/${buildQS({searchText: tag.title})}`}
                    className='tag is-small is-white color_shark tag-hover'
                    key={tag.title}
                  >
                    {tag.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <DeleteEventModal deleteEvent={deleteEvent} toggleModal={toggleModal} />
      )}
    </div>
  )
}

export default EventView
