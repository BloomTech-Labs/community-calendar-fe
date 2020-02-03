import React from 'react'
import {useLocation} from 'react-router-dom'

/*
This function reads the query string in the URI and returns an object 
*/
const useObjFromQS = () => {
  // set up filter
  let pageLocation = useLocation()
  // create a search params object
  const urlQS = new URLSearchParams(pageLocation.search)
  // filters object which will be passed to apollo query
  let qsObj = {
    filtersObj: {
      index: undefined,
      location: undefined,
      ticketPrice: undefined,
      dateRange: undefined,
      tags: undefined,
    },
    filterAddress: undefined,
  }

  urlQS.forEach((v, k) => {
    // get index from query string and format string for gql query
    if (/index/i.test(k)) {
      qsObj.filtersObj.index = v
    }

    // create array of tags from query string
    else if (/tag/i.test(k)) {
      if (!qsObj.filtersObj.tags) qsObj.filtersObj.tags = []
      qsObj.filtersObj.tags.push(v)
    }
    // create array of ticketPrices from query string
    else if (/minprice/i.test(k)) {
      if (!qsObj.filtersObj.ticketPrice) qsObj.filtersObj.ticketPrice = []
      let ind = k.slice(k.indexOf('-') + 1)
      qsObj.filtersObj.ticketPrice[ind] = {
        ...qsObj.filtersObj.ticketPrice[ind],
        minPrice: +v,
      }
    } else if (/maxprice/i.test(k)) {
      if (!qsObj.filtersObj.ticketPrice) qsObj.filtersObj.ticketPrice = []
      let ind = k.slice(k.indexOf('-') + 1)
      qsObj.filtersObj.ticketPrice[ind] = {
        ...qsObj.filtersObj.ticketPrice[ind],
        maxPrice: +v,
      }
    }
    // create location filter object from query string
    else if (/(user(latitude)|(longitude))|(radius)/gi.test(k)) {
      if (!qsObj.filtersObj.location) qsObj.filtersObj.location = {}
      if (k === 'userLatitude' || k === 'userLongitude') {
        qsObj.filtersObj.location[k] = parseFloat(v)
      } else if (k === 'radius') {
        qsObj.filtersObj.location[k] = parseInt(v)
      }
    }
    // create date filter object from query string
    else if (/(start)|(end)/i.test(k)) {
      if (!qsObj.filtersObj.dateRange) qsObj.filtersObj.dateRange = {}
      qsObj.filtersObj.dateRange[k] = v
    }

    // get filter address for search results page
    else if (/filterAddress/i.test(k)) {
      qsObj.filterAddress = v
    }
  }) // end forEach

  return qsObj
}

export default useObjFromQS
