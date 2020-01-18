import React from 'react'
import PropTypes from 'prop-types'
import {darkFill} from './Icons.module.scss'

const MapMarkerCircle = ({dimensions, dataId}) => {
  return (
    <svg
      className={darkFill}
      data-id={dataId}
      width={dimensions ? dimensions : 24}
      height={dimensions ? dimensions : 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,12.5C11.17,12.5 10.5,11.83 10.5,11C10.5,10.17 11.17,9.5 12,9.5C12.83,9.5 13.5,10.17 13.5,11C13.5,11.83 12.83,12.5 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5C12,17.5 15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z' />
    </svg>
  )
}

MapMarkerCircle.propTypes = {
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default MapMarkerCircle
