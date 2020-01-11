import {renderHook, act} from '@testing-library/react-hooks'
import getGeoPosition from '../getPosition'

const getCurrentPosition = jest.fn()
//create fake window object
window.navigator.geolocation = {}

// create fake geolocation object
Object.assign(window.navigator.geolocation, {
  getCurrentPosition,
})

describe('Tests for getPosition', () => {
  beforeEach(() =>
    // reset mock.calls and mock.instances
    jest.clearAllMocks(),
  )

  test('Should return empty object and a function', () => {
    const {result} = renderHook(() => getGeoPosition())
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)
    expect(typeof result.current.userPosition).toBe('object')
    expect(typeof result.current.getUserPosition).toBe('function')
  })

  test("Should return user's latitude and longitude when getUserPosition is called", () => {
    /*
   This test is a WIP. 
   Need to learn how to
    
    */

    const testData = {coords: {latitude: 40, longitude: 80}}

    const {result} = renderHook(() => getGeoPosition())
    //userPosition should be an empty object
    expect(result.current.userPosition.latitude).toBeUndefined()

    expect(getCurrentPosition).toHaveBeenCalledTimes(1)
    // call getUserPosition
    act(() => {
      result.current.getUserPosition()
    })

    // getCurrentPosition should have been called
    expect(getCurrentPosition).toHaveBeenCalledTimes(2)
    //  userPosition  should now have  coordinates
    // expect(result.current.userPosition).toBe(testData)
  })
})
