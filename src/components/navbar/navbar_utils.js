import ReactGA from 'react-ga'

function handleLogin(e, cb) {
  ReactGA.event({
    category: 'Login',
    action: 'User clicked Login button',
  })
  cb()
}

function handleLogout(e, cb) {
  ReactGA.event({
    category: 'Logout',
    action: 'User clicked the Logout button',
  })
  cb({returnTo: window.location.origin})
}
const navUtils = {handleLogin, handleLogout}

export default navUtils
