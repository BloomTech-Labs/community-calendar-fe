import React from 'react'
import ReactDOM from 'react-dom'
import {Auth0Provider} from './contexts/auth0-context.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import ReactGA from 'react-ga';
import gaConfig from '../gaConfig'

//components
import App from './App'
import ScrollToTop from './utils/ScrollToTop'

//styles
import 'index.scss'

const trackingID = process.env.REACT_APP_GOOGLE_ANALYTICS_TAG

ReactGA.initialize(trackingID, gaConfig[process.env.NODE_ENV])

ReactDOM.render(
  <Router>
    <Auth0Provider>
      <ScrollToTop />
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById('root'),
)

// Updates the app without refreshing the browser in development
if (process.env.NODE_ENV === 'development') {
  module.hot.accept()
}
