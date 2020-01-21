import React from 'react'
import PropTypes from 'prop-types'
import {dots, dot} from './Loading.module.scss'

/* 
Loading animation. Displays three dot in a row.

'dotSize' is the diameter of each dot in px.
 */
const LoadingDots = ({dotSize, bgColor = '#21242c'}) => {
  const size = dotSize ? dotSize : 8
  return (
    <div className={dots}>
      {/* create three dots. The first dot begins its animation immediately.
     The other dots start animating after a short delay. 
      */}
      {[0, 0.2, 0.4].map((time, indx) => (
        <div
          className={dot}
          key={'dot-' + indx}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: `${bgColor}`,
            margin: ` 0 ${size / 4}px`,
            animationDelay: `${time}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

LoadingDots.propTypes = {
  dotSize: PropTypes.number,
  bgColor: PropTypes.string,
}

export default LoadingDots
