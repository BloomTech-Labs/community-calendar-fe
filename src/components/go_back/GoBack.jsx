import React from 'react'
import {Link} from 'react-router-dom'
import {BackIcon} from '../icons'

const GoBack = () => {
  return (
    <Link to="/"
      style={{
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.75)',
        color: 'black',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: '3px'
      }}>
      <div
      
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <BackIcon />
      </div>
      <div className="is-size-6">
        &nbsp;Go back home
      </div>
    </Link>
  )
}

export default GoBack
