import React, {useState} from 'react'
import loadable from '@loadable/component'
import LoadingLogo from '../components/loading/LoadingLogo'

import {banner, container, buttonContainer} from './styles/AboutUs.module.scss'

const ourMission = 1
const leadership = 2

const FallbackLoader = () => (
  <div
    className='container level is-flex'
    style={{height: '100vh', width: '100vw'}}
  >
    <LoadingLogo />
  </div>
)

const OurMission = loadable(
  () =>
    import(
      /* webpackChunkName: "ourMission" */ '../components/about-us-helpers/OurMission'
    ),
  {
    fallback: <FallbackLoader />,
  },
)

const Leadership = loadable(
  () =>
    import(
      /* webpackChunkName: "leadership" */ '../components/about-us-helpers/Leadership'
    ),
  {fallback: <FallbackLoader />},
)

const AboutUs = () => {
  //if selectedPage = ourMission display our mission component
  //if selectedPage = leadership display leadership component
  const [selectedPage, setSelectedPage] = useState(ourMission)

  return (
    <div className={container}>
      <div className={banner}>
        <h1>More than just events</h1>
      </div>
      <div className={buttonContainer}>
        {/* buttons for selecting which "page" to display */}
        <div
          style={{
            borderBottom:
              selectedPage === ourMission ? '1px solid red' : 'none',
          }}
          onClick={() => setSelectedPage(ourMission)}
        >
          <span>OUR MISSION</span>
        </div>
        <div
          style={{
            borderBottom:
              selectedPage === leadership ? '1px solid red' : 'none',
          }}
          onClick={() => setSelectedPage(leadership)}
        >
          <span>LEADERSHIP</span>
        </div>
      </div>
      {selectedPage === ourMission ? <OurMission /> : <Leadership />}
    </div>
  )
}

export default AboutUs
