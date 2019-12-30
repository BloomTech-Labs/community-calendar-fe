import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CCLogo from '../icons/CCLogo'

describe('Tests for CCLogo component', () => {
  test('should match snapshot', () => {
    const tree = render(<CCLogo />)
    expect(tree).toMatchSnapshot()
  })
})
