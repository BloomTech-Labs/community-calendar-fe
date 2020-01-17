import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import {fetchGeocode} from '../../utils'

export default function Geocoder() {
  const [search, setSearch] = useState('')
  const handleChange = e => {
    setSearch(e.target.value)
  }

  const getData = async () => {
    let data = await fetchGeocode({searchWords: search})
    console.log('data', data)
  }
  return (
    <>
      <input type='text' onChange={handleChange} />
      <button onClick={getData}>submit</button>
    </>
  )
}
