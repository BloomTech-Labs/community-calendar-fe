import React from 'react'
import useObjFromQS from '../useObjFromQS'
import '@testing-library/jest-dom/extend-expect'
import {MemoryRouter} from 'react-router-dom'
import {render} from '@testing-library/react'

describe(`Tests for useObjFromQS.js`, () => {
  describe(`filtering using user location /  history`, () => {
    test(`should be able to read a query string and convert it into an objest`, () => {
      // define variable globally so it can be accessed inside the test App component
      var query

      //fake/mock component
      const App = () => {
        query = useObjFromQS()
        return (
          <div>
            <p>Testing useObjFromQS Function</p>
          </div>
        )
      }

      // expected result from test
      const expected = {
        filtersObj: {
          index: 'codeing',
          location: {
            userLatitude: 33.9375,
            userLongitude: -117.2306,
            radius: 10,
          },
          ticketPrice: [
            {
              maxPrice: 40,
              minPrice: 20,
            },
          ],
          dateRange: {
            start: '2020-05-12T07:00:00.000Z',
            end: '2020-05-29T06:59:59.999Z',
          },
          tags: undefined,
        },
        filterAddress: 'Moreno Valley, California, US',
      }

      //function should read query string in the URI
      const tree = render(
        <MemoryRouter
          initialEntries={[
            {
              hash: '',
              key: 'dkyo6o',
              pathname: '/',
              search:
                '?index=codeing&filterAddress=Moreno%20Valley%2C%20California%2C%20US&userLatitude=33.9375&userLongitude=-117.2306&radius=10&start=2020-05-12T07%3A00%3A00.000Z&end=2020-05-29T06%3A59%3A59.999Z&minPrice-0=20&maxPrice-0=40',
              state: undefined,
            },
          ]}
        >
          <App />
        </MemoryRouter>,
      )

      // expect our query function to equal a decoded query string
      expect(query).toEqual(expected)
    })
  })
})
