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




const UserEvents = () => {

  const [activeTab, setActiveTab] = useState('1');

  
  // replace switch statement with following commented-out function
  const tabContentSwitch = (param) => {
    switch(param) {
      case '1':
        return <div className={`1 ${userEventCards}`}>Attending</div>;
      case '2':
        return <div className={`2 ${userEventCards}`}>Saved</div>;
      case '3':
        return <div className={`3 ${userEventCards}`}>Created</div>;
      default:
        return <div className={`1 ${userEventCards}`}></div>;
    }
  }
  // const tabContentSwitch = (param, eventData) => {
  //   return (
  //     {eventData.map(item => (
  //       <EventListCard className={`${param} ${userEventCards}`} item={item} key={item.id} useListView={listView} />
  //     ))}
  //   )
  // }

  return (
    <div className={userEvents}>
      <div className={userEventStage}>
        <div className={`${userEventTabs} tabs is-centered`}>
          <ul className={userEventTabsUl}>
            <li className={activeTab == '1' ? `is-active ${userEventTab}` : userEventTab} onClick={() => setActiveTab('1')}>
              <a className={userEventTabAnchor}>Attending</a>
            </li>
            <li className={activeTab == '2' ? `is-active ${userEventTab}` : userEventTab} onClick={() => setActiveTab('2')}>
              <a className={userEventTabAnchor}>Saved</a>
            </li>
            <li className={activeTab == '3' ? `is-active ${userEventTab}` : userEventTab} onClick={() => setActiveTab('3')}>
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