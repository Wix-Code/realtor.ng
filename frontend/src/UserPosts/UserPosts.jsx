import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './userposts.css'
import ItemCard from '../pages/ItemCard'
import { FaRegEdit } from 'react-icons/fa'

const UserPosts = () => {
  const { id } = useParams()

  const [post, setPost] = useState([])
  const [userDetail, setUserDetail] = useState(null)
  const user = JSON.parse(localStorage.getItem('user')) || null
  const data = user?.info

  console.log(data._id, "data me")
  console.log(user, "user info me")


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


  return (
    <div className='userposts'>
      <div className="userposts_col">
        <div>
          {
            userDetail && <div className='userdetails'>
              <img src={userDetail && userDetail.userimg || '/pics/avata.png'} alt="" />
              <h4>{userDetail.username}</h4>
              <a href={`mailto:${userDetail.email}`}>{userDetail.email}</a>
              {
                data._id && userDetail?._id && data._id === userDetail._id &&
                <div className="editprofile">
                  <button> <FaRegEdit /></button>
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