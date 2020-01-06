import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CCLogo from '../icons/CCLogo'
import HeartIcon from '../icons/CCLogo'
import GridIcon from '../icons/GridIcon'
import ListIcon from '../icons/ListIcon'
import ArrowIcon from '../icons/ArrowIcon'
import ShareIcon from '../icons/ShareIcon'

describe('Tests Icon Components', () => {
  describe('Tests for CCLogo component', () => {
    test('should match snapshot', () => {
      const tree = render(<CCLogo />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Tests for HeartIcon component', () => {
    test('should match snapshot', () => {
      const tree = render(<HeartIcon />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Tests for GridIcon component', () => {
    test('should match snapshot', () => {
      const tree = render(<GridIcon />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Tests for ListIcon component', () => {
    test('should match snapshot', () => {
      const tree = render(<ListIcon />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Tests for ShareIcon component', () => {
    test('should match snapshot', () => {
      const tree = render(<ShareIcon />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('Tests for ArrowIcon component', () => {
    test('should match snapshot', () => {
      const tree = render(<ArrowIcon />)
      expect(tree).toMatchSnapshot()
    })
  })
})
