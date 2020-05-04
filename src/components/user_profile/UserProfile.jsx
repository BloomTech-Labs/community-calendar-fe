import React, {useState, useEffect} from 'react'

import UserInfo from './UserInfo'
import UserEvents from './UserEvents'
import EditUserForm from './EditUserForm'
import GearIcon from '../icons/GearIcon'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {
  GET_USER_AND_EVENTS,
  GET_USER_PICTURE_FROM_CACHE,
  GET_USER_ID,
} from '../../graphql'
import gql from 'graphql-tag'

import {
  userProfile,
  profileInfo,
  profileSmall,
  gearWrapper,
} from './UserProfile.module.scss'

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(undefined)
  const [lastName, setLastName] = useState(undefined)
  const client = useApolloClient()

  const {data: profileImageFromCache, refetch: profileImageRefetch} = useQuery(
    GET_USER_PICTURE_FROM_CACHE,
  )

  const {data: userId} = useQuery(GET_USER_ID)

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery(GET_USER_AND_EVENTS, {
    variables: {useLocation: false, userId: userId.userId},
    fetchPolicy: 'no-cache',
  })

  const updateImage = url => {
    client.writeQuery({
      query: gql`
        query GetUserProfileImage {
          profileImage @client
        }
      `,
      data: {
        profileImage: url,
      },
    })
  }

  const {user} = userData || {}

  const {firstName: first, lastName: last, createdEvents, saved, rsvps} =
    user || {}

  useEffect(() => {
    setFirstName(first)
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
            profileImage={
              profileImageFromCache && profileImageFromCache.profileImage
            }
            updateImage={updateImage}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
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
            image={profileImageFromCache && profileImageFromCache.profileImage}
            created={(createdEvents && createdEvents.length) || 0}
            saved={(saved && saved.length) || 0}
            attending={(rsvps && rsvps.length) || 0}
          />
        )}
      </div>
      <UserEvents
        created={createdEvents}
        attending={rsvps}
        saved={saved}
        loading={userLoading}
        error={userError}
      />
    </div>
  )
}

export default UserProfile
