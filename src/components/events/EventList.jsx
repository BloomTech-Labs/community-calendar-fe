import React, {useState} from 'react'
import PropTypes from 'prop-types'

// Components
import EventListCard from './EventListCard'
import ListIcon from 'icons/ListIcon'
import GridIcon from 'icons/GridIcon'
import LoadingLogo from '../loading/LoadingLogo'

//utils
import {filterByDistance} from '../../utils'

//styles
import {
  column,
  columns,
  isMultiline,
  isNarrow,
  isMobile,
  cardWrapper,
  grid_container,
  list_container,
  iconDivider,
} from './styles/EventList.module.scss'

/*
EventList shows events passed in on the apolloData prop to the user 
-The component can be displayed in either a list or grid format.
-Filtering by time range happens server side through parent component's useQuery
-Filtering by distance happens when parent component passes `maxDistance` prop
*/

export default function EventList({apolloData: {data, loading, error}}) {
  // useListView determines if the cards should be displayed as list or grid
  const [useListView, setShowListView] = useState(true)

  return (
    <>
      {/* List and Grid view toggle buttons */}
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

      {/* List of events */}
      <div className={cardWrapper}>
        <div
          className={` ${
            useListView
              ? `${list_container} ${columns} ${isMultiline}`
              : grid_container
          }`}
        >
          {/* Render loading spinner during fetch or error message on error */}
          {loading && <LoadingLogo dimensions={50} />}
          {error && (
            <p>Error fetching data from the server, please refresh the page</p>
          )}

          {/* Render EventListCards for each item in `eventsToDisplay` array */}
          {!loading &&
            !error &&
            data.events.map(item => (
              <EventListCard
                item={item}
                key={item.id}
                useListView={useListView}
              />
            ))}

          {/* Inform user if query/filtering resolves to empty array with no error */}
          {!loading && data && !data.events.length && (
            <div className='container'>
              <h5 className='has-text-centered color_chalice'>
                No events found for the selected date(s)
              </h5>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

EventList.propTypes = {
  apolloData: PropTypes.object,
  maxDistance: PropTypes.number,
}
