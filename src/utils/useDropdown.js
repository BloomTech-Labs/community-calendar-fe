import React, {useState, useEffect} from 'react'

export default function useDropdown(
  closeCb, // function that will close the dropdown if the use clicks outside of it
  initialState = false, // dropdown is initially closed by default
  element = window, // element to add listener to.
) {
  const [isOpen, setIsOpen] = useState(initialState)

  useEffect(() => {
    // if use does not click on dropdown close it
    element.addEventListener('click', closeCb)
    return () => {
      element.removeEventListener('click', closeCb)
    }
  }, [])

  return [isOpen, setIsOpen]
}
