import React from 'react'

export default function EventListCard(props) {
  const {item} = props;

  return (
    <div className="columns">
      <div className="column is-narrow">
        <figure className="image is-128x128">
          <p>Image</p>
        </figure>
      </div>
      <div className="column">
        <p className="is-size-7 is-capitalized">{item.locations && item.locations.neighborhood || "North End"}</p>
        <p className="is-size-5 has-text-weight-bold">{item.title}</p>
        <p className="is-size-6">6:00 pm - 8:00 pm <span>&#8226;</span> Free</p>
        <br />
        <p className="is-size-7">{item.description}</p>
      </div>
    </div>
  )
}
