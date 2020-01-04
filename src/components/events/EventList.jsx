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

export default function EventList({apolloData: {data, loading, error}}) {
  const [useListView, setShowListView] = useState(true)

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
        {data &&
          data.events.map(item => (
            <EventListCard
              item={item}
              key={item.id}
              useListView={useListView}
            />
          ))}
      </div>
    </>
  )
}

EventList.propTypes = {
  apolloData: PropTypes.object,
}
