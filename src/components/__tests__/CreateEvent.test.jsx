import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateEvent from '../event_forms/CreateEvent.jsx'

describe(`Test for CreateEvent.jsx`, () => {
  describe(`Snapshot test`, () => {
    test('test should match snapshot of component', () => {
      const tree = render(<CreateEvent />)
      expect(tree).toMatchSnapshot()
    })
  })
})
