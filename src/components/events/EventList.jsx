import React from 'react'
import EventListCard from './EventListCard';

//graphql
import {useQuery} from 'react-apollo'
import {GET_EVENTS} from '../../graphql/events.query'

//styles
import {event_list} from '../style_modules/EventList.module.scss'

export default function EventList() {

  const { data, loading, error } = useQuery(GET_EVENTS);
  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR</p>;

  return (
    <section className={`section ${event_list}`}>
      <h3 className="is-family-secondary is-size-2">Events</h3>
      <h5 className="has-text-weight-bold is-size-4">All Upcoming</h5>
      <br />
      <div className="columns is-multiline">
        {data.events.map(item => 
          (
          <div key={item.id} className="column is-full">
            <EventListCard item={item} />
          </div>
          ))}
      </div>
    </section>
  )
}
