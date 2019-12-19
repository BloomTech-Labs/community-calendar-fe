import React from 'react'
import EventList from 'events/EventList'
import ListIcon from 'icons/ListViewIcon'
import ShareIcon from 'icons/ShareIcon'

//styles
import {home} from './home.module'

const Home = () => {
  return (
    <>
      <div>
        <ListIcon />
        <ShareIcon />
      </div>
      <EventList />
    </>
  )
}

export default Home
