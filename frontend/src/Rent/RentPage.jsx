import React from 'react'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider';

const RentPage = ({ data }) => {
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
                <div className="buy">
                  <div className="buy_img">
                    <img src={item.img[0]} alt="" />
                  </div>
                  <div className="buy_details">
                    <div className="buy_det">
                      <h2>{item.title}</h2>
                      <h3>{item.type}</h3>
                      <p>{item.description}</p>
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

export default RentPage