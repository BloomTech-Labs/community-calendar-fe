import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoadingDots from '../loading/LoadingDots'
import LoadingLogo from '../loading/LoadingLogo'

describe('Tests for Loading Components', () => {
  describe('Tests for LoadingLogo component', () => {
    test('should match snapshot', () => {
      const tree = render(<LoadingLogo />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Tests for LoadingDots component', () => {
    test('should match snapshot', () => {
      const tree = render(<LoadingDots />)
      expect(tree).toMatchSnapshot()
    })

    test('should have three dots', () => {
      const tree = render(<LoadingDots />)
      const dots = document.querySelectorAll('div.dot')
      expect(dots.length).toBe(3)
    })
  })

  test('dots should have margin equal to 1/4 dot size', () => {
    const tree = render(<LoadingDots />)
    const dot = document.querySelector('div.dot')
    expect(dot).toHaveStyle(`margin-right: 2px; margin-left:2px`)
  })
})
