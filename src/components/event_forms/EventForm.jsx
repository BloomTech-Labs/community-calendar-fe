

// import {useDropdown} from '../../utils'


import React, {useState, useEffect} from 'react'
import loadable from '@loadable/component'
import ReactGA from 'react-ga'
import moment from 'moment'

// import dropdown from 'react-bulma-components/lib/components/dropdown'

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import TagInput from './TagInput'
import ErrorModal from './ErrorModal'

// form data
import {states, statesAbbreviated} from './states'
import {eventSchema} from './eventSchema'

// utils
import {fetchGeocode} from '../../utils'

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

  const endChange = (datetime) => {
    setEndDatetime(datetime)
  }

  // error modal state
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal)
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

    mutation({variables: mutationValues})
  } //end onSubmit

  // if image is uploaded and error is true, remove the error
  if (fileUpload && error) {
    document.querySelector(`.${dropBoxError}`).remove()
  }

  // if user attempt to submit empty form throw error
  if (Object.keys(formErrors).length && !fileUpload) {
    if (!error) {
      appendErrorOnImageUploader()
    }
  }

  // log errors and success messages
  useEffect(() => {
    if (mutationError) {
      setShowModal(true)
    }
  }, [mutationError])

  if (mutationData) {
    const {id} = mutationData.addEvent || mutationData.updateEvent
    props.history.push(`/events/${id}`)
  }

  const handleCreateEvent = () => {
    if (formType === 'update') {
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
  // toggle is-active class on dropdown menu
  let dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdown.classList.toggle('is-active');
  });
  // render form component
  return (
    <>
      {loading && <LoadingLogo />}
      <div className={`${createEventForm}`}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${flexcolumn}`}>
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

          
{/* Recurring events: Repeat type input */}
<label>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css"/> 
            <div class='dropdown'>
              {/* <div className={`${repeat}`}> */}
              {/* <div class='dropdown is-hoverable'>               */}
                <span>Repeat&nbsp;type&nbsp;</span>
                <div class='dropdown-trigger'>
                  <button
                    class='button is-small'
                    aria-haspopup='true'
                    aria-controls='dropdown-menu'
                    >                    
                    <span>Select type</span>
                    <span class='icon is-small'>
                      <i class='fas fa-angle-down' aria-hidden='true'></i>
                    </span>
                  </button>
                </div>
                <div class='dropdown-menu' id='dropdown-menu' role='menu'>
                  <div class='dropdown-content'>
                    <a href="#" class='dropdown-item'>
                      None
                    </a>                   
                    <a href="#" class='dropdown-item is-active'>
                      Daily
                    </a>
                    <a href="#" class='dropdown-item'>
                      Weekly
                    </a>                    
                    <a href="#" class='dropdown-item'>
                      Monthly
                    </a>
                    <hr class='dropdown-divider' />
                    <a href='#' class='dropdown-item'>
                      With a divider
                    </a>
                  </div>
                </div>
               </div> 
            {/* </div> */}
          </label>   
 

          {/* EVENT DESCRIPTION */}
          <div className={`field ${errorMarginMobile}`}>
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
          {mutationLoading ? (
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
              onClick={handleCreateEvent()}
            />
          )}
        </form>

        {showModal && <ErrorModal toggleModal={toggleModal} />}
      </div>
    </>
  )
}

export default EventForm
