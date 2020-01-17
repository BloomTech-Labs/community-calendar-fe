import buildURL from './buildURL'

const mapboxKey = process.env.MAPBOX
const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const queryParams = {}

export default async function fetchGeocode({
  searchWords = null,
  lat = null,
  long = null,
}) {
  /* 
  Returns an array of locations that match the input. 
  'searchWords' can be a words or numbers used to make up an address
  Can also return results if passed a latitude and longitude.
   */
  let searchTerm = lat && long ? `${long},${lat}` : searchWords
  // escape special characters in input string
  const uri = `${baseURL}${encodeURI(searchTerm)}.json/`
  console.log('fetchGeocode', uri)
  // query mapbox
  try {
    const response = await fetch(uri, {
      method: 'GET',
    })
    // return array of results
  } catch (err) {
    console.log('fetchGeocode Error', err)
    //return empty array if error
    return []
  }
}
