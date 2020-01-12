import {renderHook, act} from '@testing-library/react-hooks'
import getGeoPosition from '../getPosition'
// create mock of navigator.geolocation
const getCurrentPosition = jest.fn()

// create assing mock function as method of geolocation
Object.assign(window.navigator.geolocation, {
  getCurrentPosition,
})

describe('Tests for getPosition', () => {
  beforeEach(() =>
    // reset mock.calls and mock.instances
    jest.clearAllMocks(),
  )

  test('Should return empty object and two functions', () => {
    const {result} = renderHook(() => getGeoPosition())
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)
    expect(typeof result.current.userPosition).toBe('object')
    expect(typeof result.current.setUserPosition).toBe('function')
    expect(typeof result.current.getUserPosition).toBe('function')
  })

  test("Should return user's latitude and longitude when getUserPosition is called", () => {
    const testData = {coords: {latitude: 40, longitude: 80}}

    // initialize the hook
    const {result} = renderHook(() => getGeoPosition())
    //userPosition should be an empty object
    expect(result.current.userPosition.latitude).toBeUndefined()
    // component was mounted  which fired useEffect which fires geolocation.getCurrentPosition
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)

    getCurrentPosition.mockImplementation(() =>
      result.current.setUserPosition(testData),
    )
    // call setUserPosition
    act(() => {
      result.current.getUserPosition(testData)
    })

    // should have called geolocation.getCurrentPosition
    expect(getCurrentPosition).toHaveBeenCalledTimes(2)
    //  userPosition  should now have  coordinates
    expect(result.current.userPosition).toBe(testData)
  })
})
