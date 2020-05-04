/*
Test needs to be upated to mock Okta instead of Auth0
*/
import React, {useRef} from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

// Specific to current test
import Navbar from '../navbar/Navbar'
import navUtils from '../navbar/navbar_utils'
import {MemoryRouter} from 'react-router-dom'

// import module containing useAuth0 so it can be mocked
// import {useAuth0} from '../../contexts/auth0-context.jsx'

//Mocks
// jest.mock('../../contexts/auth0-context.jsx')
jest.mock('../navbar/navbar_utils')

// fake user data
const user = {
  name: 'testuser@test.com',
  nickname: 'Ernie',
  email: 'testuser@test.com',
  picture: '',
}

describe.skip('Tests for Navbar.jsx', () => {
  beforeEach(() => {
    // reset mock functions before each test
    jest.clearAllMocks()
  })

  // create mock of navigator.geolocation
  const getCurrentPosition = jest.fn()

  // create assing mock function as method of geolocation
  Object.assign(window.navigator.geolocation, {
    getCurrentPosition,
  })

  test.skip('should match the snapshot', () => {
    // useAuth0.mockReturnValue({
    //   isAuthenticated: true,
    //   isLoading: false,
    //   user,
    //   loginWithRedirect: jest.fn(),
    //   logout: jest.fn(),
    // })

    const tree = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })

  test.skip('has a search bar that says "search"', () => {
    // useAuth0.mockReturnValue({
    //   isAuthenticated: true,
    //   user,
    //   isLoading: false,
    //   loginWithRedirect: jest.fn(),
    //   logout: jest.fn(),
    // })

    const {getByPlaceholderText} = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    expect(getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  test('should call handleLogin() when user clicks "Sign In"', () => {
    // mock useRef
    const classList = {
      toggle: jest.fn(),
      remove: jest.fn(),
    }

    jest.spyOn(React, 'useRef').mockImplementation({current: classList})

    /* create mock function outside of useAuth0 mock
    so assertions can be run on it
    */
    const loginWithRedirect = jest.fn(() => true)
    // mock the return values of useAuth0
    // useAuth0.mockReturnValue({
    //   isAuthenticated: false, // simulate no user
    //   isLoading: false,
    //   user: null,
    //   loginWithRedirect,
    //   logout: jest.fn(),
    // })

    jest
      .spyOn(navUtils, 'handleLogin')
      .mockImplementation(() => loginWithRedirect())

    const {getByText} = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const signin = getByText(/^sign in$/i)
    expect(signin).toBeInTheDocument()

    userEvent.click(signin)
    expect(navUtils.handleLogin).toHaveBeenCalledTimes(1)
    expect(loginWithRedirect).toHaveBeenCalledTimes(1)
  }) //end test block

  test('should call handleLogout() when user clicks "Sign Out"', async () => {
    // mock useRef
    const classList = {
      toggle: jest.fn(),
      remove: jest.fn(),
    }

    jest.spyOn(React, 'useRef').mockImplementation({current: classList})

    /* create mock function outside of useAuth0 mock
    so assertions can be run on it
    */
    const logout = jest.fn()
    // mock the return values of useAuth0
    // useAuth0.mockReturnValue({
    //   isAuthenticated: true, // simulate user
    //   isLoading: false,
    //   user, // simulate user
    //   loginWithRedirect: jest.fn(),
    //   logout,
    // })

    jest.spyOn(navUtils, 'handleLogout').mockImplementation(() => logout())

    const {findByText, getByTestId} = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    const dropDownTrigger = getByTestId('nav-dropdown-trigger')
    expect(dropDownTrigger).toBeInTheDocument()
    userEvent.click(dropDownTrigger)

    const logoutBtn = await findByText(/^log out$/i)
    expect(logoutBtn).toBeInTheDocument()

    userEvent.click(logoutBtn)
    expect(navUtils.handleLogout).toHaveBeenCalledTimes(1)
    expect(logout).toHaveBeenCalledTimes(1)
  }) //end test block
}) // end describe block
