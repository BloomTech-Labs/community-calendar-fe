//when creating an event series, this function will be used in EventForm.jsx when creating an event
export default function createEventSeries(
  startDate,
  endDate,
  repeatFreq,
  week = '',
) {
  //this function takes in information about how many times to repeat the event and returns an array of dates to create the event for
  let eventDate = startDate
  const eventDates = []
  let whichWeek = -1

  if (week === 'First week') whichWeek = 1
  else if (week === 'Second week') whichWeek = 2
  else if (week === 'Third week') whichWeek = 3
  else if (week === 'Fourth week') whichWeek = 4
  else if (week === 'Fifth week') whichWeek = 5

  switch (repeatFreq) {
    case 'None':
      eventDates.push(eventDate)
      break
    case 'Daily':
      //while eventDate <= endDate
      //add date to eventDates
      //add 1 day to eventDate
      while (eventDate <= endDate) {
        eventDates.push(eventDate)
        eventDate = eventDate.setDate(eventDate.getDate() + 1)
      }
      break
    case 'Weekly':
      console.log('repeat Weekly')
      //while eventDate <= endDate
      //add date to eventDates
      //add 1 week to the eventDate
      while (eventDate <= endDate) {
        eventDates.push(eventDate)
        eventDate = eventDate.setDate(eventDate.getDate() + 7)
      }
      break
    case 'Monthly':
      //while eventDate <= endDate
      //add date to eventDates
      //find next day that meets the monthly critera (i.e. 2nd tuesday)
      while (eventDate <= endDate) {
        if (Math.ceil(eventDate.getDate() / 7) === whichWeek)
          eventDates.push(eventDate)
        eventDate = eventDate.setDate(eventDate.getDate() + 7)
      }
      break
    default:
      console.log('invalid repeatFreq')
  }
  console.log(eventDates)
  return eventDates
}
