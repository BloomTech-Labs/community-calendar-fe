import {useState, useEffect} from 'react'

/* 
 This function is used to read the user's geolocation coordinates. When a component utilizing this function 
 is mounted the user is prompted if the app can use their current location. 

  */

export default function getGeoPosition(config) {
  const [userPosition, setUserPosition] = useState({})

  // default options for geolocation.getCurrentPosition
  const defaultConfig = {
    enableHighAccuracy: true,
    // execute error function if getCurrentPosition does not resolve within 5 seconds
    timeout: 5000,
    //maximum time to cache results
    maximumAge: 0,
  }

  const useConfig = config ? {...defaultConfig, ...config} : defaultConfig

  // function called if user does not allow access or an error occurs
  const onError = err => {
    console.warn(`getGeoPosition ERROR ${err.code}: ${err.message}`)
  }

  //get location
  const getUserPosition = async () => {
    if (typeof window !== undefined) {
      await window.navigator.geolocation.getCurrentPosition(
        pos => {
          const {latitude, longitude} = pos.coords

          setUserPosition({latitude, longitude})
        },
        onError,
        useConfig,
      )
    }
  }

  // get user's location when the component is mounted
  useEffect(() => {
    getUserPosition()
  }, [])

  return userPosition
}
