import createQSObj from '../createQSObj'

// Example Data
const text = `coding`
const address = `Moreno Valley, California, US`
const location = {userLatitude: 33.9375, userLongitude: -117.2306, radius: 10}
const ticketPrice = [{minPrice: 10, maxPrice: 20}]
const tags = [{tag0: `React`, tag1: `Testing`}]
const dateRange = {
  start: '2020-05-20T07:00:00.000Z',
  end: '2020-05-29T06:59:59.999Z',
}

describe(`Tests for createQSObj`, () => {
  test(`should flatten search, filters, and address into one object in order to build query string`, () => {
    //Passing example data into function
    const flatten = createQSObj(
      text,
      {ticketPrice, location, tags, dateRange},
      address,
    )

    // expect result to be flattened
    expect(flatten).toEqual(
      expect.objectContaining({
        index: expect.any(String),
        filterAddress: expect.any(String),
        userLatitude: expect.any(Number),
        userLongitude: expect.any(Number),
        radius: expect.any(Number),
        'minPrice-0': expect.any(Number),
        'maxPrice-0': expect.any(Number),
        start: expect.any(String),
        end: expect.any(String),
        tag0: expect.objectContaining({
          tag0: expect.any(String),
          tag1: expect.any(String),
        }),
      }),
    )
  })
})
