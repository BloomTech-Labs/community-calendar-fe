import React from "react";
import PropTypes from 'prop-types'

//components
import FeaturedCard from './FeaturedCard.jsx'
import LoadingLogo from '../loading/LoadingLogo'

//styles
import {featuredWrapper} from './Featured.module.scss'

// Carousel
import ReactSimpleCarousel from "react-spring-carousel";

const Image = 'https://detroitmi.gov/sites/detroitmi.localhost/files/2018-11/Mary-Sheffield.jpg';

const slides = [
  {
    image: Image,
    text: "Exercitation tempor"
  },
  {
    image: Image,
    text: "dolore proident id"
  },
  {
    image: Image,
    text: "proident id irure"
  },
  {
    image: Image,
    text: "Exercitation irure"
  },
  {
    image: Image,
    text: "dolore proident id irure"
  }
];
function Carousel({apolloData: {data, loading, error}}) {
  return (
    <div className="App">
    {!loading && data &&
      (<ReactSimpleCarousel slidesToShow={5}>
        {data.events.map(event => (
            <FeaturedCard key={event.id} item={event} />
          ))}
      </ReactSimpleCarousel>)
    }
    </div>
  );
}

export default Carousel;