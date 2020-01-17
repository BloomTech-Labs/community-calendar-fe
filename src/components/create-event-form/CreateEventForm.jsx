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

  
const ADD_EVENT = gql`
mutation AddEvent(
  $title: String!,
  $description: String!,
  $start: DateTime!
  $end: DateTime!,
  $eventImages: [EventCreateImageInput!],
  $placeName: String!,
  $streetAddress1: String!,
  $streetAddress2: String = null,
  $city: String!,
  $state: String!,
  $zipCode: Int!,
  $latitude: Float = null,
  $longitude: Float = null,
  $tags: [EventCreateTagInput!],
  $ticketType: TicketType!
  $images: [Upload!]
){
  addEvent(
    data: {
      title: $title
      description: $description
      start: $start
      end: $end
      eventImages: $eventImages
      locations: {
        create: [
          {
            name: $placeName
            streetAddress: $streetAddress1
            streetAddress2: $streetAddress2
            city: $city
            zipcode: $zipCode
            state: $state
            latitude: $latitude
            longitude: $longitude
          }
        ]
      }
      tags: $tags
      ticketType: $ticketType
    },
    images: $images
  ) {
    id
  }
}
`;

const [addEvent, {data, error}] = useMutation(ADD_EVENT);

  const onSubmit = dataValues => {
    const {
      title,
      placeName,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zipCode,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      ticketType
    } = dataValues;

    addEvent({variables: {
        title,
        description,
        start: moment(startDate + startTime, 'YYYY-MM-DDhh:mm').toISOString(),
        end: moment(endDate + endTime, 'YYYY-MM-DDhh:mm').toISOString(),
        placeName,
        streetAddress1,
        streetAddress2,
        city,
        state,
        zipCode: parseInt(zipCode),
        tags: selectedTags.length ? selectedTags.map(tag => ({title: tag.title})) : null,
        ticketType,
        images
      }
    });

    if(error){
      console.log(error);
    }
  }

  if(data){
    console.log(data);
  }

  if(errors.length > 0){
    console.log('errors', errors)
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
                name='Event Title'
                ref={register}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Location
            <div className="field">
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
              <div className={`${flexrow}`}>
                <div className="field">
                  <label className="label">
                    Street Address
                    <input
                      className={`${input}`}
                      type='text'
                      name='streetAddress1'
                      ref={register}
                    />
                  </label>
                </div>
                <div className="field left-margin">
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
              <div className={`${flexrow}`}>
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
                <div className="field left-margin">
                  <label className="label">
                    State
                    <select
                      name='state'
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
                <div className="field left-margin">
                  <label className="label">
                    Zip Code
                    <input
                      className={`${input}`}
                      type='text'
                      name='zipCode'
                      ref={register}
                    />
                  </label>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* event dates */}
        <div className={`${flexrow} field `}>
          <label className="label">
            Starts
            <div className={`${flexrow}`}>
              <input
                className={`${select}`}
                type='date'
                placeholder='Start Date'
                name='startDate'
                ref={register}
              />
              <input
                className={`${select}`}
                type='time'
                placeholder='Start Time'
                name='startTime'
                ref={register}
              />
            </div>
          </label>
          <div className="field">
            <label className="label">
              Ends
              <div className={`${flexrow}`}>
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
          <label className="label" style={{pointerEvents: "none"}}>
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
