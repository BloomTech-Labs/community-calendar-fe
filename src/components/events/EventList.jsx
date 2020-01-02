import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

// Components
import EventListCard from './EventListCard'
import ListIcon from 'icons/ListIcon'
import GridIcon from 'icons/GridIcon'

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

export default function EventList({apolloData: {data, loading, error}}) {
  const [useListView, setShowListView] = useState(true)

  if (loading) return <p>LOADING</p>
  if (error) return <p>ERROR</p>

  return (
    <>
      <div
        className={`${columns} ${isMobile}`}
        style={{justifyContent: 'flex-end'}}
      >
        <div className={` ${column} ${isNarrow}`}>
          <div
            className='is-inline-block is-clickable'
            onClick={() => setShowListView(true)}
          >
            <ListIcon isActive={useListView} />
          </div>
          <span className={iconDivider}>&#124;</span>
          <div
            className='is-inline-block is-clickable'
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
        {data.events.map(item => (
          <EventListCard key={item.id} item={item} useListView={useListView} />
        ))}
      </div>
    </>
  )
}

EventList.propTypes = {
  apolloData: PropTypes.object,
}
