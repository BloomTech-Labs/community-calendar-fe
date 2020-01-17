import buildQueryParams from '../buildQueryParams'

const singleParam = {foo: '34'}
const multipleParam = {foo: '34', bar: 'whale'}
const paramWithCharacters = {foo: 'beep boop', bar: 'is?it#'}

describe('Tests for buildQueryParams', () => {
  test('Should  convert an object to a string', () => {
    const expected = '?foo=34'
    const actual = buildQueryParams(singleParam)
    expect(actual).toMatch(expected)
  })
})
