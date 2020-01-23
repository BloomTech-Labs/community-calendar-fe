import {useState, useEffect} from 'react'
import fetchGeocode from './fetchGeocode'

/* 
 This function is used to read the user's geolocation coordinates. When a component utilizing this function 
 is mounted the user is prompted if the app can use their current location. 

  */

export default function useGeo(config) {
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
      // get the users's latitude and longitude
      await window.navigator.geolocation.getCurrentPosition(
        async pos => {
          const {latitude, longitude} = pos.coords

          // find the closest address to the user's coordinates
          const mbData = await fetchGeocode({
            lat: latitude,
            long: longitude,
          })

          setUserPosition({
            latitude,
            longitude,
            address: mbData.features[0].place_name.replace(
              /united states$/i,
              'US',
            ),
          })
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
