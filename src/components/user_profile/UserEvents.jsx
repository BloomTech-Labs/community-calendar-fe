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

const UserEvents = ({created, attending, saved, loading, error}) => {

  const [activeTab, setActiveTab] = useState('1');
 
  // replace switch statement with following commented-out function
  const tabContentSwitch = (tabIndex) => {
    switch(tabIndex) {
      case '1':
        return (
        <div className={`1 ${userEventCards}`}>
            {(attending && attending.length) ? (
              <EventList apolloData={{data: attending, loading, error}}/>
            ) : (<p>You are not currently RSVP'd to any events.</p>)}
          </div>
          );
      case '2':
        return (
        <div className={`2 ${userEventCards}`}>
          {(saved && saved.length) ? (
              <EventList apolloData={{data: saved, loading, error}}/>
            ) : (<p>You have not saved any events yet.</p>)}
        </div>
        );
      case '3':
        return (
        <div className={`3 ${userEventCards}`}>
          {(created && created.length) ? (
              <EventList apolloData={{data: created, loading, error}}/>
            ) : (<p>You have not created any events yet.</p>)}
        </div>
        );
      default:
        return (
        <div className={`1 ${userEventCards}`}>
          {(attending && attending.length) ? (
            <EventList apolloData={{data: attending, loading, error}}/>
            ) : (<p>You are not currently RSVP'd to any events.</p>)}
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
              setActiveTab('1')
              }}>
              <a className={userEventTabAnchor}>Attending</a>
            </li>
            <li className={activeTab == '2' ? `is-active ${userEventTab}` : userEventTab} onClick={() => {
              setActiveTab('2')
              }}>
              <a className={userEventTabAnchor}>Saved</a>
            </li>
            <li className={activeTab == '3' ? `is-active ${userEventTab}` : userEventTab} onClick={() => {
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