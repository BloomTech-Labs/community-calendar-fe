import React from 'react'
import {useForm} from 'react-hook-form'

export default function EventsFormMobile() {
  const {register, handleSubmit, errors} = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='Event Title'
        name='Event Title'
        ref={register}
      />
      <input
        type='text'
        placeholder='Location'
        name='Location'
        ref={register}
      />
      <input
        type='datetime'
        placeholder='Starts Date'
        name='Starts Date'
        ref={register}
      />
      <input
        type='datetime'
        placeholder='Ends Date'
        name='Ends Date'
        ref={register}
      />
      <select name='Type of ticket' ref={register}>
        <option value='Free'>Free</option>
        <option value='Paid'>Paid</option>
      </select>
      <input
        type='text'
        placeholder='Event Tags'
        name='Event Tags'
        ref={register}
      />

      <input type='submit' />
    </form>
  )
}
