import buildQueryParams from './buildQueryParams'

const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const queryParams = {}

export default async function fetchGeocode({
  searchWords = null,
  lat = null,
  long = null,
  params,
}) {
  /* 
  Returns an array of locations that match the input. 
  'searchWords' can be a words or numbers used to make up an address
  Can also return results if passed a latitude and longitude.
   */
  params = {access_token: process.env.MAPBOX, ...params}

  let searchTerm = lat && long ? `${long},${lat}` : searchWords
  // escape special characters in input string
  const uri = `${baseURL}${encodeURI(searchTerm)}.json/${buildQueryParams(
    params,
  )}`
  console.log('fetchGeocode', uri)
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
