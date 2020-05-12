import React from 'react'
import AboutUs from '../AboutUs.jsx'
import {render} from '@testing-library/react'

describe('test for AboutUs.jsx', () => {
  test('should match snapshot', () => {
    const tree = render(<AboutUs />)
    expect(tree).toMatchSnapshot()
  })
})
