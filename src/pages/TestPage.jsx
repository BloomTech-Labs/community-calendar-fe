import React from 'react'
import Geocoder from 'geocoder/Geocoder'

const TestPage = () => {
  return (
    <div>
      <Geocoder
        labelText='It is raining today'
        onSelectedItemChangeCb={changes =>
          console.log('selected item updated', changes)
        }
      />
    </div>
  )
}
export default TestPage
