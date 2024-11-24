import React from 'react'
import './property.css'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider';

const BuyHero = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    //speed: 3000,
    autoplaySpeed: 3000,
  };
  return (
    <div className='buy_buy'>
      <div className="buy_hero">
        <Slider {...settings}>
          {
            data.slice(0, 3).map((item) => {
              return (
                <div className="ci">
                  <div className="buyme" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)),url(${item.img[0]})` }}>

                    <div className="but_del">

                      <h2>{item.title}</h2>
                      <h3>{item.type}</h3>
                      <p>{item.description.slice(0, 80)}...</p>
                      <Link to={`/${item._id}`}><button>View Details</button></Link>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </Slider>
      </div>
    </div>
  )
}

export default BuyHero