import React from "react";

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
function Carousel() {
  return (
    <div className="App">
      <ReactSimpleCarousel slidesToShow={5}>
        {slides.map(({ image, text }, i) => (
          <div key={i} className="App-slide">
            <a href={`#${i}`} draggable="false">
              <img src={image} alt="" />
            </a>
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)"
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </ReactSimpleCarousel>
    </div>
  );
}

export default Carousel;