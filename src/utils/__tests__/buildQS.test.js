import buildQS from '../buildQS'

const singleParam = {foo: '34'}
const multipleParam = {foo: '34', bar: 'whale'}
const paramWithCharacters = {foo: 'beep boop', bar: 'is?it#'}

describe('Tests for buildQS', () => {
  test('Should  convert an object to a string', () => {
    const expected = '?foo=34'
    const actual = buildQS(singleParam)
    expect(actual).toMatch(expected)
  })

  test('Should  place an ampersand between values', () => {
    const expected = '?foo=34&bar=whale'
    const actual = buildQS(multipleParam)
    expect(actual).toMatch(expected)
  })

  test('Should  replace special characters with char codes', () => {
    const expected = '?foo=beep%20boop&bar=is%3Fit%23'
    const actual = buildQS(paramWithCharacters)
    expect(actual).toMatch(expected)
  })

  test('Should return empty string if no arguments are included', () => {
    const expected = ''
    const actual = buildQS()
    expect(actual).toMatch(expected)
  })

  test('Should return empty string if argument is an empty object', () => {
    const expected = ''
    const actual = buildQS({})
    expect(actual).toMatch(expected)
  })
})
