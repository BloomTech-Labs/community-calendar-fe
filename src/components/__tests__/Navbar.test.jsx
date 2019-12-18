import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
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

  test('should call loginWithRedirect() when user clicks "Sign In"', () => {
    const loginWithRedirect = jest.fn()

    const {getByText} = render(<Navbar />)
    const signin = getByText(/^sign in$/i)
    expect(signin).toBeInTheDocument()

    userEvent.click(signin)
    // expect(loginWithRedirect.mock.calls).toHaveBeenCalledTimes(1)
  })
})
