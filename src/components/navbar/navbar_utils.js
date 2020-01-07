import ReactGA from 'react-ga'

/* const handleLogin = (e, cb) => {
  ReactGA.event({
    category: 'User',
    action: 'Clicked Login',
  })
  cb()
}

const handleLogout = (e, cb) => {
  ReactGA.event({
    category: 'User',
    action: 'Clicked Logout',
  })
  cb({returnTo: window.location.origin})
} */
function handleLogin(e, cb) {
  ReactGA.event({
    category: 'User',
    action: 'Clicked Login',
  })
  cb()
}

function handleLogout(e, cb) {
  ReactGA.event({
    category: 'User',
    action: 'Clicked Logout',
  })
  cb({returnTo: window.location.origin})
}
const navUtils = {handleLogin, handleLogout}

export default navUtils
