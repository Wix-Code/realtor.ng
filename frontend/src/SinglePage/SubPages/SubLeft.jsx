import React, { useContext, useEffect, useState } from 'react'
import './subpages.css'
import { FaBath, FaBed, FaChevronLeft, FaTimes, FaUser } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaBars, FaLocationDot, FaMinus, FaPlus } from 'react-icons/fa6'
import { HiViewList } from 'react-icons/hi'
import { storeContext } from '../../Context/Context'

const SubLeft = () => {

  const { id } = useParams()

  //const [post, setPost] = useState(null)

  const { post, fetchData } = useContext(storeContext)
  //const user = JSON.parse(localStorage.getItem('user')) || null
  //const data = user?.info

  useEffect(() => {
    fetchData(id); // Fetch the post when the component mounts
  }, [id, fetchData])

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/single/${id}`, {
          withCredentials: false
        })
        setPost(res.data.posts)
        console.log(res.data.posts)
        console.log(res.data.posts.userId.username)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id]) */


  const [zoom, setZoom] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const handleClick = (index) => {
    setZoom(index)
    setFullscreen(true)
  }

  const prev = (direction) => {
    const currentIndex = post?.img.indexOf(post?.img.find((item) => item === post?.img[zoom]))
    const newIndex = currentIndex + (direction === 'p' ? -1 : 1)
    setZoom(newIndex < 0 ? post?.img.length - 1 : newIndex > post?.img.length - 1 ? 0 : newIndex)
  }

  const next = (direction) => {
    const currentIndex = post?.img.indexOf(post?.img.find((item) => item === post?.img[zoom]))
    const newIndex = currentIndex + (direction === 'n' ? -1 : 1)
    setZoom(newIndex < 0 ? post?.img.length - 1 : newIndex > post?.img.length - 1 ? 0 : newIndex)
  }

  const date = new Date(post?.createdAt)

  /*const prev = (direction) => {
    let nextSlide;
    if (direction === "p") {
      nextSlide = zoom === 0 ? img.length : zoom - 1
     } else {
      nextSlide = zoom === img.length ? 0 : zoom + 1
     }
    setZoom(nextSlide)
  }*/



  return (
    <div className='subleft'>
      {
        fullscreen ? <div className="index_div">
          <button onClick={() => prev("p")}><FaMinus />
          </button>
          <img src={post?.img[zoom]} alt="" />
          <button onClick={() => next("n")}><FaPlus />
          </button>
          <div className="close_icon" onClick={() => setFullscreen(false)}><FaTimes />
          </div>
        </div> : null
      }
      <div className="back_to">
        <FaChevronLeft />
        <Link to='/'><p>Back to property list</p></Link>
      </div>
      <div className="bedroom">
        <h2>{post?.title}</h2>
        <h1>&#8358;{new Intl.NumberFormat('en-US').format(post?.price)}</h1>
      </div>
      <div className="cat_cat">
        <div className="gra">
          <FaLocationDot />
          <p>{post?.location}</p>
        </div>
        <h4>{post?.cat}</h4>
      </div>
      <div className="furn">
        <h3>{post?.type}</h3>
        <h3>{post?.furnish}</h3>
      </div>
      <div className="single_pics">
        {
          post?.img.map((item, i) => {
            return (
              <div className="img_map" key={i}>
                <img onClick={() => handleClick(i)} src={item} alt="" />
              </div>
            )
          })
        }
      </div>

      <div className="sub_tolet">
        <div className="sub_lets">
          <FaBed className='bed' />
          <p>{post?.bedroom} bedrooms</p>
        </div>
        <div className="sub_lets">
          <FaBath className='bed' />
          <p>{post?.bathroom} bathrooms</p>
        </div>
      </div>
      <div className="property">
        <h3>Property Description</h3>
        <p>{post?.description}</p>
      </div>
      <div className="interest">
        <p>Interested in this property?</p>
        <h3>Call <a href="tel:+2348126829146">{post?.phoneNo}</a></h3>
      </div>
      <div className="market">
        <h3>Marketeted By</h3>
        <div className="market_user">
          <img src={post?.userId?.userimg || '/pic/avata.png'} alt="" />
          <Link to={`/lists/${post?.userId?._id}`}><p>{post?.userId?.username}</p></Link>
        </div>
        <div className="market_del">
          <div className="markit">
            <FaUser />
            <p>Posted on {date.toDateString()}</p>
          </div>
          <div className="markit">
            <HiViewList />
            <Link to={`/lists/${post?.userId?._id}`}><p>View all properties from this agent</p></Link>
          </div>
        </div>
      </div>
      <div className="disclaimer">
        <h3>Disclaimer</h3>
        <p>
          The information displayed about this property comprises a property advertisement. Nigeria Property Centre makes no warranty as to the accuracy or completeness of the advertisement or any linked or associated information, and Nigeria Property Centre has no control over the content. This property listing does not constitute property particulars.The information is provided and maintained by <b>{post?.userId?.username}</b> Nigeria Property Centre shall not in any way be held liable for the actions of any agent and/or property owner/landlord on or off this website. </p>
      </div>
    </div>
  )
}

export default SubLeft