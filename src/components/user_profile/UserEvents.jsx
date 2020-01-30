import React, { useState } from 'react'

import EventListCard from '../events/EventListCard'

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
  const {data: createdData, loading: createdLoading, error: createdError, refetch: createdRefetch} = useLazyQuery(GET_USER_CREATED, {variables: {useLocation: false, userLatitude: undefined, userLongitude: undefined}})
  const {data: savedData, loading: savedLoading, error: savedError, refetch: savedRefetch} = useLazyQuery(GET_USER_SAVED, {variables: {useLocation: false, userLatitude: undefined, userLongitude: undefined}})
  
  // replace switch statement with following commented-out function
  const tabContentSwitch = (tabIndex) => {
    switch(tabIndex) {
      case '1':
        return (
        <div className={`1 ${userEventCards}`}>
            Attending
          </div>
          );
      case '2':
        return (
        <div className={`2 ${userEventCards}`}>
          Saved
        </div>
        );
      case '3':
        return (
        <div className={`3 ${userEventCards}`}>
          Created
        </div>
        );
      default:
        return (
        <div className={`1 ${userEventCards}`}>

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
              savedRefetch()
              setActiveTab('2')
              }}>
              <a className={userEventTabAnchor}>Saved</a>
            </li>
            <li className={activeTab == '3' ? `is-active ${userEventTab}` : userEventTab} onClick={() => {
              createdRefetch()
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