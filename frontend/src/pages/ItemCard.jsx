import React from 'react'
import './pages.css'
import { FaBath, FaBed, FaPhoneAlt, FaRegEdit } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoCameraOutline } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

const ItemCard = ({ item }) => {
  const navigate = useNavigate()


  const user = JSON.parse(localStorage.getItem('user')) || null;

  const data = user?.info
  //console.log(user)

  console.log("user id", data?._id)

  /*if (!data) {
    return null
  } */

  //const { id } = useParams()
  const token = localStorage.getItem('token');

  console.log(token, "token is here")


  const deletePost = async () => {

    //const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://back-end-g5hr.onrender.com/api/post/delete/${item._id}`, {
        headers: {
          Authorization: `Bearer ${data._id}`
        }, withCredentials: true,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="left_contain">
      <div className="left_del">
        <p className='p'>
          {item.title}
        </p>
        {
          data?._id && item.userId?._id && data._id === item.userId._id && <div className="delete">
            <Link to={`/update/${item._id}`}><button><FaRegEdit />
            </button></Link>
            <button onClick={deletePost}><MdDelete />
            </button>
          </div>
        }
      </div>
      <div className="left_container">
        <div className="left_img">
          <img src={item.img[0]} alt="" />
          <div className="item_image">
            <IoCameraOutline />
            <p>{item.img.length}</p>
          </div>
        </div>
        <div className="left_details">
          <div className="furnish">
            <h4>{item.furnish}</h4>
            <h4>{item.cat}</h4>
          </div>
          <div className="types">
            <div className="item_loc">
              <FaLocationDot />
              <h4>{item.location}</h4>
            </div>
            <h4>{item.type}</h4>
          </div>
          <p>{item.description}</p>
          <Link to={`/${item._id}`}><button>More details</button></Link>
          <hr />
          <div className="item">
            <h2>&#8358;{item.price}</h2>
            <div className="item_no">
              <span>{item?.userId?.username}</span>
              <div className="item_ph">
                <FaPhoneAlt />
                <h5>{item.phoneNo}</h5>
              </div>
            </div>
          </div>
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
}

export default ItemCard