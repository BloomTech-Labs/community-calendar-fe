import React from 'react'
import Geocoder from 'geocoder/Geocoder'

const TestPage = () => {
  return (
    <div>
      <Geocoder
        labelText='It is raining today'
        placeholder='Find A Place'
        onSelectedItemChange={changes =>
          console.log('selected item updated', changes)
        }
      />
    </div>
  )
}
export default TestPage
