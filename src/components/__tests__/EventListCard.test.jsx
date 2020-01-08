import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import EventListCard from '../events/EventListCard'
import {MemoryRouter} from 'react-router-dom'
import moment from 'moment'

//mock data
import testEvent from 'mock_data/test_event'

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
  test('Should match the snapshot', () => {
    const tree = render(
      <MemoryRouter>
        <EventListCard item={testEvent} />
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('Should render data from props', () => {
    const {getByText, getByTestId} = render(
      <MemoryRouter>
        <EventListCard item={testEvent} />
      </MemoryRouter>,
    )

    expect(getByTestId('event_description')).toHaveTextContent(
      testEvent.description,
    )
    expect(getByTestId('event_title')).toHaveTextContent(testEvent.title)
  })
})
