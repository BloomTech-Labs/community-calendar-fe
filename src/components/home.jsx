import React from 'react'

const Home = () => {
  return (
    <div>
      <p>The auth domain is: {process.env.AUTH0_DOMAIN}</p>
      <p>The auth client id is: {process.env.AUTH0_CLIENT_ID}</p>
      <p>the env is: {process.env.NODE_ENV}</p>
      <title>Home</title>
      <h1>Welcome</h1>
      <img src='https://media.giphy.com/media/h8mSIeTWzDFooj3hgT/giphy.gif' />
    </div>
  )
}

export default Home
