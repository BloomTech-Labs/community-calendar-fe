import React, { useState } from 'react'

import {
  userEvents,
  userEventStage,
  userEventTabs,
  userEventTab,
  userEventTabsUl,
  userEventTabAnchor,
  userEventGrid
} from './UserProfile.module.scss'

const UserEvents = () => {

  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className={userEvents}>
      <div className={userEventStage}>
        <div className={`${userEventTabs} tabs is-centered`}>
          <ul className={userEventTabsUl}>
            <li className={activeTab == '1' ? `is-active ${userEventTab}` : userEventTab} onClick={() => setActiveTab('1')}><a className={userEventTabAnchor}>Attending</a></li>
            <li className={activeTab == '2' ? `is-active ${userEventTab}` : userEventTab} onClick={() => setActiveTab('2')}><a className={userEventTabAnchor}>Saved</a></li>
            <li className={activeTab == '3' ? `is-active ${userEventTab}` : userEventTab} onClick={() => setActiveTab('3')}><a className={userEventTabAnchor}>Created</a></li>
          </ul>
        </div>
        <div className={userEventGrid}></div>
      </div>
  </div>
  )
}

export default UserEvents