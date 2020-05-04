import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import EventListCard from '../events/EventListCard'
import {MemoryRouter} from 'react-router-dom'
import moment from 'moment'

//mock data
import {
  TEST_FULL,
  TEST_NO_NEIGHBORHOOD,
  TEST_NO_DISTANCE,
} from '../../../test-utils/mock_data/test_event'

jest.mock('moment', () => {
  const moment = require.requireActual('moment')
  // moment is both an object and function so create an actual instance of it
  const momentInstance = moment()

  // spy on methods of moment and modify them
  jest.spyOn(momentInstance, 'format').mockImplementation(() => '')

  // create a fake instance of moment
  function fakeMoment() {
    return momentInstance
  }

  // apply properties of moment to fakeMoment
  Object.assign(fakeMoment, moment)
  return fakeMoment
})

describe('Tests for EventListCard', () => {
  test('TEST_FULL render should match the snapshot', () => {
    const tree = render(
      <MemoryRouter>
        <EventListCard item={TEST_FULL} />
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('Should render TEST_FULL data from props', () => {
    const {getByText, getByTestId} = render(
      <MemoryRouter>
        <EventListCard item={TEST_FULL} />
      </MemoryRouter>,
    )

    expect(getByTestId('event_description')).toHaveTextContent(
      TEST_FULL.description,
    )
    expect(getByTestId('event_title')).toHaveTextContent(TEST_FULL.title)

    // only neighborhood, not city, displays if neighborhood provided
    expect(getByTestId('event_location')).toHaveTextContent(
      TEST_FULL.locations[0].neighborhood,
    )
    expect(getByTestId('event_location')).not.toHaveTextContent(
      TEST_FULL.locations[0].city,
    )

    // distance from user displays when provided
    expect(getByTestId('event_location')).toHaveTextContent(
      TEST_FULL.locations[0].distanceFromUser.toFixed(1),
    )
    expect(getByTestId('event_location')).toHaveTextContent(/mi away/i)
  })

  test('Should render TEST_NO_NEIGHBORHOOD data from props', () => {
    const {getByTestId} = render(
      <MemoryRouter>
        <EventListCard item={TEST_NO_NEIGHBORHOOD} />
      </MemoryRouter>,
    )

    // only city displays if no neighborhood provided
    expect(getByTestId('event_location')).not.toHaveTextContent(
      TEST_NO_NEIGHBORHOOD.locations[0].neighborhood,
    )
    expect(getByTestId('event_location')).toHaveTextContent(
      TEST_NO_NEIGHBORHOOD.locations[0].city,
    )
  })

  test('Should render TEST_NO_DISTANCE data from props', () => {
    const {getByTestId} = render(
      <MemoryRouter>
        <EventListCard item={TEST_NO_DISTANCE} />
      </MemoryRouter>,
    )

    // distance from user does not display when not provided
    expect(getByTestId('event_location')).not.toHaveTextContent(/mi away/i)
  })
})
