export default {
  index: 'test testy mc testness',
  location: {
    userLatitude: 23.999,
    userLongitude: 24.999,
    radius: 20,
    __typename: 'LocationFilters',
  },
  tags: ['apple', 'dogs', 'cool', 'beef stew'],
  ticketPrice: [
    {
      maxPrice: 10,
      minPrice: 0,
      __typename: 'PriceFilters',
    },
    {
      maxPrice: 30,
      minPrice: 20,
      __typename: 'PriceFilters',
    },
  ],
  dateRange: {
    start: '2020-01-22T17:00:00.000Z',
    end: '2020-01-24T17:00:00.000Z',
    __typename: 'DateFilters',
  },
  __typename: 'SearchFilters',
}
