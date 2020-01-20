import buildQS from './buildQS'

const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

export default async function fetchGeocode({
  searchWords = '',
  lat = null,
  long = null,
  params = {},
} = {}) {
  if (!searchWords && !lat && !long) return null
  /* 
  Returns an array of locations that match the input. 
  'searchWords' can be a words or numbers used to make up an address
  Can also return results if passed a latitude and longitude.
   */
  params = {
    access_token: process.env.REACT_APP_MAPBOX,
    types: 'address,postcode,place,neighborhood,region,district,locality',
    country: 'us',
    ...params,
  }

  let searchTerm = lat && long ? `${long},${lat}` : searchWords
  // escape special characters in input string
  const uri = `${baseURL}${encodeURI(searchTerm)}.json/${buildQS(params)}`
  // query mapbox
  try {
    const data = await fetch(uri, {
      method: 'GET',
      mode: 'cors',
    })
    // return array of results
    return await data.json()
  } catch (err) {
    console.log('fetchGeocode Error', err)
    //return empty array if error
    return null
  }
}
