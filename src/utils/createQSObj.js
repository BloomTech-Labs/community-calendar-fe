export default function createQSObj(text, filters = null, address = null) {
  // used to create a flattened object that is passed to buildQS()

  let qsObj = {}
  if (text) qsObj.index = text

  // used in FilterMenu.jsx to display 'Event Location'
  // when SearchResults page first mounts
  if (address) qsObj.filterAddress = address

  // if filters exist flatten into new object
  if (filters) {
    // if "tags" exist add to qs
    if (filters.tags) {
      filters.tags.forEach((tag, ind) => {
        qsObj[`tag${ind}`] = tag
      })
    }
    // if "locations" exist add to qs
    if (filters.location) {
      Object.keys(filters.location).forEach((k) => {
        qsObj[k] = filters.location[k]
      })
    }
    // if "dateRange" exist add to qs
    if (filters.dateRange) {
      Object.keys(filters.dateRange).forEach((k) => {
        qsObj[k] = filters.dateRange[k]
      })
    }
    // if "ticketPrice" exist add to qs
    if (filters.ticketPrice) {
      filters.ticketPrice.forEach((priceRange, ind) => {
        qsObj[`minPrice-${ind}`] = priceRange.minPrice
        qsObj[`maxPrice-${ind}`] = priceRange.maxPrice
      })
    }
  }

  return qsObj
}
