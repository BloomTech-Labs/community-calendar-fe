import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './header'

describe('Tests for Header.jsx', () => {
  it('should render', () => {
    const tree = render(<Header />)
    expect(tree).toMatchSnapshot()
  })
})
