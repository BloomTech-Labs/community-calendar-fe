import React, {useState} from 'react'
import PropTypes from 'prop-types'

// Components
import EventListCard from './EventListCard'
import LoadingLogo from '../loading/LoadingLogo'
import ViewToggle from './ViewToggle'
// import SelectedRange from '../daypicker/selectedRange'

//utils

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

export default function EventList({
  apolloData: {data, loading, error},
  listView
    
}) {
  const filteredDates = data
    ? data.filter((item) => new Date(item.start) - new Date() > 0)
    : null
  return (
    <>
      {/* List and Grid view toggle buttons */}
      <div
        className={`${columns} ${isMobile}`}
        style={{justifyContent: 'flex-end'}}
      ></div>

      {/* List of events */}
      <div className={`${cardWrapper}`}>
        <div
          className={` ${
            listView ? `${list_container} ${columns}` : grid_container
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
            filteredDates.map((item) => (
              <EventListCard item={item} key={item.id} useListView={listView} />
            ))}

          {/* Inform user if query/filtering resolves to empty array with no error */}
          {!loading && !error && data && !data.length && (
            <div className='container' style={{gridColumnStart: 'span 3'}}>
              <h5 className='has-text-centered color_chalice'>
                No events found for the selected filter(s)
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
  listView: PropTypes.bool,
}
