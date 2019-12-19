import React from 'react'
import banner from '../../assets/images/bannerevent.png'

const EventView = props => {
    const eventData = props.location.state.item;

    console.log(eventData);
    return (
        <div className='mainContainer'>
            <h1>Event View Works</h1>
            <div className='subContainer'>
                <img src={banner} alt='banner' />
            </div>
        </div>
    );
}

export default EventView
