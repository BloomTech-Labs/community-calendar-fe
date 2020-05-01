import React from 'react'
import PropTypes from 'prop-types'
import CCLogo from '../icons/CCLogo'
import LoadingDots from './LoadingDots'
import {wrapper, logo} from './Loading.module.scss'

/* Loading animation .
  Shows the Community Calendar logo spinning
  and dots underneath.

  'dimensions' is the width and height of the CC Logo in px. The dot size is calculated from the logo size.
*/
const LoadingLogo = ({dimensions = 50}) => {
  return (
    <div className={wrapper}>
      <div className={logo}>
        <CCLogo dimensions={dimensions} />
      </div>
      <LoadingDots dotSize={Math.round(dimensions * 0.3)} />
    </div>
  )
}

LoadingLogo.propTypes = {
  dimensions: PropTypes.number,
}

export default LoadingLogo
