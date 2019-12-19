import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import * as moment from 'moment'
/*
jest.mock('moment', () => {
  const mMoment = {
    format: jest.fn().mockReturnThis(),
    valueOf: jest.fn()
  };
  return jest.fn(() => mMoment);
});
 */
import EventListCard from '../events/EventListCard'

const data = {
  locations: [
    {
      city: 'Detroit',
      zipcode: 48202,
      name: 'Metropolitain United Methodist Church',
      state: 'MI',
      id: 'ck4bul5cd001r0714i4wig2v5',
      street_address_2: null,
      street_address: '8000 Woodward Ave',
    },
  ],
  description:
    'Join Council President Pro Tem Sheffield and the City Assessor for an in depth discussion on Neighborhood Enterprise Zones and what they mean to you!',
  creator: {
    id: 'ck4bul4dp000u0714c8402ym7',
  },
  event_images: [
    {
      url: 'https://detroitmi.gov/themes/custom/detroitmi/logo.png',
    },
  ],
  id: 'ck4bul5bi001o0714armcsssy',
  end: '2019-11-22T01:00:00.000Z',
  title: 'Councilperson Sheffield Town Hall',
  start: '2019-11-21T23:00:00.000Z',
}

describe.skip('Tests for EventListCard', () => {
  test('Should render data from props', () => {
    const {getByText, getByTestId} = render(<EventListCard item={data} />)

    expect(getByTestId('event_description')).toHaveTextContent(data.description)
    expect(getByTestId('event_title')).toHaveTextContent(data.title)
  })
})
