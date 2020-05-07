import React, {useState} from 'react'

import {
  userEvents,
  userEventStage,
  userEventTabs,
  userEventTab,
  userEventTabsUl,
  userEventTabAnchor,
  userEventGrid,
  userEventCards,
} from './UserProfile.module.scss'
import EventListCard from '../events/EventListCard'

const UserEvents = ({created, attending, saved}) => {
  const [activeTab, setActiveTab] = useState('1')

  const tabContentSwitch = (tabIndex) => {
    switch (tabIndex) {
      case '1':
        return (
          <div className={`1 ${userEventCards}`}>
            {attending && attending.length ? (
              <>
                {attending.map((item) => (
                  <EventListCard item={item} key={item.id} />
                ))}
              </>
            ) : (
              <p>You are not currently RSVP'd to any events.</p>
            )}
          </div>
        )
      case '2':
        return (
          <div className={`2 ${userEventCards}`}>
            {saved && saved.length ? (
              <>
                {saved.map((item) => (
                  <EventListCard item={item} key={item.id} />
                ))}
              </>
            ) : (
              <p>You have not saved any events yet.</p>
            )}
          </div>
        )
      case '3':
        return (
          <div className={`3 ${userEventCards}`}>
            {created && created.length ? (
              <>
                {created.map((item) => (
                  <EventListCard item={item} key={item.id} />
                ))}
              </>
            ) : (
              <p>You have not created any events yet.</p>
            )}
          </div>
        )
      default:
        return (
          <div className={`1 ${userEventCards}`}>
            {attending && attending.length ? (
              <>
                {attending.map((item) => (
                  <EventListCard item={item} key={item.id} />
                ))}
              </>
            ) : (
              <p>You are not currently RSVP'd to any events.</p>
            )}
          </div>
        )
    }
  }
  return (
    <div className={userEvents}>
      <div className={userEventStage}>
        <div className={`${userEventTabs} tabs is-centered`}>
          <ul className={userEventTabsUl}>
            <li
              className={
                activeTab == '1' ? `is-active ${userEventTab}` : userEventTab
              }
              onClick={() => {
                setActiveTab('1')
              }}
            >
              <a className={userEventTabAnchor}>Attending</a>
            </li>
            <li
              className={
                activeTab == '2' ? `is-active ${userEventTab}` : userEventTab
              }
              onClick={() => {
                setActiveTab('2')
              }}
            >
              <a className={userEventTabAnchor}>Saved</a>
            </li>
            <li
              className={
                activeTab == '3' ? `is-active ${userEventTab}` : userEventTab
              }
              onClick={() => {
                setActiveTab('3')
              }}
            >
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
