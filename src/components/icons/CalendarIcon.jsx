import React from 'react'
import PropTypes from 'prop-types'
import {darkFill} from './Icons.module.scss'

const CalendarIcon = ({classes, dimensions, dataId}) => {
  return (
    <svg
      data-id={dataId}
      width={dimensions ? dimensions : 24}
      height={dimensions ? dimensions : 24}
      viewBox='0 0 24 24'
      className={`${darkFill} ${classes ? classes : ''}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M7,12H9V14H7V12M21,6V20A2,2 0 0,1 19,22H5C3.89,22 3,21.1 3,20V6A2,2 0 0,1 5,4H6V2H8V4H16V2H18V4H19A2,2 0 0,1 21,6M5,8H19V6H5V8M19,20V10H5V20H19M15,14V12H17V14H15M11,14V12H13V14H11M7,16H9V18H7V16M15,18V16H17V18H15M11,18V16H13V18H11Z' />
    </svg>
  )
}

CalendarIcon.propTypes = {
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default CalendarIcon
