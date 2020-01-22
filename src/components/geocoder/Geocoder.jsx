import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import {fetchGeocode} from '../../utils'
import {geocoder, geocoderReset, hide} from './Geocoder.module'
import PropTypes from 'prop-types'

export default function Geocoder({
  labelText,
  onSelectedItemChange,
  placeholder,
  dataIdPrefix = 'geocoder',
}) {
  const [mbResults, setMbResults] = useState([])

  const {
    selectedItem,
    isOpen,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getComboboxProps,
    highlightedIndex,
    inputValue, // current input value
    getItemProps,
    reset,
  } = useCombobox({
    circularNavigation: true,
    items: mbResults,
    /* update list of options
    function that runs everytime input field changes
    */
    onInputValueChange: async ({inputValue}) => {
      if (inputValue.length > 2) {
        // fetch data from api
        const data = await fetchGeocode({searchWords: inputValue})
        // set options to array of strings
        data && setMbResults(data.features)
      }
    },
    /* runs everytime the selected item changes*/
    onSelectedItemChange,
    /* called each time an item is selected. 
      determines which field of the selected object is displayed in the input field. 
      */
    itemToString: item => (item ? item.place_name : ''),
  })

  return (
    <>
      {labelText && (
        <label
          {...getLabelProps({className: 'is-family-secondary color_shark'})}
          data-id={`${dataIdPrefix}-label`}
        >
          {labelText}
        </label>
      )}
      <div
        {...getComboboxProps({
          className: ` is-flex control has-icons-right ${geocoder}`,
        })}
        data-id={`${dataIdPrefix}-container`}
      >
        <input
          {...getInputProps({
            className: `input`,
            placeholder,
          })}
          data-id={`${dataIdPrefix}-input`}
        />
        <span
          className={`${geocoderReset} ${
            inputValue.length > 2 ? '' : hide
          } icon is-small is-right`}
          onClick={() => reset()}
          data-id={`${dataIdPrefix}-reset`}
        >
          &#127335;
        </span>
      </div>
      <ul
        {...getMenuProps({className: 'is-size-6'})}
        data-id={`${dataIdPrefix}-list`}
      >
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
              data-id={`${dataIdPrefix}-list-item`}
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
  dataIdPrefix: PropTypes.string,
}
