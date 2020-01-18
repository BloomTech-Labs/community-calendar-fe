import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import {fetchGeocode} from '../../utils'
import PropTypes from 'prop-types'

export default function Geocoder({
  labelText,
  onSelectedItemChange,
  placeholder,
}) {
  const [mbResults, setMbResults] = useState([])

  const {
    selectedItem,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useCombobox({
    circularNavigation: true,
    items: mbResults,
    /* update list of options
    function that runs everytime input field changes
    */
    onInputValueChange: async ({inputValue}) => {
      console.log('inputValue', inputValue)
      // fetch data from api
      const data = await fetchGeocode({searchWords: inputValue})
      // set options to array of strings
      data && setMbResults(data.features)
    },
    /* runs everytime the selected item changes*/
    onSelectedItemChange,
    /* called each time an item is selected. 
      determines which field of the selected object is displayed in the input field. 
      */
    itemToString: item => (item ? item.place_name : ''),
  })

  console.log('selected Item', selectedItem)

  return (
    <>
      {labelText && (
        <label {...getLabelProps({className: 'is-family-secondary'})}>
          {labelText}
        </label>
      )}
      <div {...getComboboxProps({className: 'has-text-danger is-flex'})}>
        <input
          {...getInputProps({
            className: 'color_shark input',
            placeholder,
          })}
        />
        <button onClick={() => reset()}>X</button>
      </div>
      <ul {...getMenuProps({className: 'has-text-danger'})}>
        {isOpen &&
          mbResults.map((item, index) => (
            <li
              className='is-clickable'
              style={
                highlightedIndex === index
                  ? {backgroundColor: 'black', color: 'white'}
                  : {}
              }
              key={item.place_name + '-' + index}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item.place_name}
            </li>
          ))}
      </ul>
    </>
  )
}

Geocoder.propTypes = {
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
}
