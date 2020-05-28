import React from 'react'
import {useDropdown} from '../../utils'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
import loadable from '@loadable/component'

//Components
import {MapMarkerCircle, DropdownIcon} from '../icons'
import TagInput from '../event_forms/TagInput'
import LoadingDots from '../loading/LoadingDots'

//GQL
import {useQuery} from '@apollo/react-hooks'
import {GET_CALENDAR_EVENTS} from '../../graphql'

// Utils
import {buildQS, createQSObj} from '../../utils'

// Styles
import {
  filterWrapper,
  mobile,
  datePickerDropdown,
  datePickerMargin,
} from './FilterMenu.module.scss'
import {locationContent} from '../navbar/Navbar.module.scss'

const SelectedRange = loadable(
  () =>
    import(
      /* webpackChunkName: "selectedRange" */ '../daypicker/selectedRange'
    ),
  {
    fallback: (
      <div className='is-flex justify-center'>
        <LoadingDots />
      </div>
    ),
  },
)

const Geocoder = loadable(
  () => import(/* webpackChunkName: "geocoder" */ '../geocoder/Geocoder'),
  {
    fallback: (
      <div className='is-flex justify-center'>
        <LoadingDots />
      </div>
    ),
  },
)

const FilterMenu = (props) => {
  const {
    setLocation,
    currentLocation,
    setDate,
    currentDate,
    currentTags,
    setTags,
    setPrice010,
    price010,
    setPrice1020,
    price1020,
    setPrice2040,
    price2040,
    setPrice4080,
    price4080,
    setPrice80,
    price80,
    qsFilters,
    recentSearches,
    setRecentSearches,
    setRecentSearchesLimited,
    filterAddress,
    setIndexText,
  } = props

  const rccHistory = useHistory()

  // DATA FOR RENDERING CUSTOM CSS IN SELECTED RANGE COMPONENT

  // queries for event data to pass to selectedRange component
  const calendarData = useQuery(GET_CALENDAR_EVENTS)
  const {data} = calendarData

  // maps through queried data to get an array of start times to pass to selectedRange component
  const startDates =
    data &&
    data.events &&
    data.events.map((event) => {
      if (new Date(event.start) >= new Date()) {
        return event.start
      }
    })

  // EVENT LOCATION SEARCH HANDLERS

  // event location dropdown
  const [locationIsOpen, setLocationIsOpen] = useDropdown(fakeCb, true)

  // used by geocoder to update local cache
  function setUserLocation(changes) {
    if (changes.selectedItem) {
      const place = {...changes.selectedItem}
      // apply filter
      let address = place.place_name.replace(/united states$/i, 'US')

      let newFilters = {
        ...qsFilters,
        location: {
          userLatitude: place.geometry.coordinates[1],
          userLongitude: place.geometry.coordinates[0],
          radius: currentLocation.radius || 10,
        },
      }

      setLocation({
        userLatitude: place.geometry.coordinates[1],
        userLongitude: place.geometry.coordinates[0],
        radius: currentLocation.radius || 10,
      })

      setRecentSearchesLimited(recentSearches, setRecentSearches, {
        ...newFilters,
        filterAddress: address,
      })
      const qsObj = createQSObj(qsFilters.index, newFilters, address)
      window.history.pushState(null, null, `${buildQS(qsObj)}`)
      // injects what the user searches for in location.search
      rccHistory.location.search = `${buildQS(qsObj)}`
    }
  } // end SetUserLocation

  // update radius
  function setRadius(radius, qsFilters, filterAddress) {
    let newFilters = {
      ...qsFilters,
      location: {
        userLatitude: qsFilters.location.userLatitude,
        userLongitude: qsFilters.location.userLongitude,
        radius: radius,
      },
    }

    setLocation({
      ...newFilters.location,
      radius,
    })

    setRecentSearchesLimited(recentSearches, setRecentSearches, {
      ...newFilters,
      filterAddress,
    })
    const qsObj = createQSObj(qsFilters.index, newFilters, filterAddress)
    window.history.pushState(null, null, `${buildQS(qsObj)}`)
    // injects what the user searches for in location.search
    rccHistory.location.search = `${buildQS(qsObj)}`
  } //end setRadius

  // DATE RANGE SEARCH HANDLERS
  // date dropdown
  const [dateIsOpen, setDateIsOpen] = useDropdown(fakeCb, true)

  function updateDateRange(start, end, qsFilters, filterAddress) {
    let newFilters = {
      ...qsFilters,
      dateRange: {
        start,
        end,
      },
    }

    setDate({
      start,
      end,
    })

    setRecentSearchesLimited(recentSearches, setRecentSearches, {
      ...newFilters,
      filterAddress,
    })

    const qsObj = createQSObj(qsFilters.index, newFilters, filterAddress)
    window.history.pushState(null, null, `${buildQS(qsObj)}`)
    // injects what the user searches for in location.search
    rccHistory.location.search = `${buildQS(qsObj)}`
  } //end updateDateRange

  // TAG SEARCH HANDLERS
  // update tags
  function setFilterTags(tags, setTags, qsFilters, filterAddress) {
    let newFilters = {
      ...qsFilters,
      tags,
    }

    setTags(tags)

    setRecentSearchesLimited(recentSearches, setRecentSearches, {
      ...newFilters,
      filterAddress,
    })

    const qsObj = createQSObj(qsFilters.index, newFilters, filterAddress)
    window.history.pushState(null, null, `${buildQS(qsObj)}`)
    // injects what the user searches for in location.search
    rccHistory.location.search = `${buildQS(qsObj)}`
  } //end setFilterTags

  // tags dropdown
  const [tagsIsOpen, setTagsIsOpen] = useDropdown(fakeCb, true)

  // PRICE SEARCH HANDLERS
  // price dropdown
  const [priceIsOpen, setPriceIsOpen] = useDropdown(fakeCb, true)

  function setFilterPrice(
    price,
    setPrice,
    minPrice,
    maxPrice,
    qsFilters,
    filterAddress,
  ) {
    // toggle price
    setPrice(!price)

    let oldPrices = qsFilters.ticketPrice ? [...qsFilters.ticketPrice] : null

    let ticketPrice = null
    // if price is false remove from qs
    if (price) {
      if (oldPrices) {
        ticketPrice = oldPrices.filter(
          (priceRange) =>
            priceRange.minPrice !== minPrice &&
            priceRange.maxPrice !== maxPrice,
        )
      }
    }
    // if price is true add to qs
    if (!price) {
      ticketPrice = oldPrices
        ? [...oldPrices, {minPrice, maxPrice}]
        : [{minPrice, maxPrice}]
    }
    let newFilters = {
      ...qsFilters,
      ticketPrice,
    }

    setRecentSearchesLimited(recentSearches, setRecentSearches, {
      ...newFilters,
      filterAddress,
    })

    const qsObj = createQSObj(qsFilters.index, newFilters, filterAddress)
    window.history.pushState(null, null, `${buildQS(qsObj)}`)
    // injects what the user searches for in location.search
    rccHistory.location.search = `${buildQS(qsObj)}`
  } //end setFilterPrice

  // fake cb  for close function
  function fakeCb(e) {
    return
  }

  const clearFilters = () => {
    setTags([])
    setDate({})
    setLocation({})
    setPrice010(false)
    setPrice1020(false)
    setPrice2040(false)
    setPrice4080(false)
    setPrice80(false)
    setIndexText('')
    window.history.pushState(null, null, `${window.location.origin}/`)
    rccHistory.location.search = ''
  }
  return (
    <div className={`${filterWrapper} ${props.mobile ? mobile : ''}`}>
      <div className='level is-flex justify-between'>
        <p className='is-size-6'>Filters</p>
        <button className={` has-text-link `} onClick={clearFilters}>
          clear
        </button>
      </div>
      {/* Select event location filter dropdown menu */}
      <div
        className={`dropdown is-block navDropdown ${
          locationIsOpen ? 'is-active' : ''
        }`}
        data-id='location-geocoder-wrapper'
      >
        <div
          role='button'
          className='dropdown-trigger level is-clickable '
          aria-haspopup='true'
          aria-controls='dropdown-menu2'
          data-testid='location-geocoder-trigger'
          data-id='location-geocoder-trigger'
          onClick={() => setLocationIsOpen(!locationIsOpen)}
        >
          <span className={` is-size-5 no-outline-focus no-pointer-events`}>
            Event Location
          </span>
          <span
            className={`${locationIsOpen ? 'flip' : ''} no-pointer-events icon`}
            style={{transition: 'transform 0.2s'}}
          >
            <DropdownIcon />
          </span>
        </div>
        <div
          className={` dropdown-menu  drop-center ${
            locationIsOpen ? 'is-active' : ''
          }`}
          id='location-dropdown-menu '
          role='menu'
          style={{
            position: 'relative',
            height: `${locationIsOpen ? 'initial' : 0}`,
            paddingTop: 0,
          }}
        >
          <div
            className='dropdown-content '
            data-id='location-geocoder-dropdown'
            style={{boxShadow: 'none', backgroundColor: '#fff', paddingTop: 0}}
          >
            <div
              className={locationContent}
              data-id='location-geocoder-dropdown-content'
            >
              {/* {eventSearchAddress && ( */}
              {filterAddress && (
                <p
                  data-id='location-geocoder-address-box'
                  className='level-left'
                  style={{marginBottom: '8px'}}
                >
                  <span data-id='location-geocoder-icon' className='level'>
                    <MapMarkerCircle />
                  </span>
                  <span
                    data-id='location-geocoder-address'
                    style={{marginLeft: '8px'}}
                  >
                    {/* {eventSearchAddress} */}
                    {filterAddress}
                  </span>
                </p>
              )}
              <Geocoder
                labelText='Find Events Near:'
                onSelectedItemChange={setUserLocation}
                dataIdPrefix='location-geocoder'
                isFilterMenu
              />
            </div>
          </div>
          {/* end dropdown-content*/}
          {/* {eventSearchAddress && ( */}
          {filterAddress && (
            <>
              <p className='is-size-5'>Distance</p>
              <div style={{padding: '8px'}}>
                <div className='checkmarkContainer'>
                  <input
                    type='radio'
                    name='radius'
                    checked={currentLocation.radius === 2}
                    id='2'
                    onChange={() => setRadius(2, qsFilters, filterAddress)}
                  />
                  <label htmlFor='2'>Nearby</label>
                  <span
                    onClick={() => setRadius(2, qsFilters, filterAddress)}
                    className='checkmark is-clickable'
                  ></span>
                </div>
                <div className='checkmarkContainer'>
                  <input
                    type='radio'
                    name='radius'
                    id='5'
                    checked={currentLocation.radius === 5}
                    onChange={() => setRadius(5, qsFilters, filterAddress)}
                  />
                  <span
                    onClick={() => setRadius(5, qsFilters, filterAddress)}
                    className='checkmark is-clickable'
                  ></span>
                  <label htmlFor='5'>5 mi</label>
                </div>
                <div className='checkmarkContainer'>
                  <input
                    type='radio'
                    name='radius'
                    id='10'
                    checked={currentLocation.radius === 10}
                    onChange={() => setRadius(10, qsFilters, filterAddress)}
                  />
                  <span
                    onClick={() => setRadius(10, qsFilters, filterAddress)}
                    className='checkmark is-clickable'
                  ></span>
                  <label htmlFor='10'>10 mi</label>
                </div>
                <div className='checkmarkContainer'>
                  <input
                    type='radio'
                    name='radius'
                    id='25'
                    checked={currentLocation.radius === 25}
                    onChange={() => setRadius(25, qsFilters, filterAddress)}
                  />
                  <span
                    onClick={() => setRadius(25, qsFilters, filterAddress)}
                    className='checkmark is-clickable'
                  ></span>
                  <label htmlFor='25'>25 mi</label>
                </div>
                <div className='checkmarkContainer'>
                  <input
                    type='radio'
                    name='radius'
                    id='50'
                    checked={currentLocation.radius === 50}
                    onChange={() => setRadius(50, qsFilters, filterAddress)}
                  />
                  <span
                    onClick={() => setRadius(50, qsFilters, filterAddress)}
                    className='checkmark is-clickable'
                  ></span>
                  <label htmlFor='50'>50 mi</label>
                </div>
              </div>
            </>
          )}
        </div>
        {/* end dropdown-menu*/}
      </div>{' '}
      {/** End location dropdown */}
      {/* Select event date fiter dropdown menu */}
      <div
        className={`dropdown is-block navDropdown ${
          dateIsOpen ? 'is-active' : ''
        }`}
        data-id='date-picker-wrapper'
      >
        <div
          role='button'
          className='dropdown-trigger level is-clickable '
          aria-haspopup='true'
          aria-controls='dropdown-menu2'
          data-testid='date-picker-trigger'
          data-id='date-picker-trigger'
          onClick={() => setDateIsOpen(!dateIsOpen)}
        >
          <span className={` is-size-5 no-outline-focus no-pointer-events`}>
            Date Range
          </span>
          <span
            className={`${dateIsOpen ? 'flip' : ''} no-pointer-events icon`}
            style={{transition: 'transform 0.2s'}}
          >
            <DropdownIcon />
          </span>
        </div>
        <div
          className={` dropdown-menu  drop-center ${
            dateIsOpen ? 'is-active' : ''
          } ${datePickerDropdown}`}
          id='date-dropdown-menu '
          role='menu'
          style={{
            position: 'relative',
            height: `${dateIsOpen ? 'initial' : 0}`,
            paddingTop: 0,
            width: 'max-content',
          }}
        >
          <div
            className='dropdown-content '
            data-id='date-picker-dropdown'
            style={{boxShadow: 'none', backgroundColor: '#fff', paddingTop: 0}}
          >
            <div
              className={locationContent}
              data-id='date-picker-dropdown-content'
              style={{marginLeft: '25px !important', padding: '0px'}}
            >
              <div
                className={` has-text-left no-outline-focus no-pointer-events`}
                style={{marginBottom: '8px'}}
              >
                {currentDate.start &&
                  currentDate.end &&
                  (Math.ceil(
                    moment
                      .duration(
                        moment(currentDate.end).diff(moment(currentDate.start)),
                      )
                      .asDays(),
                  ) === 1 ? (
                    <>
                      <p className='is-size-7 color_iconlight'>
                        Selected Date:
                      </p>
                      <p>
                        {moment(currentDate.start).format('ddd, MMM Do YYYY')}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <span className='is-size-7 color_iconlight'>
                          Start:&nbsp;
                        </span>
                        {moment(currentDate.start).format('ddd, MMM Do YYYY')}
                      </p>
                      <p>
                        <span className='is-size-7 color_iconlight'>
                          End:&nbsp;
                        </span>
                        {moment(currentDate.end).format('ddd, MMM Do YYYY')}
                      </p>
                    </>
                  ))}
              </div>
              <SelectedRange
                calendarData={startDates}
                setDate={setDate}
                updateDateRange={updateDateRange}
                start={currentDate.start}
                end={currentDate.end}
                qsFilters={qsFilters}
                filterAddress={filterAddress}
              />
            </div>
          </div>
          {/* end dropdown-content*/}
        </div>
        {/* end dropdown-menu*/}
      </div>{' '}
      {/** end date filter dropdown */}
      {/* Select tag fiter dropdown menu */}
      <div
        className={`dropdown is-block navDropdown ${
          tagsIsOpen ? 'is-active' : ''
        }`}
        data-id='tag-picker-wrapper'
      >
        <div
          role='button'
          className='dropdown-trigger level is-clickable '
          aria-haspopup='true'
          aria-controls='dropdown-menu2'
          data-testid='tag-picker-trigger'
          data-id='tag-picker-trigger'
          onClick={() => setTagsIsOpen(!tagsIsOpen)}
        >
          <span className={` is-size-5 no-outline-focus no-pointer-events`}>
            Tags
          </span>
          <span
            className={`${tagsIsOpen ? 'flip' : ''} no-pointer-events icon`}
            style={{transition: 'transform 0.2s'}}
          >
            <DropdownIcon />
          </span>
        </div>
        <div
          className={` dropdown-menu  drop-center ${
            tagsIsOpen ? 'is-active' : ''
          }`}
          id='tag-dropdown-menu '
          role='menu'
          style={{
            position: 'relative',
            height: `${tagsIsOpen ? 'initial' : 0}`,
            paddingTop: 0,
          }}
        >
          <div
            className='dropdown-content '
            data-id='tag-picker-dropdown'
            style={{boxShadow: 'none', backgroundColor: '#fff', paddingTop: 0}}
          >
            <div
              className={locationContent}
              data-id='tag-picker-dropdown-content'
            >
              <TagInput
                selectedTags={currentTags}
                setSelectedTags={setTags}
                qsFilters={qsFilters}
                setFilterTags={setFilterTags}
                filterAddress={filterAddress}
                filterMenu
              />
            </div>
          </div>
          {/* end dropdown-content*/}
        </div>
        {/* end dropdown-menu*/}
      </div>{' '}
      {/** end tag filter dropdown */}
      {/* Select Price fiter dropdown menu */}
      <div
        className={`dropdown is-block navDropdown ${
          priceIsOpen ? 'is-active' : ''
        }`}
        data-id='price-picker-wrapper'
      >
        <div
          role='button'
          className='dropdown-trigger level is-clickable '
          aria-haspopup='true'
          aria-controls='dropdown-menu2'
          data-testid='price-picker-trigger'
          data-id='price-picker-trigger'
          onClick={() => setPriceIsOpen(!priceIsOpen)}
        >
          <span className={` is-size-5 no-outline-focus no-pointer-events`}>
            Price
          </span>
          <span
            className={`${priceIsOpen ? 'flip' : ''} no-pointer-events icon`}
            style={{transition: 'transform 0.2s'}}
          >
            <DropdownIcon />
          </span>
        </div>
        <div
          className={` dropdown-menu  drop-center ${
            priceIsOpen ? 'is-active' : ''
          }`}
          id='price-dropdown-menu '
          role='menu'
          style={{
            position: 'relative',
            height: `${priceIsOpen ? 'initial' : 0}`,
            paddingTop: 0,
            zIndex: 0,
          }}
        >
          <div
            className='dropdown-content '
            data-id='tag-picker-dropdown'
            style={{
              boxShadow: 'none',
              backgroundColor: '#fff',
              paddingTop: 0,
              fontSize: '.9rem',
            }}
          >
            <div
              className={locationContent}
              data-id='tag-picker-dropdown-content'
            >
              <div className='checkmarkContainer'>
                <input
                  type='checkbox'
                  name='010'
                  id='010'
                  checked={price010}
                  onChange={() =>
                    setFilterPrice(
                      price010,
                      setPrice010,
                      0,
                      10,
                      qsFilters,
                      filterAddress,
                    )
                  }
                />
                <span
                  onClick={() =>
                    setFilterPrice(
                      price010,
                      setPrice010,
                      0,
                      10,
                      qsFilters,
                      filterAddress,
                    )
                  }
                  className='checkmark is-clickable'
                ></span>
                <label htmlFor='010'>&#36;0 &#8208; &#36;10</label>
              </div>

              <div className='checkmarkContainer'>
                <input
                  type='checkbox'
                  name='1020'
                  id='1020'
                  checked={price1020}
                  onChange={() =>
                    setFilterPrice(
                      price1020,
                      setPrice1020,
                      10,
                      20,
                      qsFilters,
                      filterAddress,
                    )
                  }
                />
                <span
                  onClick={() =>
                    setFilterPrice(
                      price1020,
                      setPrice1020,
                      10,
                      20,
                      qsFilters,
                      filterAddress,
                    )
                  }
                  className='checkmark is-clickable'
                ></span>
                <label htmlFor='1020'>&#36;10 &#8208; &#36;20</label>
              </div>

              <div className='checkmarkContainer'>
                <input
                  type='checkbox'
                  name='2040'
                  id='2040'
                  checked={price2040}
                  onChange={() =>
                    setFilterPrice(
                      price2040,
                      setPrice2040,
                      20,
                      40,
                      qsFilters,
                      filterAddress,
                    )
                  }
                />
                <span
                  onClick={() =>
                    setFilterPrice(
                      price2040,
                      setPrice2040,
                      20,
                      40,
                      qsFilters,
                      filterAddress,
                    )
                  }
                  className='checkmark is-clickable'
                ></span>
                <label htmlFor='2040'>&#36;20 &#8208; &#36;40</label>
              </div>

              <div className='checkmarkContainer'>
                <input
                  type='checkbox'
                  name='4080'
                  id='4080'
                  checked={price4080}
                  onChange={() =>
                    setFilterPrice(
                      price4080,
                      setPrice4080,
                      40,
                      80,
                      qsFilters,
                      filterAddress,
                    )
                  }
                />
                <span
                  onClick={() =>
                    setFilterPrice(
                      price4080,
                      setPrice4080,
                      40,
                      80,
                      qsFilters,
                      filterAddress,
                    )
                  }
                  className='checkmark is-clickable'
                ></span>
                <label htmlFor='4080'>&#36;40 &#8208; &#36;80</label>
              </div>

              <div className='checkmarkContainer'>
                <input
                  type='checkbox'
                  name='80'
                  checked={price80}
                  id='80'
                  onChange={() =>
                    setFilterPrice(
                      price80,
                      setPrice80,
                      80,
                      100000000,
                      qsFilters,
                      filterAddress,
                    )
                  }
                />
                <span
                  onClick={() =>
                    setFilterPrice(
                      price80,
                      setPrice80,
                      80,
                      100000000,
                      qsFilters,
                      filterAddress,
                    )
                  }
                  className='checkmark is-clickable'
                ></span>
                <label htmlFor='80'>&#36;80&#43;</label>
              </div>
            </div>
          </div>
          {/* end dropdown-content*/}
        </div>
        {/* end dropdown-menu*/}
      </div>{' '}
    </div>
  )
}

export default FilterMenu
