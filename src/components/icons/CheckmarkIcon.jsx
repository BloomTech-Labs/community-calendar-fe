import React from 'react'
import PropTypes from 'prop-types'

const CheckmarkIcon = ({dimensions, dataId}) => {
  return (
    <svg
      width={dimensions ? dimensions : 16}
      height={dimensions ? dimensions : 16}
      data-id={dataId}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM11.4554 5.3875L7.69464 10.6018C7.64208 10.6751 7.57279 10.7349 7.49251 10.7762C7.41224 10.8174 7.32329 10.8389 7.23304 10.8389C7.14279 10.8389 7.05384 10.8174 6.97356 10.7762C6.89328 10.7349 6.82399 10.6751 6.77143 10.6018L4.54464 7.51607C4.47679 7.42143 4.54464 7.28929 4.66071 7.28929H5.49821C5.68036 7.28929 5.85357 7.37679 5.96071 7.52679L7.23214 9.29107L10.0393 5.39821C10.1464 5.25 10.3179 5.16071 10.5018 5.16071H11.3393C11.4554 5.16071 11.5232 5.29286 11.4554 5.3875Z'
        fill='#82FFA5'
      />
    </svg>
  )
}

CheckmarkIcon.propTypes = {
  dimensions: PropTypes.number,
  dataId: PropTypes.string,
}

export default CheckmarkIcon
