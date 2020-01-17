import React, {useState, useEffect} from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

export default function Geocoder() {
  let geocoder = null
  useEffect(() => {
    geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      // disable data analysis from Mapbox
      enableEventLogging: false,
      // only show results of type 'place' or 'address'
      types: 'place,address, postcode, region, neighborhood, district',
      // only show results from US
      countries: 'us',
    })
    // add the geocoder as a child another node on the dom
    geocoder.addTo('.container')
    // placeholder text
    geocoder.setPlaceholder('Search')
  }, [])

  if (geocoder) {
    geocoder.on('result', result => {
      console.log('result', result)
    })
  }
  return (
    <>
      <div className='geocoderTarget'></div>
      <div className='geocoder'></div>
    </>
  )
}
