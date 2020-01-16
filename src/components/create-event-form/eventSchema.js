import * as yup from 'yup';

// the `required` method for `email` is disabled to allow Andy to test `ErrorModal` by inducing a server error for empty email field
// if the schema is written properly, it should be impossible to induce an error otherwise!

export const eventSchema = {
  eventTitle: yup.string()
    .required("Please give your event a title")
    .max(128, "Event title is too long"),
  placeName: yup.string()
    .required("Please let us know where your event will be")
    .max(128, "Place name is too long"),
  streetAddress: yup.string()
    .required("Please enter your event's street address")
    .max(128, "Address is too long"),
  streetAddress2: yup.string()
    .max(128, "Address is too long"),
  city: yup.string()
    .required("City is required")
    .max(32, "City is too long"),
  state: yup.string()
    .required("State is required"),
  zip: yup.number()
    .typeError("Please enter 5-digit zip code")
    .positive("Please enter 5-digit zip code")
    .required("Please enter 5-digit zip code")
    .min(10000, "Please enter 5-digit zip code")
    .max(99999, "Please enter 5-digit zip code"),
  // startDate:
  // startTime:
  // endDate:
  // endTime:
  description: yup.string()
    .required("Please tell us about your event")
    .max(1000, "Event description is too long"),
  // eventTags:
  // eventImage:
}