import React from 'react'
import {iconDivider} from './styles/EventList.module.scss'
import {GridIcon, ListIcon} from '../icons'

const ViewToggle = ({toggleFunc, viewState}) => (
  <div className={` is-flex level `}>
    <div className='is-flex is-clickable' onClick={() => toggleFunc(true)}>
      <ListIcon isActive={viewState} />
    </div>
    <span className={iconDivider}></span>
    <div className='is-flex is-clickable' onClick={() => toggleFunc(false)}>
      <GridIcon isActive={!viewState} />
    </div>
  </div>
)

export default ViewToggle
