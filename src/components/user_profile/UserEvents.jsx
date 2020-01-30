import React, { useState } from 'react'

import EventList from '../events/EventList'

import {
  userEvents,
  userEventStage,
  userEventTabs,
  userEventTab,
  userEventTabsUl,
  userEventTabAnchor,
  userEventGrid,
  userEventCards
} from './UserProfile.module.scss'

import {useLazyQuery, useQuery, useApolloClient} from '@apollo/react-hooks'
import {
  GET_USER_ATTENDING,
  GET_USER_CREATED,
  GET_USER_SAVED
} from '../../graphql'




const UserEvents = () => {

  const [activeTab, setActiveTab] = useState('1');
  const {data: attendingData, loading: attendingLoading, error: attendingError, refetch: attendingRefetch} = useQuery(GET_USER_ATTENDING, {variables: {useLocation: false, userLatitude: undefined, userLongitude: undefined}})
  const [getCreated, {data: createdData, loading: createdLoading, error: createdError}] = useLazyQuery(GET_USER_CREATED, {variables: {useLocation: false, userLatitude: undefined, userLongitude: undefined}})
  const [getSaved, {data: savedData, loading: savedLoading, error: savedError}] = useLazyQuery(GET_USER_SAVED, {variables: {useLocation: false, userLatitude: undefined, userLongitude: undefined}})
  
  if(createdData){
    console.log(createdData)
  }
  if(attendingData && attendingData.user && attendingData.user.rsvps  && attendingData.user.rsvps.length){
    console.log(attendingData.user.rsvps)
  }
  if(savedData){
    console.log(savedData)
  }

  // replace switch statement with following commented-out function
  const tabContentSwitch = (tabIndex) => {
    switch(tabIndex) {
      case '1':
        return (
        <div className={`1 ${userEventCards}`}>
            {(attendingData && attendingData.user && attendingData.user.rsvps  && attendingData.user.rsvps.length) ? (
              <EventList apolloData={{data: attendingData.user.rsvps, loading: attendingLoading, error: attendingError}}/>
            ) : (<p>You are not currently RSVP'd to any events.</p>)}
          </div>
          );
      case '2':
        return (
        <div className={`2 ${userEventCards}`}>
          {(savedData && savedData.user && savedData.user.saved && savedData.user.saved.length) ? (
              <EventList apolloData={{data: savedData.user.saved, loading: savedLoading, error: savedError}}/>
            ) : (<p>You have not saved any events yet.</p>)}
        </div>
        );
      case '3':
        return (
        <div className={`3 ${userEventCards}`}>
          {(createdData && createdData.user && createdData.user.created && createdData.user.created.length) ? (
              <EventList apolloData={{data: createdData.user.saved, loading: savedLoading, error: savedError}}/>
            ) : (<p>You have not created any events yet.</p>)}
        </div>
        );
      default:
        return (
        <div className={`1 ${userEventCards}`}>
          {(attendingData && attendingData.user && attendingData.user.rsvps && attendingData.user.rsvps.length) ? (
            <EventList apolloData={{data: attendingData.user.rsvps, loading: attendingLoading, error: attendingError}}/>
            ) : (<p>lol</p>)}
        </div>
        );
    }
  }
  // const tabContentSwitch = (tabIndex, eventData) => {
  //   return (
  //     {eventData.map(event => (
  //       <EventListCard className={`${tabIndex} ${userEventCards}`} event={event} key={event.id} useListView={listView} />
  //     ))}
  //   )
  // }

  return (
    <div className={userEvents}>
      <div className={userEventStage}>
        <div className={`${userEventTabs} tabs is-centered`}>
          <ul className={userEventTabsUl}>
            <li className={activeTab == '1' ? `is-active ${userEventTab}` : userEventTab} onClick={() => {
              attendingRefetch()
              setActiveTab('1')
              }}>
              <a className={userEventTabAnchor}>Attending</a>
            </li>
            <li className={activeTab == '2' ? `is-active ${userEventTab}` : userEventTab} onClick={() => {
              getSaved()
              setActiveTab('2')
              }}>
              <a className={userEventTabAnchor}>Saved</a>
            </li>
            <li className={activeTab == '3' ? `is-active ${userEventTab}` : userEventTab} onClick={() => {
              getCreated()
              setActiveTab('3')
            }}>
              <a className={userEventTabAnchor}>Created</a>
            </li>
          </ul>
        </div>
        <div className={userEventGrid}>
          <div className={`1 ${userEventCards}`}>
            {tabContentSwitch(activeTab)}
          </div>
        </div>
      </div>
  </div>
  )
}

export default UserEvents