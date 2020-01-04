import React from 'react'
import PropTypes from 'prop-types'
import {dots, dot} from './Loading.module.scss'

const LoadingDots = props => {
  const size = props.dimensions ? props.dimensions : '8'
  return (
    <div className={dots}>
      <div
        className={dot}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: 0,
        }}
      ></div>
      <div
        className={dot}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: '0.2s',
        }}
      ></div>
      <div
        className={dot}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: '0.4s',
        }}
      ></div>
    </div>
  )
}

LoadingDots.propTypes = {
  dimensions: PropTypes.number,
}
export default LoadingDots
