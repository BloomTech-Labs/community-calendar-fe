import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import ReactGA from 'react-ga'
import gaConfig from './gaConfig.js'

//okta
import {Security} from '@okta/okta-react'

//components
import App from './App'
import ScrollToTop from './utils/ScrollToTop'

//styles
import './styles/index.scss'

const trackingID = process.env.REACT_APP_GOOGLE_ANALYTICS_TAG

ReactGA.initialize(trackingID, gaConfig[process.env.NODE_ENV])

const config = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
}

ReactDOM.render(
  <Router>
    <Security {...config}>
      <ScrollToTop />
      <App />
    </Security>
  </Router>,
  document.getElementById('root'),
)
