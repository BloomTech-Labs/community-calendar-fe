import React from 'react'
import {useParams} from 'react-router-dom'

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_EVENTS} from '../graphql/events.query'

//event cards
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'

const SearchResults = () => {
  const {loading, error, data: apolloData, refetch} = useQuery(GET_EVENTS)
  // get search values from  useParams
  const {searchText} = useParams()
  //make request using query params
  const data = {...apolloData}
  //create regex
  let regex = new RegExp(searchText, 'ig')
  // filter results using searchString
  if (!loading && data.events) {
    const filtered = data.events.filter(event => {
      return regex.test(event.title) || regex.test(event.description)
    })
    // apply filtered events to data.events
    data.events = [...filtered]
  }

  console.log('filtered data', data.events)
  /*
useEffect - make query based on params in url on page load?
*/
  return (
    <div className='page-wrapper'>
      <section className='section'>
        <h3 className='is-family-secondary is-size-2 has-text-black-bis'>
          Search Results
        </h3>
        <FilterBtns refetch={refetch} />
        <EventList apolloData={{loading, error, data}} />
      </section>
    </div>
  )
}

export default SearchResults
