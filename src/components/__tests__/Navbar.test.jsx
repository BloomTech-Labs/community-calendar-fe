import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Navbar from '../Navbar'

describe('Tests for Navbar.jsx', () => {
  test('should render without props', () => {
    const tree = render(<Navbar />)
    expect(tree).toMatchSnapshot()
  })
})
