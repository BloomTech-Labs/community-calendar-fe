// import {useDropdown} from '../../utils'
import React, {useState, useEffect} from 'react'
import loadable from '@loadable/component'
import ReactGA from 'react-ga'
import moment from 'moment'

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import TagInput from './TagInput'
import ErrorModal from './ErrorModal'
import UpdateEventModal from './UpdateEventModal'

// form data
import {states, statesAbbreviated} from './states'
import {eventSchema} from './eventSchema'

// utils
import {fetchGeocode} from '../../utils'
import {createEventSeries} from '../../utils'

//GQL
import {useQuery} from '@apollo/react-hooks'
import {GET_CALENDAR_EVENTS} from '../../graphql'

// styles
import UploadIcon from '../icons/UploadIcon'
import LoadingDots from '../loading/LoadingDots'
import LoadingLogo from '../loading/LoadingLogo'
import {
  createEventForm,
  input,
  cal,
  select,
  shark,
  errorMessage,
  errorMargin,
  errorMarginMobile,
  littleTopMargin,
  littleTopPadding,
  location,
  picker,
  textarea,
  imageUploader,
  uploadContainer,
  imagePreview,
  flexcolumn,
  flexCenter,
  tabletFlexrow,
  tabletEndfield,
  desktopFlexrow,
  desktopEndfield,
  dropBoxError,
  events,
  eventContainer,
  repeatRules,
  repeaton,
  recPicker,
  recInput,
} from './styles/EventForm.module.scss'

/* split react-date-timepicker from the rest of the bundle */
const DateTimePickerSplit = loadable.lib(() =>
  import(/* webpackChunkName: "reactDatetimePicker" */ 'react-datetime-picker'),
)

const DropzoneSplit = loadable.lib(() =>
  import(/* webpackChunkName: "reactDropzone" */ 'react-dropzone'),
)

const EventForm = (props) => {
  /* FORM FUNCTIONS AND DATA:
  Destructure `formType`, `item`, `mutation` function, `mutationData`, and `mutationError`
  `formType` is "add" or "update"
  `item` is result of GET_EVENT_BY_ID query which is only passed down for an EditForm
  `mutation` is AddEvent or UpdateEvent as defined in parent useMutation
  `mutationData` and `mutationError` could possibly be removed and handled in parent */
  const {
    formType,
    item,
    mutation,
    mutationData,
    mutationError,
    mutationLoading,
    mutationNS,
    mutationDataNS,
    mutationErrorNS,
    mutationLoadingNS,
    mutationES,
    mutationDataES,
    mutationErrorES,
    mutationLoadingES,
  } = props

  const createEventData = useQuery(GET_CALENDAR_EVENTS)
  const {data, loading} = createEventData

  // map events to get start times for calendar
  const startTime = data && data.events.map((event) => event.start)

  // function to style calendar tiles selectively
  function tileClass({date}) {
    if (
      startTime.find(
        (x) =>
          moment(x).format('DD-MM-YYYY') === moment(date).format('DD-MM-YYYY'),
      )
    ) {
      return cal
    }
  }

  /* FORM STATE:
  react-hook-form manages state for all text values (location and details) inputted by user
  `tags`, `images`, `startDatetime`, and `endDatetime` all require custom state handlers */

  /* react-hook-form state:
  Destructure the `register` value handler, submit handler, and error handler
  Ternary maps values passed in on `item` prop as default values for `update` forms
  yup validationSchema imported from `eventSchema.js` */
  const {
    register,
    handleSubmit,
    errors: formErrors,
    getValues,
    setValue,
  } = useForm(
    formType === 'update' && item
      ? {
          validationSchema: eventSchema,
          defaultValues: {
            title: item.title || null,
            placeName: item.locations[item.locations.length - 1].name || null,
            streetAddress:
              item.locations[item.locations.length - 1].streetAddress || null,
            streetAddress2:
              item.locations[item.locations.length - 1].streetAddress2 || null,
            city: item.locations[item.locations.length - 1].city || null,
            state: item.locations[item.locations.length - 1].state || null,
            zipcode: item.locations[item.locations.length - 1].zipcode || null,
            description: item.description || null,
            ticketPrice: item.ticketPrice || null,
          },
          mode: 'onBlur',
        }
      : {validationSchema: eventSchema, mode: 'onBlur'},
  )

  // create `tag` state to be used in backend mutation request
  // Ternary maps values passed in on `item` prop as default tags for `update` forms,
  const [selectedTags, setSelectedTags] = useState(
    formType === 'update' && item.tags.length
      ? item.tags.map((tag) => tag.title)
      : [],
  )

  // create `images` state to be used in backend mutation request
  const [images, setImages] = useState(null)

  // Keeps track whether user uploads image when creating an event
  const [fileUpload, setFileUpload] = useState(false)

  // Function to append image error, when user submits form without image
  const appendErrorOnImageUploader = () => {
    // Error created when user attempts to submit form without uploading an image
    const p = document.createElement('p')
    p.classList.add('is-size-7', `${dropBoxError}`)
    const text = document.createTextNode('Event Image is required')

    // appending of error
    const imgDropBox = document.querySelector(`.dropBox`)
    imgDropBox.append(p)
    p.appendChild(text)
  }

  // Checks to see if the error is already being displayed on the users screen
  const error = document.querySelector(`.${dropBoxError}`)

  // create `startDatetime` state to be used in datepicker and backend mutation request
  // defaults to the next noon (today or tomorrow)
  let nextNoon = new Date()
  if (nextNoon.getHours() >= 12) nextNoon.setDate(nextNoon.getDate() + 1)
  nextNoon.setHours(12, 0, 0, 0)

  const [repeatUntilDate, setRepeatUntilDate] = useState(new Date(nextNoon))

  const repeatUntilChange = (datetime) => {
    setRepeatUntilDate(datetime)
  }

  const [startDatetime, setStartDatetime] = useState(
    formType === 'update' && item.start ? new Date(item.start) : nextNoon,
  )

  const startChange = (datetime) => {
    setStartDatetime(datetime)
  }
  // variables used for conditionally rendering either event info for a selected day, or a message
  // that there are no events scheduled for that day yet
  const compareDates = moment(startDatetime).format('DD-MM-YYYY')
  const renderedEvents =
    data &&
    data.events
      .map((event) => moment(event.start).format('DD-MM-YYYY'))
      .includes(compareDates)

  // create `endDatetime` state to be used in datepicker and backend mutation request
  // defaults to 3PM after the next noon (today or tomorrow)
  let nextAfternoon = new Date()
  if (nextAfternoon.getHours() >= 12)
    nextAfternoon.setDate(nextAfternoon.getDate() + 1)
  nextAfternoon.setHours(15, 0, 0, 0)

  const [endDatetime, setEndDatetime] = useState(
    formType === 'update' && item.end ? new Date(item.end) : nextAfternoon,
  )

  const [isSeries, setIsSeries] = useState(false)

  const endChange = (datetime) => {
    setEndDatetime(datetime)
  }

  // error modal state
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  //edit modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal)
  }

  const onTicketPriceChange = () => {
    const ticketPriceVal = getValues().ticketPrice
    const arrTicketPriceVal = ticketPriceVal.split('')

    var hasPeriod = false

    const newTicketPriceVal = arrTicketPriceVal
      .filter((letter) => {
        if (letter === '.') {
          if (hasPeriod) return false

          hasPeriod = true
        }
        return /[0-9.]/.test(letter)
      })
      .join('')

    setValue('ticketPrice', newTicketPriceVal)
  }

  const onTicketPriceBlur = () => {
    const ticketPriceVal = getValues().ticketPrice
    setValue(
      'ticketPrice',
      ticketPriceVal ? parseFloat(getValues().ticketPrice).toFixed(2) : '0.00',
    )
  }

  // submit handler pulls together state from all sources and creates a mutation request
  const onSubmit = async (formValues) => {
    const {
      title,
      placeName,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipcode,
      description,
      ticketPrice,
    } = formValues

    // query Mapbox for event coordinates
    let combinedAddress = [streetAddress, city, `${state} ${zipcode}`].join(
      ', ',
    )
    const geoData = await fetchGeocode({searchWords: combinedAddress})
    let [lat, long] = [null, null]
    if (geoData && geoData.features[0]) {
      lat = geoData.features[0].geometry.coordinates[1]
      long = geoData.features[0].geometry.coordinates[0]
    }

    //add repetition variables from state into a series object
    let seriesValues = null
    if (frequency === 'Daily') {
      seriesValues = {frequency: 'DAILY', seriesEnd: repeatUntilDate}
    } else if (frequency === 'Weekly') {
      seriesValues = {frequency: 'WEEKLY', seriesEnd: repeatUntilDate}
    } else if (frequency === 'Monthly') {
      seriesValues = {frequency: 'MONTHLY', seriesEnd: repeatUntilDate}
    }

    const mutationValues = {
      title,
      description,
      start: startDatetime,
      end: endDatetime,
      placeName,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipcode: parseInt(zipcode),
      latitude: lat, // pass event coordinates to mutation
      longitude: long,
      tags: selectedTags.length
        ? selectedTags.map((tag) => ({title: tag}))
        : [],
      ticketPrice,
      images,
      eventImages: images && images.length ? [] : undefined,
    }

    if (formType === 'add' && isSeries) {
      mutationValues.frequency = seriesValues.frequency
      mutationValues.seriesEnd = seriesValues.seriesEnd
    }

    if (formType === 'add' && !fileUpload) {
      if (error) {
        return null
      } else {
        appendErrorOnImageUploader()
        return null
      }
    } else {
      setFileUpload(false)
    }
    if ((formType === 'add' && !isSeries) || formType === 'update') {
      //create single event (not part of a series)
      mutation({variables: mutationValues})
    } else {
      //create series - make array of start and end dates, then create an event for each
      const eventDates = createEventSeries(
        new Date(mutationValues.start),
        new Date(mutationValues.end),
        mutationValues.seriesEnd,
        frequency,
        week,
      )

      Promise.resolve(mutationNS({variables: mutationValues})).then(
        (response) => {
          eventDates.forEach((eventDate) => {
            mutationValues.start = eventDate.start
            mutationValues.end = eventDate.end
            mutationValues.seriesId = response.data.addEvent.series.id
            mutationES({variables: mutationValues})
          })
        },
      )
    }
  } //end onSubmit

  // if image is uploaded and error is true, remove the error
  if (fileUpload && error) {
    document.querySelector(`.${dropBoxError}`).remove()
  }

  // if user attempt to submit empty form throw error
  if (Object.keys(formErrors).length && !fileUpload && formType === 'add') {
    if (!error) {
      appendErrorOnImageUploader()
    }
  }

  // log errors and success messages
  useEffect(() => {
    if (mutationError || mutationErrorNS || mutationErrorES) {
      setShowModal(true)
    }
  }, [mutationError, mutationErrorNS, mutationErrorES])

  if (mutationData) {
    const {id} = mutationData.addEvent || mutationData.updateEvent
    props.history.push(`/events/${id}`)
  } else if (mutationDataNS) {
    const {id} = mutationDataNS.addEvent || mutationData.updateEvent
    props.history.push(`/events/${id}`)
  } else if (mutationDataES) {
    const {id} = mutationDataES.addEvent || mutationData.updateEvent
    props.history.push(`/events/${id}`)
  }

  const modalCreateEvent = () => {
    ReactGA.event({
      category: 'Update Event',
      action: 'User clicked Update Event Button to Update Listing',
    })
  }

  const handleCreateEvent = () => {
    if (isSeries && formType === 'update') {
      toggleEditModal()
    } else if (formType === 'update') {
      ReactGA.event({
        category: 'Update Event',
        action: 'User clicked Update Event Button to Update Listing',
      })
    } else {
      ReactGA.event({
        category: 'Create Event',
        action: 'User clicked Create Event button to Create Listing',
      })
    }
  }

  //local states for recurring event inputs
  const [week, setWeek] = useState('')

  const [frequency, setFrequency] = useState('')

  const [weeks, setWeeks] = useState(false)
  const [repeat, setRepeat] = useState(false)
  //onChange handlers for recurring events
  //handleRepeatType
  const handleRepeatType = (e) => {
    setFrequency(e.target.value)
  }

  //handleRepeatEvery
  const handleRepeatEvery = (e) => {
    setWeek(e.target.value)
  }

  useEffect(() => {
    if (frequency === 'None') {
      setWeeks(false)
      setRepeat(false)
      setIsSeries(false)
    } else if (frequency === 'Daily') {
      setWeeks(false)
      setRepeat(true)
      setIsSeries(true)
    } else if (frequency === 'Weekly') {
      setWeeks(false)
      setRepeat(true)
      setIsSeries(true)
    } else if (frequency === 'Monthly') {
      setWeeks(true)
      setRepeat(true)
      setIsSeries(true)
    }
  }, [frequency])

  // render form component
  return (
    <>
      {loading && <LoadingLogo />}
      <div className={`${createEventForm}`}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${flexcolumn}`}>
          <input
            className='is-hidden'
            type='text'
            name='formType'
            value={formType === 'update' ? 'update' : 'add'}
            ref={register}
          />
          {/* EVENT TITLE */}
          <div className='field'>
            <label className='label'>
              Event Title
              <div className='control'>
                <input
                  className={`${input} input `}
                  type='text'
                  name='title'
                  ref={register}
                />
                <p className={`is-size-7 ${errorMessage}`}>
                  <ErrorMessage errors={formErrors} name='title' />
                </p>
              </div>
            </label>
          </div>

          {/* LOCATION: 3 rows tablet and up, 6 rows mobile */}
          <div className={` field ${location}`}>
            <label className='label'>
              Location
              <div className={` field ${littleTopPadding}`}>
                {/* Group 1: Place name */}
                <label className='label'>
                  Place Name
                  <input
                    className={`${input}`}
                    type='text'
                    placeholder='Enter place name if applicable'
                    name='placeName'
                    ref={register}
                  />
                  <p className={`is-size-7 ${errorMessage}`}>
                    <ErrorMessage errors={formErrors} name='placeName' />
                  </p>
                </label>

                {/* Group 2: Street address, street address line 2 */}
                <div className={`${tabletFlexrow}`}>
                  <div className={`field ${errorMargin}`}>
                    <label className='label'>
                      Street Address
                      <input
                        className={`${input}`}
                        type='text'
                        name='streetAddress'
                        ref={register}
                      />
                      <p className={`is-size-7 ${errorMessage}`}>
                        <ErrorMessage
                          errors={formErrors}
                          name='streetAddress'
                        />
                      </p>
                    </label>
                  </div>
                  <div className={`field ${errorMargin} ${tabletEndfield}`}>
                    <label className='label'>
                      Street Address 2
                      <input
                        className={`${input}`}
                        type='text'
                        name='streetAddress2'
                        ref={register}
                      />
                      <p className={`is-size-7 ${errorMessage}`}>
                        <ErrorMessage
                          errors={formErrors}
                          name='streetAddress2'
                        />
                      </p>
                    </label>
                  </div>
                </div>

                {/* Group 3: City, state, zip */}
                <div className={`${tabletFlexrow}`}>
                  <div className={`field ${errorMargin} ${errorMarginMobile}`}>
                    <label className='label'>
                      City
                      <input
                        className={`${input}`}
                        type='text'
                        name='city'
                        ref={register}
                      />
                      <p className={`is-size-7 ${errorMessage}`}>
                        <ErrorMessage errors={formErrors} name='city' />
                      </p>
                    </label>
                  </div>
                  <div className={`field ${errorMargin} ${tabletEndfield}`}>
                    <label className='label'>
                      State
                      <select
                        name='state'
                        ref={register}
                        className={`${select}`}
                        defaultValue={null}
                      >
                        <option value={null}>Select state</option>
                        {states.map((stateName, i) => (
                          <option
                            key={stateName}
                            value={`${statesAbbreviated[i]}`}
                          >
                            {stateName}
                          </option>
                        ))}
                      </select>
                      <p className={`is-size-7 ${errorMessage}`}>
                        <ErrorMessage errors={formErrors} name='state' />
                      </p>
                    </label>
                  </div>
                  <div className={`field ${errorMargin} ${tabletEndfield}`}>
                    <label className='label'>
                      Zip Code
                      <input
                        className={`${input}`}
                        type='text'
                        name='zipcode'
                        ref={register}
                      />
                      <p className={`is-size-7 ${errorMessage}`}>
                        <ErrorMessage errors={formErrors} name='zipcode' />
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* EVENT DATES AND TIME: 1 row desktop and up, 2 rows tablet and mobile */}
          <div className={`${desktopFlexrow}`}>
            {/* Group 1: Start date/time */}
            <div className='field start-field'>
              <label className='label'>Starts</label>
              {loading ? (
                <LoadingDots />
              ) : (
                <DateTimePickerSplit fallback={<LoadingDots />}>
                  {({default: DateTimePicker}) => (
                    <DateTimePicker
                      monthAriaLabel='Month'
                      dayAriaLabel='Day'
                      yearAriaLabel='Year'
                      hourAriaLabel='Hour'
                      minuteAriaLabel='Minute'
                      amPmAriaLabel='Select AM/PM'
                      clearAriaLabel='Clear Date'
                      onChange={startChange}
                      value={startDatetime}
                      className={picker}
                      disableClock={true}
                      minDate={new Date()}
                      tileClassName={tileClass}
                    />
                  )}
                </DateTimePickerSplit>
              )}
            </div>

            {/* Group 2: End date/time */}
            <div className={`${desktopEndfield} field`}>
              <label className='label'>Ends</label>
              {loading ? (
                <LoadingDots />
              ) : (
                <DateTimePickerSplit fallback={<LoadingDots />}>
                  {({default: DateTimePicker}) => (
                    <DateTimePicker
                      monthAriaLabel='Month'
                      dayAriaLabel='Day'
                      yearAriaLabel='Year'
                      hourAriaLabel='Hour'
                      minuteAriaLabel='Minute'
                      amPmAriaLabel='Select AM/PM'
                      clearAriaLabel='Clear Date'
                      onChange={endChange}
                      value={endDatetime}
                      className={picker}
                      disableClock={true}
                      minDate={new Date()}
                    />
                  )}
                </DateTimePickerSplit>
              )}
            </div>
          </div>

          {/* PLANNED EVENTS ON CHOSEN DATE */}
          <label className='label'>
            Events for {moment(startDatetime).format('dddd MMMM D, YYYY')}
            <div className={events}>
              {!renderedEvents ? (
                <h3>No events scheduled yet!</h3>
              ) : (
                data &&
                data.events.map((event, index) => {
                  if (
                    moment(event.start).format('DD-MM-YYYY') === compareDates
                  ) {
                    return (
                      <div className={eventContainer} key={index}>
                        <h2>{event.title}</h2>
                        <h3>
                          {event.locations[0].streetAddress},{' '}
                          {event.locations[0].city}
                        </h3>
                        <h4>
                          {moment(event.start).format('LT')} -{' '}
                          {moment(event.end).format('LT')}{' '}
                        </h4>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              )}
            </div>
          </label>
          {/* Recurring events: "Repeat type" dropdown component  */}
          <div>
            <label className={formType === 'update' ? 'is-hidden' : null}>
              <span>Repeat&nbsp;type&nbsp; </span>
              {/* rules={{ required: 'Please select an option'}} */}
              <select
                name='frequency'
                className={`${repeaton}`}
                onChange={handleRepeatType}
                ref={register}
              >
                <option selected value=''>
                  Select type
                </option>
                <option value='None'>None</option>
                <option value='Daily'>Daily</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
              </select>
              <p className={`is-size-7 ${errorMessage}`}>
                <ErrorMessage errors={formErrors} name='frequency' />
              </p>
            </label>
          </div>
          {/*  "Repeat every" input */}
          <div className={`${repeatRules}`}>
            {weeks && (
              <div>
                <label>
                  <span>Repeat&nbsp;every&nbsp;</span>
                  <select
                    name='week'
                    className={`${repeaton}`}
                    onChange={handleRepeatEvery}
                    ref={register}
                  >
                    <option selected value=''>
                      Select week
                    </option>
                    <option value='First week'>First week</option>
                    <option value='Second week'>Second week</option>
                    <option value='Third week'>Third week</option>
                    <option value='Fourth week'>Fourth week</option>
                    <option value='Fifth week'>Fifth week</option>
                  </select>
                  <p className={`is-size-7 ${errorMessage}`}>
                    <ErrorMessage errors={formErrors} name='week' />
                  </p>
                </label>
              </div>
            )}
          </div>

          {/* "Repeat until" input */}
          {repeat && (
            <label className={`${errorMargin}`}>
              <div className={`${recInput}`}>
                <span>
                  <strong>Repeat&nbsp;until&nbsp;</strong>
                </span>
                {loading ? (
                  <LoadingDots />
                ) : (
                  <DateTimePickerSplit fallback={<LoadingDots />}>
                    {({default: DateTimePicker}) => (
                      <DateTimePicker
                        monthAriaLabel='Month'
                        dayAriaLabel='Day'
                        yearAriaLabel='Year'
                        hourAriaLabel='Hour'
                        minuteAriaLabel='Minute'
                        amPmAriaLabel='Select AM/PM'
                        clearAriaLabel='Clear Date'
                        onChange={repeatUntilChange}
                        value={repeatUntilDate}
                        className={`${recPicker}`}
                        disableClock={true}
                        minDate={new Date()}
                      />
                    )}
                  </DateTimePickerSplit>
                )}
              </div>
              <p className={`is-size-7 ${errorMessage}`}>
                <ErrorMessage errors={formErrors} name='repeatEnd' />
              </p>
            </label>
          )}

          {/* EVENT DESCRIPTION */}
          <div className={`field ${errorMargin} ${errorMarginMobile}`}>
            <label className='label'>
              Event Description
              <textarea
                className={`${textarea} has-fixed-size`}
                name='description'
                ref={register}
              />
              <p className={`is-size-7 ${errorMessage}`}>
                <ErrorMessage errors={formErrors} name='description' />
              </p>
            </label>
          </div>

          {/* TICKET PRICE */}
          <div className={`field ${errorMargin} ${errorMarginMobile}`}>
            <label className='label'>
              Admission Price
              <input
                className={`${input}`}
                type='text'
                name='ticketPrice'
                ref={register}
                onBlur={onTicketPriceBlur}
                onFocus={() =>
                  getValues().ticketPrice === '0' && setValue('ticketPrice', '')
                }
                onChange={onTicketPriceChange}
                defaultValue='0'
              />
              <p className={`is-size-7 ${errorMessage}`}>
                <ErrorMessage errors={formErrors} name='ticketPrice' />
              </p>
            </label>
          </div>

          {/* EVENT TAGS */}
          <div className={`field ${errorMargin}`}>
            <label>
              Tags
              <TagInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </label>
          </div>

          {/* IMAGE UPLOAD */}
          <div className={`field ${errorMargin} ${flexCenter}`}>
            <label className={`field ${flexCenter}`}>
              Event image
              <div
                className={`field ${flexCenter} dropBox`}
                style={{
                  pointerEvents: 'none',
                }}
              >
                <DropzoneSplit fallback={<LoadingDots />}>
                  {({default: Dropzone}) => (
                    <Dropzone
                      // If used uploads file, replace the image in state with the new uploaded file
                      onDrop={(acceptedFiles) => {
                        if (acceptedFiles.length) {
                          setImages(acceptedFiles)
                          setFileUpload(true)
                        }
                      }}
                    >
                      {({getRootProps, getInputProps}) => (
                        <div className={`${imageUploader} ${flexCenter}`}>
                          <div
                            {...getRootProps()}
                            className={`${uploadContainer} ${flexCenter}`}
                          >
                            <input {...getInputProps()} />
                            {/* Chained ternary is an expression that executes the following logic:
                      1. If an "update" and NO image in upload state, initially show image from database in preview.
                      2. If an "update" and the user has added a new image to upload state, preview the new image
                      3. If an "add" and NO image in upload state, show upload icon
                      4. If an "add" and the user has added a new image to upload state, preview the new image */}
                            {formType === 'update' && !images ? (
                              !(
                                item.eventImages[0] && item.eventImages[0].url
                              ) ? (
                                <UploadIcon />
                              ) : (
                                <img
                                  src={item.eventImages[0].url}
                                  className={imagePreview}
                                  alt='new event'
                                />
                              )
                            ) : formType === 'update' && images ? (
                              <img
                                src={URL.createObjectURL(images[0])}
                                className={imagePreview}
                                alt='new event'
                              />
                            ) : formType === 'add' && !images ? (
                              <UploadIcon />
                            ) : (
                              <img
                                src={URL.createObjectURL(images[0])}
                                className={imagePreview}
                                alt='new event'
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  )}
                </DropzoneSplit>
              </div>
            </label>
          </div>

          {/* FORM CONTROLS (submit and preview) */}
          {/* <button className='button is-medium'>Preview</button> */}
          {mutationLoading || mutationLoadingNS || mutationLoadingES ? (
            <div
              className={` button is-medium ${shark} ${littleTopMargin} is-medium `}
            >
              <LoadingDots bgColor='#fff' />
            </div>
          ) : (
            <input
              className={`button is-medium ${shark} has-text-white ${littleTopMargin}`}
              type='submit'
              value={formType === 'update' ? 'Update Event' : 'Create Event'}
              onClick={(e) => {
                if (isSeries && formType === 'update') {
                  e.preventDefault()
                  handleCreateEvent()
                } else {
                  handleCreateEvent()
                }
              }}
            />
          )}
        </form>

        {showModal && <ErrorModal toggleModal={toggleModal} />}
        {showEditModal && (
          <UpdateEventModal
            toggleEditModal={toggleEditModal}
            isSeries={isSeries}
            modalCreateEvent={modalCreateEvent}
          />
        )}
      </div>
    </>
  )
}

export default EventForm
