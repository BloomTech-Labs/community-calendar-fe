import React from 'react'

import {
  bgSquare1,
  bgSquare2,
  container,
  section1,
  section2,
  card,
} from './Leadership.module.scss'

const teamMembers = [
  {
    name: 'Skyler Dowdy',
    role: 'Team Lead',
    imagePath: require(`../../assets/images/team-members/skyler.jpg`),
  },
  {
    name: 'Jan Patrick Eliares',
    role: 'UX/UI Designer',
    imagePath: require(`../../assets/images/team-members/jp.png`),
  },
  {
    name: 'Nora Barazanchi',
    role: 'UX/UI Designer',
    imagePath: ``,
  },
  {
    name: 'Louis Gelinas',
    role: 'Engineer',
    imagePath: require(`../../assets/images/team-members/louis.jpg`),
  },
  {
    name: 'Mark King',
    role: 'Engineer',
    imagePath: require(`../../assets/images/team-members/mark.jpg`),
  },
  {
    name: 'Westley Strellis',
    role: 'Engineer',
    imagePath: require(`../../assets/images/team-members/westley.png`),
  },
  {
    name: 'Basil Havens',
    role: 'Mobile Engineer',
    imagePath: require(`../../assets/images/team-members/basil.jpg`),
  },
  {
    name: 'Ben Rogers',
    role: 'Engineer',
    imagePath: require(`../../assets/images/team-members/ben.jpg`),
  },
  {
    name: 'Tyler Berrett',
    role: 'Mobile Engineer',
    imagePath: require(`../../assets/images/team-members/tyler.jpg`),
  },
  {
    name: 'Jordan Christensen',
    role: 'Mobile Engineer',
    imagePath: require(`../../assets/images/team-members/jordan.png`),
  },
  {
    name: 'Justin Gent',
    role: 'Mobile Engineer',
    imagePath: require(`../../assets/images/team-members/justin.jpg`),
  },
  {
    name: 'Lowell Jacobs',
    role: 'Engineer',
    imagePath: require(`../../assets/images/team-members/lowell.jpg`),
  },  
]

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
            {console.log(member)}
            {member.imagePath.length > 0 ? (
              <img src={member.imagePath} />
            ) : (
              <div />
            )}
            <p className='color_black is-bold is-family-secondary'>
              {member.name}
            </p>
            <p className='color_chalice'>{member.role}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Leadership
