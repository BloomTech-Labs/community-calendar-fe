import createQSObj from '../createQSObj'

const text = `coding`
const address = `Moreno Valley, California, US`
const location = {userLatitude: 33.9375, userLongitude: -117.2306, radius: 10}
const ticketPrice = [{minPrice: 10, maxPrice: 20}]

describe(`Tests for createQSObj`, () => {
  test(`should flatten search, filters, and address into one object in order to build query string`, () => {
    const flatten = createQSObj(text, {ticketPrice, location}, address)

    expect(flatten).toEqual(
      expect.objectContaining({
        index: expect.any(String),
        filterAddress: expect.any(String),
        userLatitude: expect.any(Number),
        userLongitude: expect.any(Number),
        radius: expect.any(Number),
        'minPrice-0': expect.any(Number),
        'maxPrice-0': expect.any(Number),
      }),
    )
  })
})
