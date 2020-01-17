const mapboxKey = process.env.MAPBOX

export default async function fetchGeocode({
  searchString = null,
  lat = null,
  long = null,
}) {
  /* 
  Returns an array of locations that match the input. 
  'searchString' can be a words or numbers used to make up an address
  Can also return results if passed a latitude and longitude.
   */
  let results
  let uri = lat && long ? `${long},${lat}` : searchString
  // escape special characters in input string
  const encoded = encodeURI(uri)
  // query mapbox

  // return array of results
  //return empty array if error
}
