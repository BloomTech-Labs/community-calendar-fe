import React from 'react'
import {teamMembers} from '../../utils/teamMembers.js'
import {
  bgSquare1,
  bgSquare2,
  container,
  section1,
  section2,
  card,
} from './Leadership.module.scss'

const Leadership = () => {
  return (
    <div id={container}>
      <section id={section1}>
        <h2 className='is-bold is-size-3 is-family-secondary'>
          OUR
          <br />
          LEADERSHIP
        </h2>
        <p>
          Our strength stems from individuality of the team that collides with
          great communication and deliverence.
        </p>
      </section>
      <section id={section2}>
        <div id={bgSquare1} />
        <div id={bgSquare2} />

        <h3>OUR TEAM</h3>

        {teamMembers.map((member) => (
          <div className={card}>
            {member.imagePath.length > 0 ? (
              <img src={member.imagePath} />
            ) : (
              <div />
            )}
            <p
              className='color_black is-bold is-family-secondary'
              data-testid='name'
            >
              {member.name}
            </p>
            <p className='color_chalice' data-testid='role'>
              {member.role}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Leadership
