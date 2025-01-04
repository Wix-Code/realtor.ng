import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './userposts.css'
import ItemCard from '../pages/ItemCard'
import { FaRegEdit } from 'react-icons/fa'
import Loader from '../Loader/Loader'
import upload from '../utils/upload'
import { storeContext } from '../Context/Context'

const UserPosts = () => {
  const { id } = useParams()

  const [post, setPost] = useState([])
  const [userDetail, setUserDetail] = useState(null)
  const user = JSON.parse(localStorage.getItem('user')) || null
  const data = user?.info
  const [openEdit, setOpenEdit] = useState(false)
  const [img, setImg] = useState(null)
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  //const { userDetails, change } = useContext(storeContext)

  console.log(data._id, "data me")
  //console.log(user, "user info me")

  const [userDetails, setUserDetails] = useState({
    userimg: '',
    username: '',
    email: '',
  })

  const change = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const updateUser = async (e) => {
    e.preventDefault()
    //setLoading(true)
    const url = await upload(img)
    const updatedDetails = Object.fromEntries(
      Object.entries({ ...userDetails, userimg: url }).filter(([_, value]) => value)
    );



    const token = localStorage.getItem('token');

    const res = await axios.post(`https://back-end-g5hr.onrender.com/api/user/update/${data._id}`, updatedDetails, {
      headers: {
        Authorization: `Bearer ${token}`,  // Pass token in the Authorization header
      }
      , withCredentials: true
    })
    if (res && res.data.success) {

      window.location.reload()

      setOpenEdit(false);

    }

    console.log(res.data)
    //setLoading(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create/${id}/posts`, {
          withCredentials: false
        })
        setPost(res.data.posts)
        setUserDetail(res.data.posts[0].userId)
        // console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)
  }, [])
  if (loader) {
    return <Loader />
  }


  return (
    <div className='userposts'>
      <div className="userposts_col">
        <div className="open_edit">
          {
            openEdit && (
              <div className="open_d">
                <div className="open_inp">
                  <div className="open_div">
                    <label htmlFor="">Username</label>
                    <input type="text" name='username' onChange={change} placeholder='Username' />
                  </div>
                  <div className="open_div">
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' onChange={change} placeholder='Email' />
                  </div>
                  <div className="open_btn">
                    <button onClick={updateUser}>Update</button>
                  </div>
                  <div className="open_close">
                    <p onClick={() => setOpenEdit(false)}>X</p>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <div>
          {
            userDetail && <div className='userdetails'>
              <img src={userDetail && userDetail.userimg || '/pics/avata.png'} alt="" />
              <h4>{userDetail.username}</h4>
              <a href={`mailto:${userDetail.email}`}>{userDetail.email}</a>
              {
                data._id && userDetail?._id && data._id === userDetail._id &&
                <div className="editprofile">
                  <button onClick={() => setOpenEdit(!openEdit)}> <FaRegEdit /></button>
                  <span>Edit your profile</span>
                </div>
              }
            </div>
          }
        </div>
        <div className="post_data">
          {
            post.map((item) => {
              return (
                <>
                  <ItemCard item={item} key={item._id} />
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default UserPosts