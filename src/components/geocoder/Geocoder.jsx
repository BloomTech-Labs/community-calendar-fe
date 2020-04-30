import React, {useState} from 'react'
import {useCombobox} from 'downshift'
import {fetchGeocode} from '../../utils'
import {geocoder, geocoderReset, hide, filterMenu} from './Geocoder.module.scss'
import PropTypes from 'prop-types'
import {SearchIcon, CloseIconSquare} from '../icons'

export default function Geocoder({
  labelText,
  onSelectedItemChange,
  placeholder,
  dataIdPrefix = 'geocoder',
  isFilterMenu,
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
          {...getLabelProps({className: ' color_shark'})}
          data-id={`${dataIdPrefix}-label`}
        >
          {labelText}
        </label>
      )}
      <div
        {...getComboboxProps({
          className: ` is-flex control  has-icons-right ${geocoder} ${
            isFilterMenu ? `${filterMenu} has-icons-left` : ''
          }`,
        })}
        data-id={`${dataIdPrefix}-container`}
      >
        {isFilterMenu && (
          <span
            className={` icon  is-left`}
            data-id={`${dataIdPrefix}-search-icon`}
            style={{top: '12px', left: '2px', width: '20px'}}
          >
            <SearchIcon dimensions={20} />
          </span>
        )}
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
          style={{right: '2px'}}
          onClick={() => reset()}
          data-id={`${dataIdPrefix}-reset`}
        >
          <CloseIconSquare ignorePointer />
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
