import React, { useEffect, useState } from 'react'
import './createpost.css'
import axios from 'axios'
import upload from '../utils/upload'
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePost = () => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || null
  const data = user?.info

  const { id } = useParams();

  const [file, setFile] = useState(null)
  const [postDetails, setPostDetails] = useState({
    title: '',
    location: '',
    description: '',
    price: '',
    dPrice: '',
    cat: '',
    phoneNo: '',
    bedroom: '',
    furnish: '',
    type: '',
    bathroom: '',
    img: '',
    userId: '',
  })

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(`http://localhost:5000/api/post/single/${id}`)

      console.log(data.data.posts)
      setPostDetails(data.data.posts)
      try {

      } catch (error) {

      }
    }

    //console.log('Post User ID:', postDetails.userId);
    // console.log('Logged-in User ID:', data._id);

    fetch();
  }, [id])

  const handleEvent = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let url = postDetails.img

    if (file) {
      url = await upload(file)
      if (!url) {
        alert("File upload failed. Please try again.");
        return;
      }
    }

    const token = localStorage.getItem('token');

    const res = await axios.post(`http://localhost:5000/api/post/update/${id}`, {
      ...postDetails,
      img: url,
      userId: data._id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Pass token in the Authorization header
      }
      , withCredentials: true
    })
    navigate('/')

    console.log(postDetails)
    console.log(res.data)
  }
  return (
    <div className='create'>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Title</label>
            <input type="text" name='title' value={postDetails.title} placeholder='Title' onChange={handleEvent} />
          </div>
          <div className="creat">
            <label htmlFor="">Location</label>
            <input type="text" name='location' value={postDetails.location} placeholder='Location' onChange={handleEvent} />
          </div>
        </div>


        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Price</label>
            <input type="number" value={postDetails.price} name='price' placeholder='Price' onChange={handleEvent} />
          </div>
          <div className="creat">
            <label htmlFor="">DPrice</label>
            <input type="number" value={postDetails.dPrice} name='dPrice' placeholder='Price' onChange={handleEvent} />
          </div>
        </div>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Phone No</label>
            <input type="text" value={postDetails.phoneNo} name='phoneNo' placeholder='Phone No' onChange={handleEvent} />
          </div>
          <div className="creat">
            <label htmlFor="">Bedroom</label>
            <input type="number" value={postDetails.bedroom} name="bedroom" onChange={handleEvent} />
          </div>
        </div>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Category</label>
            <select name="cat" value={postDetails.cat} onChange={handleEvent}>
              <option>Category</option>
              <option value="Rent">Rent</option>
              <option value="Buy">Buy</option>
            </select>
          </div>
          <div className="creat">
            <label htmlFor="">Bathroom</label>
            <input type="number" value={postDetails.bathroom} name="bathroom" onChange={handleEvent} />
          </div>
        </div>

        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Furnishing</label>
            <select name="furnish" value={postDetails.furnish} onChange={handleEvent}>
              <option>Furnishing</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>
          <div className="creat">
            <label htmlFor="">Building</label>
            <select name="type" value={postDetails.type} onChange={handleEvent}>
              <option>Building</option>
              <option value="flat">Flat</option>
              <option value="bungalow">Bungalow</option>
              <option value="duplex">Duplex</option>
            </select>
          </div>
        </div>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="image">Images</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} name="" id="image" />
          </div>
          <div className="creat">
            <label htmlFor="">Description</label>
            <textarea name="description" value={postDetails.description} placeholder='Description' onChange={handleEvent} />
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UpdatePost