import React, {useState} from 'react'
import moment from 'moment';

// form components
import {useForm} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import TagInput from "./TagInput";

// form data
import {states, statesAbbreviated} from './states'

// styles
import UploadIcon from '../icons/UploadIcon'
import {
  flexcolumn,
  createEventForm,
  input,
  select,
  flexrow,
  responsiveflexrow,
  textarea,
  imageUploader,
  shark,
  vSpacing,
  littleTopMargin,
  location,
  placeName,
  endfield
} from './styles/EventForm.module.scss'

const EventForm = (props) => {

  // destructure formType, item, a mutation function, mutationData, and mutationError from props
  // formType is "add" or "update"
  // item is result of GET_EVENT_BY_ID query which is only passed down for an EditForm
  // mutation is AddEvent or UpdateEvent as defined in parent useMutation
  // mutationData and mutationError could possibly be removed and handled in parent
  const {formType, item, mutation, mutationData, mutationError} = props;

  // react-hook-form manages state for all values for user inputted text, location, and time
  // destructure the `register` value handler, submit handler, and error handler
  // Ternary maps values passed in on `item` prop as default values for `update` forms, 
  const {register, handleSubmit, errors: formErrors} = (formType === "update" && item) ?
    useForm({
        defaultValues: {
          title: item.title || null,
          placeName: item.locations[0].name || null,
          streetAddress: item.locations[0].streetAddress || null,
          streetAddress2: item.locations[0].streetAddress2 || null,
          city: item.locations[0].city || null,
          state: item.locations[0].state || null,
          zipcode: item.locations[0].zipcode || null,
          //startDate
          //startTime
          //endDate
          //endTime
          description: item.description || null,
          ticketType: item.ticketType || null
        }
      }) :
    useForm();
    

  // create additional image and tag state to be used in backend mutation request
  const [images, setImages] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);


  console.log("formType and item props in EventForm", formType, item);

  const onSubmit = formValues => {
    const {
      title,
      placeName,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipcode,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      ticketType
    } = formValues;

    console.log("selected tags", selectedTags)

    mutation({variables: {
        title,
        description,
        start: moment(startDate + startTime, 'YYYY-MM-DDhh:mm').toISOString(),
        end: moment(endDate + endTime, 'YYYY-MM-DDhh:mm').toISOString(),
        placeName,
        streetAddress,
        streetAddress2,
        city,
        state,
        zipcode: parseInt(zipcode),
        tags: selectedTags.length ? selectedTags.map(tag => ({title: tag})) : null,
        ticketType,
        images
      }
    });

    if(mutationError){
      console.log(mutationError);
    }
  }

  if(mutationData){
    console.log(mutationData);
  }

  if(formErrors.length > 0){
    console.log('form errors', formErrors)
  }
  

  return (
    <div className={`${createEventForm}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${flexcolumn}`}>
        <div className="field">
          <label className="label">
            Event Title
            <div className="control">
              <input
                className={`${input} input `}
                type='text'
                name='title'
                ref={register}
              />
            </div>
          </label>
        </div>
        <div className={` field ${location}`}>
          <label className="label">
            Location
            <div className={` field ${placeName}`}>
              <label className="label">
                Place Name
                <input
                  className={`${input}`}
                  type='text'
                  placeholder='Enter place name if applicable'
                  name='placeName'
                  ref={register}
                />
              </label>
              <div className={`${responsiveflexrow}`}>
                <div className="field">
                  <label className="label">
                    Street Address
                    <input
                      className={`${input}`}
                      type='text'
                      name='streetAddress'
                      ref={register}
                    />
                  </label>
                </div>
                <div className={`field ${endfield}`}>
                  <label className="label">
                    Street Address 2
                    <input
                      className={`${input}`}
                      type='text'
                      name='streetAddress2'
                      ref={register}
                    />
                  </label>
                </div>
              </div>
              <div className={`${responsiveflexrow}`}>
                <div className="field">
                  <label className="label">
                    City
                    <input
                      className={`${input}`}
                      type='text'
                      name='city'
                      ref={register}
                    />
                  </label>
                </div>
                <div className={`field ${endfield}`}>
                  <label className="label">
                    State
                    <select
                      name='state'
                      ref={register}
                      className={`${select}`}
                      defaultValue={null}
                    >
                      <option value={null}>Select state</option>
                      {states.map((stateName, i) => (
                        <option key={stateName} value={`${statesAbbreviated[i]}`}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={`field ${endfield}`}>
                  <label className="label">
                    Zip Code
                    <input
                      className={`${input}`}
                      type='text'
                      name='zipcode'
                      ref={register}
                    />
                  </label>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* event dates */}
        <div className={`${responsiveflexrow}`}>
          <div className="field start-field">
            <label className="label">
              Starts
              <div className={`${flexrow}`}>
                <input
                  className={`${select} date-select `}
                  type='date'
                  name='startDate'
                  ref={register}
                />
                <input
                  className={`${select} time-select left-margin `}
                  type='time'
                  name='startTime'
                  ref={register}
                />
              </div>
            </label>
          </div>
          <div className={`field ${endfield}`}>
            <label className="label">
              Ends
              <div className={`${flexrow}`}>
                <input
                  className={`${select} date-select `}
                  type='date'
                  name='End Date'
                  ref={register}
                />
                <input
                  className={`${select} time-select left-margin `}
                  type='time'
                  name='End Time'
                  ref={register}
                />
              </div>
            </label>
          </div>
        </div>
        <div className="field">
        <label className="label">
          Event Description
          <textarea
            className={`${textarea} has-fixed-size`}
            name='description'
            ref={register}
          />
        </label>
        </div>
        <div className="field">
        <label className="label">
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
        </label>
        </div>
        <div> 
          <label>
          Tags 
           <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags}/> 
          </label>
        </div>
        <div className="field">
          <label className="label">
              Event image
            <div style={{pointerEvents: "none"}}>
            <Dropzone onDrop={acceptedFiles => {setImages(acceptedFiles)}}>
              {({getRootProps, getInputProps}) => (
                <section className={imageUploader}>
                  <div {...getRootProps()}>
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
        <button className='button is-medium'>Preview</button>
        <input className={`button is-medium ${shark} has-text-white ${littleTopMargin}`} type='submit' value="Create Event"/>
      </form>
    </div>
  )
}

export default EventForm
