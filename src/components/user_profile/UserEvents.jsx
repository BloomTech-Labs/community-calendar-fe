import React from 'react'

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
  return (
    <div className={userEvents}>
      <div className={userEventStage}>
        <div className={`${userEventTabs} tabs is-centered`}>
          <ul className={userEventTabsUl}>
            <li className={`is-active ${userEventTab}`}><a className={userEventTabAnchor}>Attending</a></li>
            <li className={userEventTab}><a className={userEventTabAnchor}>Saved</a></li>
            <li className={userEventTab}><a className={userEventTabAnchor}>Created</a></li>
          </ul>
        </div>
        <div className={userEventGrid}></div>
      </div>
  </div>
  )
}

export default UserEvents