import * as yup from 'yup'

// the `required` method for `email` is disabled to allow Andy to test `ErrorModal` by inducing a server error for empty email field
// if the schema is written properly, it should be impossible to induce an error otherwise!

export const eventSchema = yup.object().shape({
  formType: yup.string(),
  title: yup
    .string()
    .required('Please give your event a title')
    .max(128, 'Event title is too long'),
  placeName: yup
    .string()
    .required('Place name is required')
    .max(128, 'Place name is too long'),
  streetAddress: yup
    .string()
    .required('Street address is required')
    .max(128, 'Address is too long'),
  streetAddress2: yup.string().max(128, 'Address is too long'),
  city: yup.string().required('City is required').max(32, 'City is too long'),
  state: yup
    .string()
    .required('State is required')
    .notOneOf(['Select state'], 'State is required'),
  zipcode: yup
    .number()
    .typeError('Please enter 5-digit zip code')
    .positive('Please enter 5-digit zip code')
    .required('Please enter 5-digit zip code')
    .min(10000, 'Please enter 5-digit zip code')
    .max(99999, 'Please enter 5-digit zip code'),
  description: yup.string().required('Description is required'),
  ticketPrice: yup
    .number()
    .required('Price is required')
    .typeError('Please enter a positive number')
    .min(0, 'Please specify a price or enter 0 if the event is free'),
  frequency: yup.string().when('formType', {
    is: 'add',
    then: yup.string().required('Please select an option'),
  }),
  week: yup.string().when('frequency', {
    is: 'Monthly',
    then: yup.string().required('Please select a week'),
  }),
})
