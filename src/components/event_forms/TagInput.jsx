import React, {useState, useRef, useEffect} from 'react'
import LoadingDots from '../loading/LoadingDots'

import {
  tagWrapper,
  tagDisplayClass,
  suggestedTags,
  tagClass,
  removeTagBtn,
  tagNameClass,
  filter,
} from './styles/TagInput.module.scss'

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_ALL_TAGS} from '../../graphql/events.query'

const TagInput = ({
  selectedTags,
  setSelectedTags,
  setFilterTags,
  qsFilters,
  filterAddress,
  filterMenu,
}) => {
  const {data, loading, error} = useQuery(GET_ALL_TAGS)

  //input field for searching tags
  const [tagInput, setTagInput] = useState('')

  //ref to element for displaying suggested tags to toggle its visibility
  const suggestedTagsRef = useRef(null)

  //ref for tagInput to check if it is focused
  const tagInputRef = useRef(null)

  //handler for when user types in tag input box for searching tags
  const handleTagInputChange = (event) => {
    setTagInput(event.target.value)
  }

  const filterTags = (tag) => {
    if (tagInput.length === 0) return true

    return new RegExp(`\\b${tagInput}`, 'i').test(tag.title)
  }

  const findSelectedTagIndex = (newTagName) => {
    return selectedTags.findIndex((tagName) =>
      new RegExp(`^${tagName}$`, 'i').test(newTagName),
    )
  }

  const addSelectedTag = (newTagName) => {
    //tag has not already been selected
    if (newTagName.length > 0 && findSelectedTagIndex(newTagName) === -1) {
      const updatedTags = [...selectedTags, newTagName]
      if (setFilterTags) {
        // for use on SearchResults page
        setFilterTags(updatedTags, setSelectedTags, qsFilters, filterAddress)
      } else {
        // Create/Update Event form
        setSelectedTags(updatedTags)
      }
    }
  }

  const removeSelectedTag = (tagName) => {
    const index = findSelectedTagIndex(tagName)

    if (index >= 0) {
      const updatedTags = [
        ...selectedTags.slice(0, index),
        ...selectedTags.slice(index + 1),
      ]
      if (setFilterTags) {
        // for use on SearchResults page
        setFilterTags(updatedTags, setSelectedTags, qsFilters, filterAddress)
      } else {
        // Create/Update Event form
        setSelectedTags(updatedTags)
      }
    }
  }

  //when user clicks or hits enter on a suggested tag
  const toggleSelectedTag = (event) => {
    if (event.target.hasAttribute('is_selected')) {
      event.target.removeAttribute('is_selected', 'false')
      event.target.style.color = 'unset'
      removeSelectedTag(event.target.innerHTML)
    } else {
      event.target.setAttribute('is_selected', '')
      event.target.style.color = 'blue'
      addSelectedTag(event.target.innerHTML)
    }
  }

  const hideTags = () => {
    suggestedTagsRef.current.style.visibility = 'hidden'
  }

  const showTags = () => {
    suggestedTagsRef.current.style.visibility = 'visible'
  }

  //event handlers

  const handleClick = (event) => {
    if (tagInputRef.current.contains(event.target)) {
      showTags()
    } else {
      setTagInput('')
      hideTags()
    }
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        if (document.activeElement === tagInputRef.current)
          addSelectedTag(tagInput)
        else toggleSelectedTag(event)

        event.preventDefault()
        break
      case ' ':
        if (suggestedTagsRef.current.contains(event.target))
          toggleSelectedTag(event)

        event.preventDefault()
        break
      case 'ArrowDown':
      case 'ArrowRight':
        if (document.activeElement === tagInputRef.current)
          suggestedTagsRef.current.firstChild.focus()
        else if (document.activeElement === suggestedTagsRef.current.lastChild)
          tagInputRef.current.focus()
        else document.activeElement.nextSibling.focus()

        event.preventDefault()
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        if (document.activeElement === tagInputRef.current)
          suggestedTagsRef.current.lastChild.focus()
        else if (document.activeElement === suggestedTagsRef.current.firstChild)
          tagInputRef.current.focus()
        else document.activeElement.previousSibling.focus()

        event.preventDefault()
        break
    }
  }

  useEffect(() => {
    //componentDidMount
    document.addEventListener('click', handleClick)

    //componentWillUnmount
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  if (loading) {
    return <LoadingDots />
  }

  if (error) {
    return (
      <input
        placeholder='Error loading tags'
        className='no-border is-size-6half no-outline-focus'
      />
    )
  }

  return (
    <div onFocus={showTags} onKeyDown={handleKeyDown} className={tagWrapper}>
      {/* where selected tags are displayed */}
      <div className={tagDisplayClass}>
        {selectedTags.map((tagName, idx) => (
          <span key={idx} className={`${tagClass} is-family-primary`}>
            <span className={tagNameClass}>{tagName}</span>
            <span
              className={removeTagBtn}
              onClick={(event) => removeSelectedTag(tagName, event)}
            >
              x
            </span>
          </span>
        ))}
      </div>
      {/* where tags are searched for */}
      <input
        onChange={handleTagInputChange}
        aria-haspopup='true'
        aria-expanded='false'
        ref={tagInputRef}
        value={tagInput}
        placeholder='Enter tags'
        className={`is-size-6half no-outline-focus ${
          filterMenu ? 'w-100' : ''
        }`}
      />
      {/* where suggested tags are displayed */}
      <div
        className={`${suggestedTags} ${filterMenu ? filter : ''}`}
        ref={suggestedTagsRef}
        style={{visibility: 'hidden'}}
        role='menu'
      >
        {data.tags
          .filter(filterTags)
          .sort()
          .map((tag, idx) => (
            <p
              key={idx}
              onClick={toggleSelectedTag}
              tabIndex='0'
              role='menuitem'
            >
              {tag.title}
            </p>
          ))}
      </div>
    </div>
  )
}

export default TagInput
