import React from 'react';
import Slider from 'react-slick';
import './Hero.css';  
import { Link } from 'react-router-dom';

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // 3 seconds
};

const Hero = () => {
  return (
    <div className='hero'>
      <Slider {...settings} className="hero-carousel">
        <div className="hero-slide">
          <img src='/Assets/hero-image.jpg' alt="Hero Image 1" className="hero-image" />
          <div className="hero-content">
            <h2>NEW ARRIVALS ONLY</h2>
            <Link to={"/women"}>
              <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src='/Assets/arrow.png' alt="Arrow Icon" />
              </div>
            </Link>
          </div>
        </div>
        <div className="hero-slide">
          <img src='/Assets/hero-image-2.avif' alt="Hero Image 2" className="hero-image" />
          <div className="hero-content">
            <h2>NEW ARRIVALS ONLY</h2>
              <Link to={"/men"}>
                <div className="hero-latest-btn">
                  <div>Latest Collection</div>
                  <img src='/Assets/arrow.png' alt="Arrow Icon" />
                </div>
              </Link>
          </div>
        </div>
        <div className="hero-slide">
          <img src='/Assets/hero-image-3.jpg' alt="Hero Image 3" className="hero-image" />
          <div className="hero-content">
            <h2>NEW ARRIVALS ONLY</h2>
            <Link to={"/kids"}>
              <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src='/Assets/arrow.png' alt="Arrow Icon" />
              </div>
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
