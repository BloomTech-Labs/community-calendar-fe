// apollo
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_CACHE} from '../graphql'

import useGeo from './useGeo'

/*
  When a component utilizing this function is mounted the user is prompted 
  if the app can use their current location. 

  If the user's location does not match `userLatitude` and `userLongitude`
  stored in the Apollo Client cache, it updates the Apollo Client cache.
*/

export default function GetUserPosition() {
  const client = useApolloClient()
  const {data: cacheData} = useQuery(GET_CACHE)
  const userPosition = useGeo()

  if (
    !cacheData.userLatitude &&
    !cacheData.userLongitude &&
    userPosition.latitude & userPosition.longitude
  ) {
    client.writeData({
      data: {
        userLatitude: userPosition.latitude,
        userLongitude: userPosition.longitude,
        userAddress: userPosition.address,
      },
    })
  }

  return null
}
