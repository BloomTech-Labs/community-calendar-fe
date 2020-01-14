import {hot} from 'react-hot-loader/root'
import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

//auth0
import {useAuth0} from './contexts/auth0-context.jsx'

//apollo
import {ApolloProvider} from '@apollo/react-hooks'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context'

//pages
import EventView from './pages/EventView'
import Home from './pages/Home'
import CreateEventPage from './pages/CreateEventPage'
import SearchResults from './pages/SearchResults'

//components
import Navbar from 'navbar/Navbar'
import PrivateRoute from 'private-route/PrivateRoute'

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

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_APOLLO_SERVER,
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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/create-event' component={CreateEventPage} />
        <Route path='/events/:id' component={EventView} />
        <Route path='/search/:searchText' component={SearchResults} />
      </Switch>
    </ApolloProvider>
  )
}

export default hot(App)
