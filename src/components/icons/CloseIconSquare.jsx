import React from 'react'
import PropTypes from 'prop-types'
import {darkFill, lightFill} from './Icons.module.scss'

const CloseIconSquare = ({isLight, dimensions, dataId, ignorePointer}) => {
  return (
    <svg
      data-id={dataId}
      width={dimensions ? dimensions : 24}
      height={dimensions ? dimensions : 24}
      viewBox='0 0 24 24'
      className={`dropdown ${isLight ? lightFill : darkFill} ${
        ignorePointer ? 'no-pointer-events' : ''
      }`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z' />
    </svg>
  )
}

CloseIconSquare.propTypes = {
  isLight: PropTypes.bool,
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default CloseIconSquare
