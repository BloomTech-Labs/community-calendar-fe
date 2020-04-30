import React from 'react'
import ReactDOM from 'react-dom'
import {Auth0Provider} from './contexts/auth0-context.jsx'
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
  clientId: '0oaajfti2Xgb3790a4x6',
  issuer: 'https://dev-996287.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/implicit/callback',
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
