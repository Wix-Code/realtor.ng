import React, { useEffect, useState } from 'react'
import './components.css'
import { FaBath, FaBed } from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Latest = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/post/create', {
          withCredentials: true
        })
        setData(res.data.posts)
        console.log(res.data.posts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='latest'>
      <div className="latests">
        <div className="latest_discover">
          <h1>Latest Properties</h1>
          <p>Discover the latest properties available for rent, buy, or sell</p>
        </div>
        <div className="late">
          {
            data.slice(0, 4).map((item) => {
              return (
                <div className="latest_contain" key={item._id}>
                  <h4>{item.title}</h4>
                  <div className="late_con">
                    <div className="late_img">
                      <Link to={`/${item._id}`}><img src={item.img[0]} alt="" /></Link>
                    </div>
                    <div className="late_desc">
                      <h2>{item.type}</h2>
                      <p>{item.description}</p>
                      <hr />
                      <h3>&#8358;{item.price}</h3>
                    </div>
                  </div>
                  <div className="late_icon">
                    <div className="lat_icons">
                      <FaBed className='bed' />
                      <span>{item.bedroom}</span>
                    </div>
                    <div className="lat_icons">
                      <FaBath className='bed' />
                      <span>{item.bathroom}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Latest