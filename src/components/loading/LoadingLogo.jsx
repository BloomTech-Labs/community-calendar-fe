import React from 'react'
import PropTypes from 'prop-types'
import CCLogo from 'icons/CCLogo'
import LoadingDots from './LoadingDots'
import {wrapper, logo} from './Loading.module.scss'

const LoadingLogo = ({dimensions}) => {
  return (
    <div className={wrapper}>
      <div className={logo}>
        <CCLogo dimensions={dimensions} />
      </div>
      <LoadingDots dimensions={Math.round(dimensions * 0.3)} />
    </div>
  )
}

LoadingLogo.propTypes = {
  dimensions: PropTypes.number,
}

export default LoadingLogo
