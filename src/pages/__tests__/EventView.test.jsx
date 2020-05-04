import React, {useRef} from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

// Modules under test
import EventView from '../EventView'
import {MemoryRouter} from 'react-router-dom'

// modules to mock
import {GET_EVENT_BY_ID} from '../../graphql/events.query'

//mock data
import { TEST_FULL } from '../../../test-utils/mock_data/test_event'

//Apollo mock
const mocks = [
  {
    request: {
      query: GET_EVENT_BY_ID,
      variables: {
        id: TEST_FULL.id,
      },
    },
    result: {
      data: {
        events: [{...TEST_FULL}],
      },
    },
  },
]

describe.skip('Tests for EventView', () => {
  test('Should match the snapshot', () => {
    // mock useParams
    const useParams = jest.fn(() => TEST_FULL.id)

    const tree = render(
      <MemoryRouter>
        <MockedProvider addTypename={false} mocks={mocks}>
          <EventView />
        </MockedProvider>
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })
})
