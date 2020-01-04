import React from 'react'
import PropTypes from 'prop-types'
import CCLogo from 'icons/CCLogo'
import LoadingDots from './LoadingDots'
import {wrapper, logo} from './Loading.module.scss'

const LoadingLogo = props => {
  return (
    <div className={wrapper}>
      <div className={logo}>
        <CCLogo dimensions={props.dimensions} />
      </div>
      <LoadingDots />
    </div>
  )
}

LoadingLogo.propTypes = {
  dimensions: PropTypes.number,
}

export default LoadingLogo
