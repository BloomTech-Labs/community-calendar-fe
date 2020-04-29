import {hot} from 'react-hot-loader/root'
import React, {useState, useEffect} from 'react'
import {Route, Switch, useLocation} from 'react-router-dom'
import ReactGA from 'react-ga'

//auth0
import {useAuth0} from './contexts/auth0-context.jsx'

//apollo
import {ApolloProvider, useQuery} from '@apollo/react-hooks'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client'
import {typeDefs} from './graphql/localState'
import {onError} from 'apollo-link-error'

//pages
import Home from './pages/Home'
import EventView from './pages/EventView'
import UpdateEventPage from './pages/UpdateEventPage'
import CreateEventPage from './pages/CreateEventPage'
import SearchResults from './pages/SearchResults'
import UserProfile from './pages/UserProfilePage'
import AboutUs from './pages/AboutUs'

//components
import Navbar from 'navbar/Navbar'
import PrivateRoute from 'private-route/PrivateRoute'
import {GetUserPosition} from './utils'
import LoadingLogo from 'loading/LoadingLogo'

function App() {
  const decode = require('jwt-decode') //used to decode access token
  const {
    isLoading,
    user,
    loginWithRedirect,
    logout,
    getTokenSilently,
  } = useAuth0()
  const [accessToken, setAccessToken] = useState('')

  const getAccessToken = async () => {
    try {
      const token = await getTokenSilently()
      const decodedToken = decode(token)
      setAccessToken(token)
      cache.writeData({
        data: {
          userId: decodedToken['http://cc_id'],
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  user && getAccessToken()

  const errorLink = new onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const httpLink = new createUploadLink({
    uri: process.env.REACT_APP_APOLLO_SERVER,
    headers: {
      'keep-alive': 'true',
    },
  })

  const authLink = setContext((_, {headers}) => {
    const token = accessToken
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    } else {
      return {
        headers: {
          ...headers,
        },
      }
    }
  })

  const location = useLocation()

  // Google Analytics app tracking
  useEffect(() => {
    // When user location changes, useEffect will be triggered
    // ReactGA will ping new user location
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [location])

  // initialize cache that will be used for state from server queries and local state
  const cache = new InMemoryCache()

  // initialize apollo client to resolve queries to server and local state
  const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    //client cache
    cache,
    // add typedefs and resolvers for local state
    typeDefs,
    resolvers: {},
  })

  // initialize apollo client in-memory cache of local state
  cache.writeData({
    data: {
      locationPermission: true,
      userLatitude: null,
      userLongitude: null,
      userAddress: null,
      maxDistance: null,
      userId: null,
      recentSearches: null,
      profileImage: null,
    },
  })

  return (
    <ApolloProvider client={client}>
      <GetUserPosition />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/create-event' component={CreateEventPage} />
        <Route path='/myprofile' component={UserProfile} />
        <Route exact path='/events/:id' component={EventView} />
        <Route exact path='/events/:id/update' component={UpdateEventPage} />
        <Route path='/search' component={SearchResults} />
        <Route path='/about-us' component={AboutUs} />
      </Switch>
    </ApolloProvider>
  )
}

export default hot(App)
