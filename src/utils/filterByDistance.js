const filterByDistance = (distance, events) => {
  return events.filter(event => {
    return (
      event.locations[event.locations.length - 1].distanceFromUser <= distance
    )
  })
}

export default filterByDistance
