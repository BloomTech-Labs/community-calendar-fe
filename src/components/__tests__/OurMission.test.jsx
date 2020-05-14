import React from 'react'
import OurMission from '../about-us-helpers/OurMission.jsx'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Tests for OurMission.jsx', () => {
  describe(`Snapshot`, () => {
    test('should match snapshot', () => {
      const tree = render(<OurMission />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('test if component renders our properly', () => {
    test('should display our focus, mission, and target audience correctly', () => {
      const {getByTestId} = render(<OurMission />)
      const focusSection = getByTestId('our-focus')
      const targetAudienceSection = getByTestId('target-audience')
      const missionStatement = getByTestId('mission-statement')

      expect((focusSection, targetAudienceSection, missionStatement))
        .toBeInTheDocument
    })
  })
})
