import React from 'react'
import Leadership from '../about-us-helpers/Leadership.jsx'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Tests for Leadership.jsx', () => {
  describe(`Snapshot`, () => {
    test('should match snapshot', () => {
      const tree = render(<Leadership />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('test if component renders our properly', () => {
    test('should display our team with name and role correctly', () => {
      const {getAllByTestId} = render(<Leadership />)
      const teamMemberNames = getAllByTestId('name')
      const teamMemberRole = getAllByTestId('role')

      expect((teamMemberNames, teamMemberRole)).toBeInTheDocument
    })
  })
})
