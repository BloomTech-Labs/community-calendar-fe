import React from "react";

//styles
import {
    banner,
    header,
    container,
    panel_left,
    panel_right,
    main
} from "../style_modules/EventView.module.scss";

const EventView = props => {

    //destructure event information passed through props
    const {
        id,
        title,
        description,
        start,
        end,
        creator,
        locations,
        event_images
    } = props.location.state.item;

    console.log(locations);

    //destructure first item in locations array (why is it an array?)
    const {
        name,
        street_address,
        street_address_2,
        city,
        zipcode,
        state
    } = locations[0];

    //convert start date to Date object
    const start_date = new Date(start);

    //month names for getting the name of the month (date object return index)
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
         "November",
         "December"
    ];

    var weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return (
        <div className={`${container} Butler`}>
            <img className={banner} src={event_images[0].url} alt="banner" />
            <div className={header}>
                <div className={panel_left}>
                    <h1>{title}</h1>
                    <p>{`${months[start_date.getMonth()]} ${start_date.getDate()}, ${start_date.getFullYear()} ${weekDays[start_date.getDay()]}`}</p>
                    <p>{`${street_address}, ${name}`}</p>
                </div>
                <div className={panel_right}>
                    {/* numbers to be replaced with event information */}
                    <p>
                        Going:
                        <br/>
                        50
                    </p>
                    <p>
                        Interested:
                        <br/>
                        100
                    </p>
                </div>
            </div>
            <div className={main}>
                <div>
                    
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default EventView
