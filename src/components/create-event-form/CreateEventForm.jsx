import React, {useCallback, useState} from 'react'
import Dropzone from 'react-dropzone'
import {useForm} from 'react-hook-form'
import {states, statesAbbreviated} from './states'
import UploadIcon from '../icons/UploadIcon'
import moment from 'moment';

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

  const onSubmit = data => console.log(data)

  console.log('errors', errors)

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
        <div>
          <label className="label">
            Location
            <div className={`${vSpacing}`}>
              <label className="label">
                Place Name
                <input
                  className={`${input}`}
                  type='text'
                  placeholder='Enter place name is applicable'
                  name='Place Name'
                  ref={register}
                />
              </label>
              <div className={`${flexrow}`}>
                <div className={`${vSpacing}`}>
                  <label className="label">
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
                  <label className="label">
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
                  <label className="label">
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
                  <label className="label">
                    State
                    <select
                      name='State'
                      ref={register}
                      className={`${select}`}
                      style={{display: 'block'}}
                    >
                      <option selected value></option>
                      {states.map((stateName, i) => (
                        <option key={stateName} value={`${statesAbbreviated[i]}`}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={`${vSpacing}`}>
                  <label className="label">
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
          <label className="label">
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
          <label className="label">
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
        <label className="label">
          Event Description
          <textarea
            className={`${textarea} has-fixed-size`}
            name='Description'
            ref={register}
          />
        </label>
        </div>
        <div>
        <label className="label">
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
        <label className="label">
          Tags
          <input
            className={`${input}`}
            type='text'
            placeholder='Select tags of event'
            name='Event Tags'
            ref={register}
          />
        </label>
        </div>
        <div className={`${vSpacing}`}>
          <label className="label" style={{pointerEvents: "none"}}>
              Event image
            <div>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section class={imageUploader}>
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
