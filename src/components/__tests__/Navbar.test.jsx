import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

// Specific to current test
import Navbar from '../navbar/Navbar'
import {MemoryRouter} from 'react-router-dom'
// import module containing useAuth0 so it can be mocked
import {useAuth0} from '../../contexts/auth0-context.jsx'

// fake user data
const user = {
  name: 'testuser@test.com',
  nickname: 'Ernie',
  email: 'testuser@test.com',
  picture: '',
}

//mock useAuth0
jest.mock('../../contexts/auth0-context.jsx')

describe('Tests for Navbar.jsx', () => {
  beforeEach(() => {
    // reset mock functions before each test
    jest.clearAllMocks()
  })

  test('should match the snapshot', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    })

    const tree = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('has a search bar that says "search"', () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      isLoading: false,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    })

    const {getByPlaceholderText} = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  test('should call loginWithRedirect() when user clicks "Sign In"', () => {
    /* create mock function outside of useAuth0 mock
    so assertions can be run on it
    */
    const loginWithRedirect = jest.fn()
    //  mock the return values of useAuth0
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      loginWithRedirect,
      logout: jest.fn(),
    })

    const {getByText} = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const signin = getByText(/^sign in$/i)
    expect(signin).toBeInTheDocument()

    userEvent.click(signin)
    expect(loginWithRedirect).toHaveBeenCalledTimes(1)
  })
})
