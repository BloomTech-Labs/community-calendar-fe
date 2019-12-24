import React, {useEffect} from 'react'
import EventListCard from './EventListCard'

//graphql
import {useQuery} from 'react-apollo'
import {GET_EVENTS} from '../../graphql/events.query'
//styles
import {
  event_list,
  event_filter_buttons,
} from '../style_modules/EventList.module.scss'

export default function EventList() {
  const {data, loading, error} = useQuery(GET_EVENTS)
  useEffect(() => {
    console.log('EventList Mounted')
    return () => console.log('EventList dismounted')
  }, [])

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
      <div className='columns'></div>
      <div className='column'></div>
      <div className='column'></div>
      <div className='columns is-multiline'>
        {data.events.map(item => (
          <div key={item.id} className='column is-full'>
            <EventListCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
