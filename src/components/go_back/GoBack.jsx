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
        alignItems: 'center',
        padding: '5px'
      }}>
      <BackIcon />
      <div className="is-size-6">&nbsp;Go back home</div>
    </div>
    </Link>
  )
}

export default GoBack
