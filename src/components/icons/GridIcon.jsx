import React from 'react'
import PropTypes from 'prop-types'
import {grid, active} from './Icons.module.scss'

/* Used to select grid view */
const GridIcon = ({dimensions, dataId, isActive}) => {
  return (
    <svg
      className={` ${isActive ? active : ''} ${grid}`}
      data-id={dataId}
      width={dimensions ? dimensions : 24}
      height={dimensions ? dimensions : 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0H6V6H0V0ZM9 0H15V6H9V0ZM18 0H24V6H18V0ZM0 9H6V15H0V9ZM9 9H15V15H9V9ZM18 9H24V15H18V9ZM0 18H6V24H0V18ZM9 18H15V24H9V18ZM18 18H24V24H18V18Z' />
    </svg>
  )
}

GridIcon.propTypes = {
  isActive: PropTypes.bool,
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default GridIcon
