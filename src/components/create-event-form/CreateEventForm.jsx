import React, {useCallback, useState} from 'react'
import Dropzone from 'react-dropzone'
import {useForm} from 'react-hook-form'
import {states, statesAbbreviated} from './states'
import UploadIcon from '../icons/UploadIcon'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks';
import moment from 'moment';
import TagInput from "./TagInput";

import {
  flexcolumn,
  createEventForm,
  input,
  select,
  flexrow,
  textarea,
  imageUploader,
  shark,
  vSpacing,
  littleTopMargin
} from './styles/CreateEventForm.module.scss'

const CreateEventForm = () => {
  const {register, handleSubmit, errors} = useForm()
  const [images, setImages] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  
const CREATE_EVENT = gql`
mutation CreateEvent(
  $title: String!,
  $description: String!,
  $start: DateTime!
  $end: DateTime!,
  $event_images: [EventCreateImageInput!],
  $locationName: String!,
  $streetAddress1: String!,
  $streetAddress2: String = null,
  $city: String!,
  $state: String!,
  $zipcode: String!,
  $latitude: String = null,
  $longitude: String = null,
  $tags: [EventCreateTagInput!],
  $images: [Upload!]
){
  createEvent(
    data: {
      title: $title
      description: $description
      start: $start
      end: $end
      event_images: $event_images
      locations: {
        create: [
          {
            name: $locationName
            street_address: $streetAddress1
            street_address2: $streetAddress2
            city: $city
            zipcode: $zipcode
            state: $state
            latitude: $latitude
            longitude: $longitude
          }
        ]
      }
      tags: $tags
    },
    images: $images
  ) {
    id
  }
}
`;

const [createEvent, {data, error}] = useMutation(CREATE_EVENT);

  const onSubmit = dataValues => {
    // createEvent({variables: {images}});
    console.log(dataValues);

    if(error){
      console.log(error);
    }
  }

  if(errors.length > 0){
    console.log('errors', errors)
  }
  

  return (
    <div className={`${createEventForm}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${flexcolumn}`}>
        <div className={`${vSpacing}`}>
          <label>
            Event Title
            <input
              className={`${input}`}
              type='text'
              name='Event Title'
              ref={register}
            />
          </label>
        </div>
        <div>
          <label>
            Location
            <div className={`${vSpacing}`}>
              <label>
                Place Name
                <input
                  className={`${input}`}
                  type='text'
                  placeholder='Enter place name if applicable'
                  name='Place Name'
                  ref={register}
                />
              </label>
              <div className={`${flexrow}`}>
                <div className={`${vSpacing}`}>
                  <label>
                    Street Address
                    <input
                      className={`${input}`}
                      type='text'
                      name='Street Address'
                      ref={register}
                    />
                  </label>
                </div>
                <div className={`${vSpacing}`}>
                  <label>
                    Street Address 2
                    <input
                      className={`${input}`}
                      type='text'
                      name='Street Address 2'
                      ref={register}
                    />
                  </label>
                </div>
              </div>
              <div className={`${flexrow}`}>
                <div className={`${vSpacing}`}>
                  <label>
                    City
                    <input
                      className={`${input}`}
                      type='text'
                      name='City'
                      ref={register}
                    />
                  </label>
                </div>
                <div className={`${vSpacing}`}>
                  <label>
                    State
                    <select
                      name='State'
                      ref={register}
                      className={`${select}`}
                      style={{display: 'block'}}
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
                <div className={`${vSpacing}`}>
                  <label>
                    Zip Code
                    <input
                      className={`${input}`}
                      type='text'
                      name='Zip Code'
                      ref={register}
                    />
                  </label>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* event dates */}
        <div className={`${flexrow}`}>
          <label>
            Starts
            <div className={`${flexrow} ${vSpacing}`}>
              <input
                className={`${select}`}
                type='date'
                placeholder='Start Date'
                name='Start Date'
                ref={register}
              />
              <input
                className={`${select}`}
                type='time'
                placeholder='Start Time'
                name='Start Time'
                ref={register}
              />
            </div>
          </label>
          <label>
            Ends
            <div className={`${flexrow} ${vSpacing}`}>
              <input
                className={`${select}`}
                type='date'
                placeholder='End Date'
                name='End Date'
                ref={register}
              />
              <input
                className={`${select}`}
                type='time'
                name='End Time'
                ref={register}
              />
            </div>
          </label>
        </div>
        <div >
        <label>
          Event Description
          <textarea
            className={`${textarea} has-fixed-size`}
            name='Description'
            ref={register}
          />
        </label>
        </div>
        <div>
        <label>
          Type of ticket
          <select
            name='Type of ticket'
            ref={register}
            className={`${select}`}
            style={{display: 'block'}}
          >
            <option value='Free'>Free</option>
            <option value='Paid'>Paid</option>
          </select>
        </label>
        </div>
        <div> 
          <label>
          Tags 
           <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags}/> 
          {/* <input
            className={`${input}`}
            type='text'
            placeholder='Select tags of event'
            name='Event Tags'
            ref={register}
          /> */}
          </label>
        </div>
        <div className={`${vSpacing}`}>
        <label style={{pointerEvents: "none"}}>
            Event image
            <div>
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

export default CreateEventForm
