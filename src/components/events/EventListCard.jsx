import React from 'react'
import * as moment from 'moment';
import {Link} from "react-router-dom";

export default function EventListCard(props) {
  const {item} = props;

  return (
    <Link to={{pathname: '/events', state: {item}}} >
      <div className="columns">
        <div className="column is-narrow">
          <figure className="image is-128x128">
            <p>Image</p>
          </figure>
        </div>
        <div className="column">
          <p className="is-size-7 is-uppercase has-text-weight-bold">
            {item.locations && item.locations.neighborhood || "North End"}
          </p>
          <p className="is-size-5 has-text-weight-bold">
            {item.title}
          </p>
          <p className="is-size-6">
            {`${moment(item.start).format("h:mm a")} - ${moment(item.end).format("h:mm a")}`} <span>&#8226;</span> Free
          </p>
          <br />
          <p className="is-size-7">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
