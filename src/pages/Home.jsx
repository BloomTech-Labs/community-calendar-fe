import React from 'react'

//components
import FeatCarousel from '../components/featured/FeaturedCarousel'
import SearchResults from '../components/search-results/SearchResults'

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_FEATURED_EVENTS} from '../graphql'

/* The first page user's see when opening the app */
const Home = () => {
  // FeaturedCarousel data (returns chronological list with few event fields for carousel)
  const featuredApolloData = useQuery(GET_FEATURED_EVENTS)

  return (
    <div className='page-wrapper'>
      {/* Featured Events carousel */}
      <>
        <FeatCarousel apolloData={featuredApolloData} />
        <div className='content-divider-x'></div>
      </>
      <SearchResults />
    </div>
  )
}

export default Home
