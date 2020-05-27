import React from 'react'

import {
  section1,
  section2,
  section3,
  section4,
  div1,
  div2,
  div3,
} from './OurMission.module.scss'

const OurMission = () => {
  return (
    <>
      <section id={section1}>
        <div>
          <h2 className='is-bold is-size-3 is-family-secondary'>
            OUR
            <br />
            MISSION
          </h2>
        </div>
        <div>
          <p data-testid='mission-statement'>
            Our platform should make discovering a local event on any given day
            as easy and as rewarding as finding something new to watch on
            Netflix. A local event app serving municipalities and neighborhoods.
            See the events happening in your local area in an intuitive way.
          </p>
        </div>
      </section>

      <section id={section2}>
        <div>
          <div />
        </div>
      </section>

      <section id={section3}>
        <div className={div1} />
        <div className={div2}>
          <h3
            className='is-family-secondary is-size-3'
            data-testid='target-audience'
          >
            Target Audience
          </h3>
          <p>
            We are targeting real people in communities
            <br />
            who find it hard to find local events.
          </p>
        </div>
        <div className={div3} />
      </section>

      <section id={section4}>
        <div className={div1}>
          <h3 className='is-family-secondary is-size-3' data-testid='our-focus'>
            Our Focus
          </h3>
          <p>
            To make easier to find local events in their community and
            respective location.
            <br />
            We aim to solve that by creating a design
            <br />
            that is elegant and intuitive.
          </p>
        </div>
        <div className={div2} />
      </section>
    </>
  )
}

export default OurMission
