import React from 'react'
import {Link} from 'react-router-dom'
import {BackIcon} from '../icons'

const GoBack = () => {
  return (
    <Link to="/">
    <div
      style={{
        position: 'absolute',
        background: 'none',
        color: 'black',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: '5px'
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
    </div>
    </Link>
  )
}

export default GoBack
