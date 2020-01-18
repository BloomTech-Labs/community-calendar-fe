import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import {fetchGeocode} from '../../utils'

export default function Geocoder() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mbResults, setMbResults] = useState([])
  let options = []

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: mbResults,
    // update list of options
    onInputValueChange: async ({inputValue}) => {
      console.log('inputValue', inputValue)
      // fetch data from api
      const data = await fetchGeocode({searchWords: inputValue})
      console.log('data', data.features)
      setMbResults(data.features.map(event => event.place_name))
      // set options to array of strings
      // options = mbResults.map(event => event.place_name)
    },
  })

  return (
    <>
      <label {...getLabelProps()}>Enter A Location</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          mbResults.map((place, indx) => (
            <li
              style={
                highlightedIndex === indx ? {backgroundColor: 'yellow'} : {}
              }
              key={'place-' + indx}
              // {...getItemProps({place, indx})}
            >
              {place}
            </li>
          ))}
      </ul>
    </>
  )
}

// <>
// <input type='text' onChange={handleChange} />
// <button onClick={getData}>submit</button>
// </>
