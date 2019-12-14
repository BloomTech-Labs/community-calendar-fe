import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Auth0Provider} from './contexts/auth0-context.jsx'
import {BrowserRouter as Router} from 'react-router-dom'

import './index.scss'

ReactDOM.render(
  <Router>
    <Auth0Provider>
      <App title={'React is cool'} />
    </Auth0Provider>
  </Router>,
  document.getElementById('root'),
)

// Updates the app without refreshing the browser in development
if (process.env.NODE_ENV === 'development') {
  module.hot.accept()
}
