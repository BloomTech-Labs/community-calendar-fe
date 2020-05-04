import React from 'react'
// Testing libraries
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

// Modules used in components
import {MemoryRouter} from 'react-router-dom'
import moment from 'moment'

// Components to test
import FeaturedCard from '../featured/FeaturedCard'

//mock TEST_FULL
import {TEST_FULL} from '../../../test-utils/mock_data/test_event'

describe('Tests for FeaturedCards', () => {
  beforeEach(() => {
    // reset mock functions before each test
    jest.clearAllMocks()
  })

  test('should match snapshot', () => {
    jest.mock('moment', () => () => ({format: () => 'test'}))

    const tree = render(
      <MemoryRouter>
        <FeaturedCard item={TEST_FULL} />
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('Should display correct TEST_FULL', () => {
    jest.mock('moment', () => () => ({format: () => 'test'}))
    const {getByText} = render(
      <MemoryRouter>
        <FeaturedCard item={TEST_FULL} />
      </MemoryRouter>,
    )

    expect(getByText(TEST_FULL.title)).toBeInTheDocument()
    expect(getByText(/600 woodward avenue, detroit/i)).toBeInTheDocument()
  })
})
