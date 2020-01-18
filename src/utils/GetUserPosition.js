import { useEffect } from "react";
// apollo
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_CACHE} from '../graphql'

// import usePosition from './usePosition';
import getGeoPosition from './getPosition';

/*
  When a component utilizing this function is mounted the user is prompted 
  if the app can use their current location. 

  If the user's location does not match `userLatitude` and `userLongitude`
  stored in the Apollo Client cache, it updates the Apollo Client cache.
*/


export default function GetUserPosition() {
  const client = useApolloClient()
  const {data: cacheData} = useQuery(GET_CACHE)
  // const {getUserPosition} = usePosition()
  const {userPosition, getUserPosition} = getGeoPosition()


  if (
    userPosition.latitude !== cacheData.latitude ||
    userPosition.longitude !== cacheData.longitude
  ) {
    client.writeData({
      data: {
        userLatitude: userPosition.latitude,
        userLongitude: userPosition.longitude,
      },
    })
  }

  useEffect(() => {
    getUserPosition();
  }, []);

  return null;
}