import React, {useState} from 'react'
import * as yup from 'yup';

// form components
import {useForm, ErrorMessage} from 'react-hook-form'
import DateTimePicker from 'react-datetime-picker';
import Dropzone from 'react-dropzone'
import TagInput from "./TagInput";

// form data
import {states, statesAbbreviated} from './states'
import {eventSchema} from './eventSchema'

// styles
import UploadIcon from '../icons/UploadIcon'
import {
  createEventForm,
  input,
  select,
  shark,
  errorMessage,
  errorMargin,
  errorMarginMobile,
  vSpacing,
  littleTopMargin,
  littleTopPadding,
  location,
  picker,
  textarea,
  imageUploader,
  uploadContainer,
  flexcolumn,
  flexrow,
  tabletFlexrow,
  tabletEndfield,
  desktopFlexrow,
  desktopEndfield
} from './styles/EventForm.module.scss'
import { date } from 'yup';

const EventForm = (props) => {

  /* FORM FUNCTIONS AND DATA:
  Destructure `formType`, `item`, `mutation` function, `mutationData`, and `mutationError`
  `formType` is "add" or "update"
  `item` is result of GET_EVENT_BY_ID query which is only passed down for an EditForm
  `mutation` is AddEvent or UpdateEvent as defined in parent useMutation
  `mutationData` and `mutationError` could possibly be removed and handled in parent */
  const {formType, item, mutation, mutationData, mutationError} = props;

  /* FORM STATE:
  react-hook-form manages state for all text values (location and details) inputted by user
  `tags`, `images`, `startDatetime`, and `endDatetime` all require custom state handlers */

  /* react-hook-form state:
  Destructure the `register` value handler, submit handler, and error handler
  Ternary maps values passed in on `item` prop as default values for `update` forms
  yup validationSchema imported from `eventSchema.js` */
  const {register, handleSubmit, errors: formErrors} = (formType === "update" && item) ?
    useForm({
      validationSchema: eventSchema,
      defaultValues: {
        title: item.title || null,
        placeName: item.locations[0].name || null,
        streetAddress: item.locations[0].streetAddress || null,
        streetAddress2: item.locations[0].streetAddress2 || null,
        city: item.locations[0].city || null,
        state: item.locations[0].state || null,
        zipcode: item.locations[0].zipcode || null,
        description: item.description || null,
        ticketType: item.ticketType || null
      }
    }) :
    useForm({validationSchema: eventSchema});
    
  // create `tag` state to be used in backend mutation request
  // Ternary maps values passed in on `item` prop as default tags for `update` forms, 
  const [selectedTags, setSelectedTags] = (formType === "update" && item.tags.length) ?
    useState(item.tags.map(tag => tag.title)) :
    useState([]);

  // create `images` state to be used in backend mutation request
  const [images, setImages] = useState(null);
  
  // create `startDatetime` state to be used in datepicker and backend mutation request
  // defaults to the next noon (today or tomorrow)
  let nextNoon = new Date();
  if (nextNoon.getHours() >= 12) nextNoon.setDate(nextNoon.getDate() + 1)
  nextNoon.setHours(12, 0, 0, 0)

  const [startDatetime, setStartDatetime] = (formType === "update" && item.start) ?
  useState(item.start) :
  useState(nextNoon);

  const startChange = (datetime) => {
    setStartDatetime(datetime);
  }

  // create `endDatetime` state to be used in datepicker and backend mutation request
  // defaults to 3PM after the next noon (today or tomorrow)
  let nextAfternoon = new Date();
  if (nextAfternoon.getHours() >= 12) nextAfternoon.setDate(nextAfternoon.getDate() + 1)
  nextAfternoon.setHours(15, 0, 0, 0)
  
  const [endDatetime, setEndDatetime] = (formType === "update" && item.end) ?
    useState(item.end) :
    useState(nextAfternoon);

  const endChange = (datetime) => {
    setEndDatetime(datetime);
  }

  // submit handler pulls together state from all sources and creates a mutation request
  const onSubmit = formValues => {
    const {
      title,
      placeName,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipcode,
      description,
      ticketType
    } = formValues;
    
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
      tags: selectedTags.length ? selectedTags.map(tag => ({title: tag})) : [],
      ticketType,
      images,
      eventImages: images && images.length ? [] : undefined
    }

    console.log(mutationValues, "mutation values");

    mutation({variables: mutationValues});
  }

  // log errors and success messags
  if(mutationError){
    console.log(mutationError);
  }
  if(mutationData){
    console.log(mutationData);
    const {id} = mutationData.addEvent || mutationData.updateEvent;
    props.history.push(`/events/${id}`);
  }
  if(formErrors.length > 0){
    console.log('form errors', formErrors)
  }

  // render form component
  return (
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
                <ErrorMessage errors={formErrors} name="title" />
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
                  <ErrorMessage errors={formErrors} name="placeName" />
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
                      <ErrorMessage errors={formErrors} name="streetAddress" />
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
                      <ErrorMessage errors={formErrors} name="streetAddress2" />
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
                      <ErrorMessage errors={formErrors} name="city" />
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
                      <ErrorMessage errors={formErrors} name="state" />
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
                      <ErrorMessage errors={formErrors} name="zipcode" />
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
            <label className='label'>
              Starts
            </label>
            <DateTimePicker
              onChange={startChange}
              value={startDatetime}
              className={picker}
              disableClock={true}
              minDate={new Date()}
            />
          </div>

          {/* Group 2: End date/time */}
          <div className={`${desktopEndfield} field`}>
            <label className='label'>
              Ends
            </label>
            <DateTimePicker
              onChange={endChange}
              value={endDatetime}
              className={picker}
              disableClock={true}
              minDate={new Date()}
            />
          </div>
        </div>

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
              <ErrorMessage errors={formErrors} name="description" />
            </p>
          </label>
        </div>

        {/* TICKET TYPE */}
        <div className={`field ${errorMargin}`}>
          <label className='label'>
            Type of ticket
            <select
              name='ticketType'
              ref={register}
              className={`${select}`}
              style={{display: 'block'}}
            >
              <option value='FREE'>Free</option>
              <option value='PAID'>Paid</option>
            </select>
            <p className={`is-size-7 ${errorMessage}`}>
              <ErrorMessage errors={formErrors} name="ticketType" />
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
        <div className={`field ${errorMargin}`}>
          <label className='label'>
            Event image
            <div style={{pointerEvents: 'none'}}>
              <Dropzone
                onDrop={acceptedFiles => {
                  setImages(acceptedFiles)
                }}
              >
                {({getRootProps, getInputProps}) => (
                  <section className={imageUploader}>
                    <div {...getRootProps()} className={uploadContainer}>
                      <input {...getInputProps()} />
                      {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                      <UploadIcon />
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </label>
        </div>

        {/* FORM CONTROLS (submit and preview) */}
        {/* <button className='button is-medium'>Preview</button> */}
        <input
          className={`button is-medium ${shark} has-text-white ${littleTopMargin}`}
          type='submit'
          value={formType === 'update' ? 'Update Event' : 'Create Event'}
        />
      </form>
    </div>
  )
}

export default EventForm
