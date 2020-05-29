import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import moment from 'moment'
import ReactGA from 'react-ga'

// components
import LoadingLogo from '../components/loading/LoadingLogo'
import LoadingDots from '../components/loading/LoadingDots'
import {DropdownIcon, HeartIcon, CheckmarkIcon} from '../components/icons'
import GoBack from '../components/go_back/GoBack'

import DeleteEventModal from '../components/events/DeleteEventModal'

//graphql
import {useQuery, useMutation} from '@apollo/react-hooks'
import {
  GET_EVENT_BY_ID_WITH_DISTANCE,
  GET_CACHE,
  GET_USER_ID,
  DELETE_EVENT,
  SAVE_EVENT,
  RSVP_EVENT,
  GET_SERIES,
  DELETE_SERIES,
} from '../graphql'

import {buildQS, createQSObj, useDropdown} from '../utils'

//styles
import {
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
  row,
  eventImage,
  padContent,
  padDivContent,
  userImage,
  titleH1,
  series,
} from './styles/EventView.module.scss'

/* Show all of the details and information about an event.
Users can RSVP to an event from here.
 */
const EventView = ({history}) => {
  const [savedHeart, setSavedHeart] = useState(false)
  const [attendees, setAttendees] = useState(0)
  const [rsvp, setRsvp] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isSeries, setIsSeries] = useState(false)
  const queryParams = useParams()

  const {data: localCache} = useQuery(GET_CACHE)
  let {userLatitude, userLongitude} = localCache

  const {data: cacheUserId} = useQuery(GET_USER_ID)
  const {data: eventSeries} = useQuery(GET_SERIES, {
    variables: {id: queryParams.id},
  })

  useEffect(() => {
    if (eventSeries)
      eventSeries.events[0].series ? setIsSeries(true) : setIsSeries(false)
  }, [eventSeries, isSeries])

  const [deleteEventMutation, {data: deleteData}] = useMutation(DELETE_EVENT)

  const [deleteSeriesMutation, {data: deleteSeriesData}] = useMutation(
    DELETE_SERIES,
  )

  if (deleteData || deleteSeriesData) {
    history.push('/')
  }

  //save event mutation
  const [
    saveEventMutation,
    {data: saveEventData, error: saveEventError, loading: saveEventLoading},
  ] = useMutation(SAVE_EVENT)

  //rsvp event mutation
  const [
    rsvpEventMutation,
    {data: rsvpEventData, error: rsvpEventError, loading: rsvpEventLoading},
  ] = useMutation(RSVP_EVENT)

  // destructure event information passed through props
  const apolloData = useQuery(GET_EVENT_BY_ID_WITH_DISTANCE, {
    variables: {
      id: queryParams.id,
      userLatitude: userLatitude,
      userLongitude: userLongitude,
      withSaved: !!(cacheUserId && cacheUserId.userId),
      savedUserId:
        cacheUserId && cacheUserId.userId ? cacheUserId.userId : undefined,
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
    refetch({
      userLatitude,
      userLongitude,
      withSaved: !!(cacheUserId && cacheUserId.userId),
      savedUserId:
        cacheUserId && cacheUserId.userId ? cacheUserId.userId : undefined,
    })
  }, [userLatitude, userLongitude])

  useEffect(() => {
    if (
      data &&
      data.events &&
      data.events.length &&
      data.events[0] &&
      cacheUserId &&
      cacheUserId.userId
    ) {
      if (data.events[0].saved) {
        setSavedHeart(!!data.events[0].saved.length)
      }

      if (data.events[0].rsvps.length) {
        let count = 0
        data.events[0].rsvps.filter(({id}) => {
          count++
          return id === cacheUserId.userId
        }).length
          ? setRsvp(true)
          : setRsvp(false)

        setAttendees(count)
      }
    }
  }, [data])

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

  if (error)
    return <p>Error fetching data from the server, please refresh the page</p>

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
    ticketPrice,
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

  const deleteSeries = () => {
    const seriesId = eventSeries.events[0].series.id
    deleteSeriesMutation({variables: {id: seriesId}})
  }

  const saveEvent = () => {
    saveEventMutation({variables: {id}}).then(({data: {saveEvent}}) => {
      setSavedHeart(saveEvent)
    })
  }

  const rsvpEvent = () => {
    rsvpEventMutation({variables: {id}}).then(({data: {rsvpEvent}}) => {
      if (rsvpEvent) {
        setAttendees(attendees + 1)
        ReactGA.event({
          category: 'Attending Event',
          action: 'User Clicked Attend Event Button on Event Card',
        })
      } else {
        setAttendees(attendees - 1)
        ReactGA.event({
          category: 'Unattending Event',
          action:
            'User Clicked Unattend Event Button, they no longer wish to attend event',
        })
      }
      setRsvp(rsvpEvent)
    })
  }

  return (
    <div className={`${eventView} page-wrapper`}>
      {/* Event title, location, RSVP info */}
      <section className={top_sec}>
        <GoBack />
        {/* Banner image */}
        {eventImages.length > 0 && (
          <img
            className={`${eventImage}`}
            src={eventImages[0].url}
            alt={title}
          />
        )}
        <div className={padDivContent}>
          <h1
            className={`${titleH1} is-family-secondary is-size-1 is-size-4-mobile`}
            alt={title}
          >
            {title}
          </h1>
          <p
            className={`has-text-weight-bold is-size-6-mobile ${date_display}`}
          >
            {Math.ceil(
              moment.duration(moment(end).diff(moment(start))).asDays(),
            ) === 1
              ? moment(start).format('ddd, MMMM Do YYYY')
              : `${moment(start).format('ddd, MMMM Do YYYY')} - ${moment(
                  end,
                ).format('ddd, MMMM Do YYYY')}`}
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
          {isSeries ? (
            <div className={series}>
              <p>This is a recurring event!</p>
            </div>
          ) : null}
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
        </div>
      </section>
      <section className={padContent}>
        <div className={middle_div}>
          <div>
            {' '}
            {/* container which separates social links/tags from event info  */}
            <div className={`columns  ${horizontalBar}`}>
              {/* Host Name, Time, Type */}
              <div className='column has-text-centered-mobile'>
                <div
                  className={`columns justify-center is-mobile ${horizontalBar}`}
                >
                  <div
                    className={`${userImage}`}
                    style={{backgroundImage: `url(${creator.profileImage})`}}
                  />
                  <div style={{marginLeft: '16px'}}>
                    <p className='color_chalice is-size-6half-mobile'>
                      Hosted By:
                    </p>
                    <p className='color_shark is-size-6half-mobile'>
                      {creator.firstName}
                    </p>
                  </div>
                </div>
              </div>
              <div className='column has-text-centered-mobile'>
                <p className='color_chalice is-size-6half-mobile has-text-centered'>
                  Time:
                </p>
                <p className='color_shark is-size-6half-mobile has-text-weight-bold has-text-centered'>
                  {Math.ceil(
                    moment.duration(moment(end).diff(moment(start))).asDays(),
                  ) === 1
                    ? `${eventStartTime} - ${eventEndTime}`
                    : `${moment(start).format('MMM Do h:mm a')} - ${moment(
                        end,
                      ).format('MMM Do h:mm a')}`}
                </p>
              </div>
              <div className='column has-text-centered-mobile '>
                <p className='color_chalice is-size-6half-mobile has-text-centered'>
                  Ticket Price:
                </p>
                <p className='has-text-danger is-size-6half-mobile has-text-centered'>
                  {ticketPrice ? '$' + ticketPrice.toFixed(2) : 'FREE'}
                </p>
              </div>
              <div className='column has-text-centered-mobile'>
                {attendees === 0 ? (
                  <p
                    style={{color: '#ffffff'}}
                    className='color_chalice is-size-6half-mobile has-text-centered'
                  >
                    Attending:
                  </p>
                ) : (
                  <p className='color_chalice is-size-6half-mobile has-text-centered'>
                    Attending:
                  </p>
                )}
                {attendees > 0 && (
                  <p className='is-size-6half-mobile has-text-centered'>
                    {attendees}
                  </p>
                )}
              </div>
            </div>
            <div className={descriptionDiv}>
              <div className={`${row}`}>
                <p className='has-text-weight-bold is-size-5 is-size-6-mobile'>
                  Event Details
                </p>
                {cacheUserId && cacheUserId.userId && (
                  <span
                    onClick={() => saveEvent()}
                    style={
                      saveEventLoading
                        ? {pointerEvents: 'none', opacity: 0.3}
                        : {}
                    }
                  >
                    <HeartIcon isLiked={!!savedHeart} />
                  </span>
                )}
              </div>
              <p className={`${descriptionText} is-size-7-mobile`}>
                {description}
              </p>
              {cacheUserId.userId && (
                <button
                  className={`button  level ${
                    rsvp ? 'is-primary' : 'is-primary is-outlined'
                  }`}
                  onClick={() => {
                    rsvpEvent()
                  }}
                >
                  {rsvpEventLoading ? (
                    <LoadingDots />
                  ) : rsvp ? (
                    <>
                      <span>Attending</span>&nbsp;
                      <CheckmarkIcon
                        style={{position: 'relative', top: '4px'}}
                      />
                    </>
                  ) : (
                    'Attend'
                  )}
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
                tags.map((tag) => (
                  <Link
                    to={`/${buildQS(createQSObj(null, {tags: [tag.title]}))}`}
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
        <DeleteEventModal
          deleteEvent={deleteEvent}
          deleteSeries={deleteSeries}
          toggleModal={toggleModal}
          isSeries={isSeries}
        />
      )}
    </div>
  )
}

export default EventView
