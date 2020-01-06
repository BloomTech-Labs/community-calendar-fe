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

describe('Tests for FeaturedCards', () => {
  beforeEach(() => {
    // reset mock functions before each test
    jest.clearAllMocks()
  })

  test('should match snapshot', () => {
    jest.mock('moment', () => () => ({format: () => 'test'}))

    const tree = render(
      <MemoryRouter>
        <FeaturedCard item={data} />
      </MemoryRouter>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('Should display correct data', () => {
    jest.mock('moment', () => () => ({format: () => 'test'}))
    const {getByText} = render(
      <MemoryRouter>
        <FeaturedCard item={data} />
      </MemoryRouter>,
    )

    expect(getByText(data.title)).toBeInTheDocument()
    expect(getByText(/8000 woodward ave, detroit/i)).toBeInTheDocument()
  })
})
