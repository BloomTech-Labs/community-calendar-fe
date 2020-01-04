import React from 'react'
import PropTypes from 'prop-types'
import {dots, dot} from './Loading.module.scss'

const LoadingDots = props => {
  const size = props.dimensions ? props.dimensions : '8'
  return (
    <div className={dots}>
      {[0, 0.2, 0.4].map((time, indx) => (
        <div
          className={dot}
          key={'dot-' + indx}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${time}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

LoadingDots.propTypes = {
  dimensions: PropTypes.number,
}

export default LoadingDots
