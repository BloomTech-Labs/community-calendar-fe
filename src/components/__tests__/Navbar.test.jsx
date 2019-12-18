import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Navbar from '../Navbar'

describe('Tests for Navbar.jsx', () => {
  test.skip('should match the snapshot', () => {
    const tree = render(<Navbar />)
    expect(tree).toMatchSnapshot()
  })

  test('has a search bar that says "search"', () => {
    const {getByPlaceholderText} = render(<Navbar />)
    expect(getByPlaceholderText(/search/i)).toBeInTheDocument()
  })
})
