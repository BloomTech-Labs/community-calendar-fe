import React, {useState, useEffect} from 'react'
import {Route, Switch, useLocation} from 'react-router-dom'
import ReactGA from 'react-ga'

//okta
import {LoginCallback, useOktaAuth} from '@okta/okta-react'

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
import SearchResults from './components/search-results/SearchResults'
import UserProfile from './pages/UserProfilePage'
import AboutUs from './pages/AboutUs'

//components
import Navbar from './components/navbar/Navbar'
import {GetUserPosition, GetUserInfo, ProtectedRoute} from './utils'
import LoadingLogo from './components/loading/LoadingLogo'

function App() {
  const decode = require('jwt-decode') //used to decode access token
  const [accessToken, setAccessToken] = useState('')

  const {authState, authService} = useOktaAuth()

  useEffect(() => {
    updateUserAndToken()
  }, [authState, authService])

  const updateUserAndToken = async () => {
    if (!authState.isAuthenticated) {
      setAccessToken(null)
    } else {
      await authService.getAccessToken().then((response) => {
        setAccessToken(response)
      })
    }
  }

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
          Authorization: `Bearer ${token}`,
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
      <GetUserInfo />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <ProtectedRoute path='/create-event' component={CreateEventPage} />
        <ProtectedRoute path='/myprofile' component={UserProfile} />
        <Route exact path='/events/:id' component={EventView} />
        <ProtectedRoute
          exact
          path='/events/:id/update'
          component={UpdateEventPage}
        />
        <Route path='/about-us' component={AboutUs} />

        <Route path='/implicit/callback' component={LoginCallback} />
      </Switch>
    </ApolloProvider>
  )
}

export default App
