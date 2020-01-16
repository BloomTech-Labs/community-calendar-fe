import React from 'react'
import PropTypes from 'prop-types'
import {darkFill} from './Icons.module.scss'

const ArrowIcon = ({pointLeft, dimensions, dataId}) => {
  return (
    <svg
      data-id={dataId}
      width={dimensions ? dimensions : 14}
      height={dimensions ? dimensions : 14}
      viewBox='0 0 14 14'
      className={`${darkFill} ${pointLeft ? 'flip' : ''}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13.5766 5.99628L1.05121 0.0704924C0.925082 0.0108274 0.784707 -0.0116442 0.646385 0.00568717C0.508064 0.0230186 0.37747 0.0794419 0.269769 0.168405C0.162068 0.257368 0.0816785 0.375221 0.037936 0.508278C-0.00580646 0.641335 -0.0111076 0.784138 0.0226485 0.920103L0.915639 4.51187L6.63166 6.66664L0.915639 8.8214L0.0226485 12.4132C-0.0117427 12.5492 -0.00688402 12.6923 0.0366561 12.8257C0.0801963 12.9591 0.160618 13.0773 0.268513 13.1664C0.376408 13.2555 0.507316 13.3119 0.645924 13.329C0.784531 13.3461 0.925107 13.3231 1.05121 13.2628L13.5766 7.33699C13.7032 7.27717 13.8103 7.18237 13.8852 7.06366C13.9602 6.94496 14 6.80725 14 6.66664C14 6.52602 13.9602 6.38832 13.8852 6.26961C13.8103 6.1509 13.7032 6.0561 13.5766 5.99628Z' />
    </svg>
  )
}

ArrowIcon.propTypes = {
  pointLeft: PropTypes.bool,
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default ArrowIcon
