import React, {useState, useEffect} from 'react'
import EventListCard from './EventListCard'
import ListIcon from 'icons/ListIcon'
import GridIcon from 'icons/GridIcon'

//graphql
import {useQuery} from 'react-apollo'
import {GET_EVENTS} from '../../graphql/events.query'
//styles
import {
  event_list,
  event_filter_buttons,
  grid_container,
  iconDivider,
} from './styles/EventList.module.scss'

export default function EventList() {
  const [useListView, setShowListView] = useState(true)
  const {data, loading, error} = useQuery(GET_EVENTS)

  if (loading) return <p>LOADING</p>
  if (error) return <p>ERROR</p>

  return (
    <section className={`section ${event_list}`}>
      <h3 className='is-family-secondary is-size-2'>Events</h3>
      <div className={`${event_filter_buttons}`}>
        <button className='color_chalice is-size-4'>Today</button>
        <button className='color_chalice is-size-4'>Tomorrow</button>
        <button className='color_chalice is-size-4'>This Weekend</button>
        <button className='color_black has-text-weight-bold is-size-4'>
          All Upcoming
        </button>
      </div>
      <div>
        <ListIcon />
        <span className={iconDivider}>&#124;</span>
        <GridIcon />
      </div>
      <div
        className={` ${useListView ? 'columns is-multiline' : grid_container}`}
      >
        {data.events.map(item => (
          <EventListCard key={item.id} item={item} useListView={useListView} />
        ))}
      </div>
    </section>
  )
}
