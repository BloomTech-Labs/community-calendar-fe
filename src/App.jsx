import {hot} from 'react-hot-loader/root'
import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

//auth0
import {useAuth0} from './contexts/auth0-context.jsx'

//apollo
import {ApolloProvider} from '@apollo/react-hooks'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
// import {HttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client'
import {typeDefs} from './graphql/localState'
import {onError} from 'apollo-link-error'
// import { typeDefs, resolvers } from './graphql';

//pages
import EventView from './pages/EventView'
import Home from './pages/Home'
import CreateEventPage from './pages/CreateEventPage'
import SearchResults from './pages/SearchResults'

//components
import Navbar from 'navbar/Navbar'
import PrivateRoute from 'private-route/PrivateRoute'
import GetUserPosition from './utils/GetUserPosition'
import Geocoder from 'geocoder/Geocoder'

function App() {
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
      setAccessToken(token)
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
  })

  // initialize apollo client in-memory cache of local state
  cache.writeData({
    data: {
      locationPermission: true,
      userLatitude: null,
      userLongitude: null,
      maxDistance: null,
    },
  })

  return (
    <ApolloProvider client={client}>
      <GetUserPosition />
      <Navbar />
      <Geocoder />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/create-event' component={CreateEventPage} />
        <Route path='/events/:id' component={EventView} />
        <Route path='/search/:searchText' component={SearchResults} />
      </Switch>
    </ApolloProvider>
  )
}

export default hot(App)
