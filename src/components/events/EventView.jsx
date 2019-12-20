import React  from "react";
import {useParams} from 'react-router-dom'
//graphql
import {useQuery} from 'react-apollo'
import {GET_EVENT_BY_ID} from '../../graphql/events.query'

//styles
import {
    banner,
    top_div,
    middle_div,
    bottom_div,
    container,
    panel_left,
    panel_right,
    space_around,
    main
} from "../style_modules/EventView.module.scss";

const EventView = props => {

    const queryParams = useParams()
    console.log("query params", queryParams)
    //destructure event information passed through props
    const {data, loading, error} = useQuery(GET_EVENT_BY_ID(queryParams.id))
  if (loading) return <p>LOADING</p>
  if (error) return <p>Error</p>

     const {
        id,
        title,
        description,
        start,
        end,
        creator,
        locations,
        event_images
    } = data.events.length && data.events[0];
 
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
    const startDate = new Date(start);
    const endDate = new Date(end);

    //create string for displaying event time in hours and minutes
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const eventStartTime = startHours > 12 ? `${startHours - 12}:${String(startMinutes).padStart(2, "0")} pm` : `${startHours}:${String(startMinutes).padStart(2, "0")} am`

    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    const eventEndTime = endHours > 12 ? `${endHours - 12}:${String(endMinutes).padStart(2, "0")} pm` : `${endHours}:${String(endMinutes).padStart(2, "0")} am`

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
            <div className={top_div}>
                <div className={panel_left}>
                    <h1>{title}</h1>
                    <p>{`${months[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()} ${weekDays[startDate.getDay()]}`}</p>
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
            <div className={middle_div}>
                <div>
                    <p className="color_chalice">Hosted by:</p>
                    {/* <p className="color_shark">{creator}</p> */}
                </div>
                <div>
                    <p className="color_chalice">Time:</p>
                    <p className="color_shark">{`${eventStartTime} - ${eventEndTime}`}</p>
                </div>
                <div>
                    <p className="color_chalice">Ticket type:</p>
                    <p className="color_shark"></p>
                </div>
                <button>Follow Host</button>
            </div>
            <div className={bottom_div}>
                <div>
                    
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default EventView
