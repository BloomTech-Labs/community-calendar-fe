import React from 'react'
import {Link} from 'react-router-dom'
import {BackIcon} from '../icons'

const GoBack = ({to = '/', color, isSearchPage}) => {
  let background = 'rgba(255, 255, 255, 0.75)'
  let textColor = 'black'
  let arrowColor = '#000000'

  if (color === 'white') {
    background = 'none'
    textColor = 'white'
    arrowColor = '#ffffff'
  }

  return (
    <Link
      to={to}
      style={{
        position: 'absolute',
        background: background,
        color: textColor,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: '3px 3px 3px 8px',
        top: isSearchPage ? '80px' : '72px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BackIcon color={arrowColor} />
      </div>
      <div className='is-size-6'>&nbsp;Go back home</div>
    </Link>
  )
}

export default GoBack
