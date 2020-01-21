import React from 'react'
import PropTypes from 'prop-types'
import {dropdown, darkFill, lightFill} from './Icons.module.scss'

const DropdownIcon = ({isLight, dimensions, dataId}) => {
  return (
    <svg
      data-id={dataId}
      width={dimensions ? dimensions : 13}
      height={dimensions ? dimensions : 7}
      viewBox='0 0 13 7'
      className={`dropdown ${isLight ? lightFill : darkFill}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{pointerEvents: 'none'}}
    >
      <path d='M1.71875 0L6.5 3.8472L11.2812 0L12.75 1.1844L6.5 6.2244L0.25 1.1844L1.71875 0Z' />
    </svg>
  )
}

DropdownIcon.propTypes = {
  isLight: PropTypes.bool,
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default DropdownIcon
