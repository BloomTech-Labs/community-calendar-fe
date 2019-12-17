import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/Navbar'

//apollo
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context'

//auth0
import {useAuth0} from './contexts/auth0-context.jsx'

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
  getAccessToken()

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
      <div>
        {!isLoading && !user && (
          <>
            <h1>Click Below!</h1>
            <button className='button is-primary' onClick={loginWithRedirect}>
              Login
            </button>
          </>
        )}
        {!isLoading && user && (
          <>
            <h1>You are logged in!</h1>
            <p>Hello {user.name}</p>

            {user.picture && <img src={user.picture} alt='My Avatar' />}
            <hr />

            <button onClick={() => logout({returnTo: window.location.origin})}>
              Logout
            </button>
          </>
        )}
        <Route exact path='/' component={Home} />
      </div>
    </ApolloProvider>
  )
}

export default App
