import React from 'react'
import banner from '../../assets/images/bannerevent.png'
const EventView = props => {
    console.log(props)
    return (
        <div className='mainContainer'>
            <h1>Event View Works</h1>
            <div className='subContainer'>
                <img src={banner} alt='banner' />
            </div>

        </div>
    )
}

export default EventView
