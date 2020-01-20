const filterByDistance = (distance, events) => {
  return events.filter(event => {
    return event.locations[0].distanceFromUser <= distance
  })
}

export default filterByDistance
