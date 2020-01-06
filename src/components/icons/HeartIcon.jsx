import React from 'react'
import PropTypes from 'prop-types'
import {heart, liked} from './Icons.module.scss'

const HeartIcon = ({isLiked, width, height, dataId}) => {
  return (
    <svg
      data-id={dataId}
      width={width ? width : 19}
      height={height ? height : 17}
      viewBox='0 0 19 17'
      className={`${heart} ${isLiked ? liked : ''}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.29928 2.8843L9.71861 3.53202L10.1385 2.88466C11.6303 0.584595 13.7078 0.133692 15.3877 0.77901C17.0993 1.43651 18.5 3.26982 18.5 5.76058C18.5 6.62038 18.0425 7.67417 17.2506 8.83147C16.469 9.97383 15.4093 11.1491 14.31 12.2383C13.2129 13.3253 12.0885 14.3146 11.1847 15.0863C10.8601 15.3635 10.5655 15.6111 10.3101 15.826C10.2094 15.9106 10.1149 15.9902 10.0269 16.0644C9.91405 16.1596 9.80919 16.2485 9.71578 16.329C9.61709 16.2464 9.50606 16.1556 9.3869 16.0586C9.25968 15.9552 9.12042 15.8427 8.96965 15.7209C8.73358 15.5301 8.4693 15.3166 8.17885 15.0793C7.23374 14.3071 6.05445 13.3174 4.90234 12.2299C3.7479 11.1401 2.63384 9.96442 1.81183 8.82183C0.978006 7.6628 0.5 6.61263 0.5 5.76058C0.5 3.26866 1.99286 1.42774 3.82391 0.767222C5.63163 0.115123 7.81776 0.595876 9.29928 2.8843Z' />
    </svg>
  )
}

HeartIcon.propTypes = {
  isLiked: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  dataId: PropTypes.string,
}

export default HeartIcon
