import useDropdown from '../useDropdown.js'
import {renderHook} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'

describe(`Tests for useDropdown.js`, () => {
  describe(`testing dropdown menu state`, () => {
    test(`should be false by default`, async () => {
      // when function is called default state should be false
      const {result} = await renderHook(() => useDropdown())

      await expect(result.current[0]).toBe(false)
    })

    test(`should be true, when developer states`, async () => {
      // when function and true is passedm state should return true
      const {result} = await renderHook(() => useDropdown(null, true))

      await expect(result.current[0]).toBe(true)
    })
  })
})
