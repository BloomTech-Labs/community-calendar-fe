import React, {useState, useEffect} from 'react'
import {useAuth0} from '../../contexts/auth0-context'

import UserInfo from './UserInfo'
import UserEvents from './UserEvents'
import EditUserForm from './EditUserForm'
import GearIcon from '../icons/GearIcon'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_USER_AND_EVENTS} from '../../graphql'

import {
  userProfile,
  profileInfo,
  profileSmall,
  gearWrapper
} from './UserProfile.module.scss'

const UserProfile = ({profileImage, setProfileImage}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(undefined)
  const [lastName, setLastName] = useState(undefined)
  console.log(profileImage)
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery(GET_USER_AND_EVENTS, {variables: {useLocation: false}})
  
  const {
    user
  } = userData || {};
  
  const {
    firstName: first,
    lastName: last,
    createdEvents,
    saved,
    rsvps
  } = user || {};

  useEffect(() => {
    setFirstName(first);
    setLastName(last)
  }, [userData])

  

  return (
    <div className={userProfile}>
      <div className={profileInfo}>
        <div className={gearWrapper} onClick={() => setIsEditing(!isEditing)}>
          <GearIcon isActive={isEditing} />
        </div>
        {isEditing ? (
          <EditUserForm
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            isEditing={isEditing}
            first={firstName}
            last={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
            created={(createdEvents && createdEvents.length) || 0}
            saved={(saved && saved.length) || 0}
            attending={(rsvps && rsvps.length) || 0}
          />
        ) : (
          <UserInfo
            first={firstName}
            last={lastName}
            image={profileImage}
            created={(createdEvents && createdEvents.length) || 0}
            saved={(saved && saved.length) || 0}
            attending={(rsvps && rsvps.length) || 0}
          />
        )}
      </div>
      <UserEvents created={createdEvents} attending={rsvps} saved={saved} loading={userLoading} error={userError}/>
    </div>
  )
}

export default UserProfile
