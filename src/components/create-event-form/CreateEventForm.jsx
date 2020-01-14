import React, {useCallback} from 'react'
import Dropzone from 'react-dropzone'
import {useForm} from 'react-hook-form'
import {states, statesAbbreviated} from './states'
import UploadIcon from '../icons/UploadIcon'

import {
  flexcolumn,
  createEventForm,
  input,
  select,
  flexrow,
  textarea,
} from './styles/CreateEventForm.module.scss'

const CreateEventForm = () => {
  const {register, handleSubmit, errors} = useForm()

  const onSubmit = data => console.log(data)

  console.log('errors', errors)

  const onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  return (
    <div className={`${createEventForm}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={`${flexcolumn}`}>
        <div>
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
            <div>
              <label>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
                  <label>
                    State
                    <select
                      name='State'
                      ref={register}
                      className={`${select}`}
                      style={{display: 'block'}}
                    >
                      <option disabled selected value></option>
                      {states.map((stateName, i) => (
                        <option value={`${statesAbbreviated[i]}`}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
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
            <div className={`${flexrow}`}>
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
                placeholder='End Time'
                name='End Time'
                ref={register}
              />
            </div>
          </label>
        </div>

        <label>
          Event Description
          <textarea
            className={`${textarea} has-fixed-size`}
            name='Description'
            ref={register}
          />
        </label>
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
        <label>
          Tags
          <input
            className={`${input}`}
            type='text'
            placeholder='Select tags of event'
            name='Event Tags'
            ref={register}
          />
        </label>
        <label>
          Event image
          <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                  <UploadIcon />
                </div>
              </section>
            )}
          </Dropzone>
        </label>
        <input type='submit' />
      </form>
    </div>
  )
}

export default CreateEventForm
