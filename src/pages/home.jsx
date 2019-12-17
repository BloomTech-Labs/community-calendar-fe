import React from 'react'
import {home} from './home.module'

const Home = () => {
  return (
    <div className={home}>
      <title>Home</title>
      <h1>Welcome</h1>
      <p className='poppins-font'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores hic,
        dolorum voluptatibus sed eveniet, mollitia veniam repellat ipsa amet
        iste magnam voluptatem possimus, id quae ullam vero exercitationem
        molestias architecto perferendis! Itaque et necessitatibus consequatur
        ab assumenda esse id quaerat saepe non blanditiis aliquam deserunt
        ipsam, soluta rem facilis reprehenderit!
      </p>
      <img src='https://media.giphy.com/media/h8mSIeTWzDFooj3hgT/giphy.gif' />
    </div>
  )
}

export default Home
