import React, {useState} from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import LoadingLogo from '../components/loading/LoadingLogo'

const UserProfile = loadable(
  () =>
    import(
      /* webpackChunkName: "userProfile" */ '../components/user_profile/UserProfile'
    ),
  {
    fallback: (
      <div
        className='container level is-flex'
        style={{height: '100vh', width: '100vw'}}
      >
        <LoadingLogo />
      </div>
    ),
  },
)

const UserProfilePage = () => {
  return <UserProfile />
}

export default UserProfilePage
