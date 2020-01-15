import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

// Components
import EventListCard from './EventListCard'
import ListIcon from 'icons/ListIcon'
import GridIcon from 'icons/GridIcon'
import LoadingLogo from '../loading/LoadingLogo'

//styles
import {
  column,
  columns,
  isMultiline,
  isNarrow,
  isMobile,
  grid_container,
  list_container,
  iconDivider,
} from './styles/EventList.module.scss'

/*
Shows events near a user in either a list or grid format.
*/
export default function EventList({
  apolloData: {data, loading, error},
  maxDistance,
}) {
  /* used to determine if the events cards should be 
  displayed as list or grid
  */
  const [useListView, setShowListView] = useState(true)

  let eventsToDisplay = []

  const filterByDistance = distance => {
    return data.events.filter(event => {
      return event.locations[0].distanceFromUser <= distance
    })
  }

  if (!loading && !error) {
    if (maxDistance && data.events) {
      eventsToDisplay = filterByDistance(maxDistance)
    } else {
      eventsToDisplay = [...data.events]
    }
  }

  return (
    <>
      <div
        className={`${columns} ${isMobile}`}
        style={{justifyContent: 'flex-end'}}
      >
        <div className={` is-flex level `}>
          <div
            className='is-flex is-clickable'
            onClick={() => setShowListView(true)}
          >
            <ListIcon isActive={useListView} />
          </div>
          <span className={iconDivider}></span>
          <div
            className='is-flex is-clickable'
            onClick={() => setShowListView(false)}
          >
            <GridIcon isActive={!useListView} />
          </div>
        </div>
      </div>
      <div
        className={` ${
          useListView
            ? `${list_container} ${columns} ${isMultiline}`
            : grid_container
        }`}
      >
        {loading && <LoadingLogo dimensions={50} />}
        {error && <p>ERROR</p>}
        {!loading &&
          data &&
          eventsToDisplay.map(item => (
            <EventListCard
              item={item}
              key={item.id}
              useListView={useListView}
            />
          ))}
        {!loading && data && !eventsToDisplay.length && (
          <div className='container'>
            <h5 className='has-text-centered color_chalice'>
              No events found for the selected date(s)
            </h5>
          </div>
        )}
      </div>
    </>
  )
}

EventList.propTypes = {
  apolloData: PropTypes.object,
  maxDistance: PropTypes.number,
}
