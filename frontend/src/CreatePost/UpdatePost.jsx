import React, { useEffect, useState } from 'react'
import './createpost.css'
import axios from 'axios'
import upload from '../utils/upload'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'

const UpdatePost = () => {

  const { loading, setLoading } = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || null
  const data = user?.info

  const { id } = useParams();

  const [loader, setLoader] = useState(true)
  const [files, setFiles] = useState(null)
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

  const handleFiles = (e) => {
    setFiles([...e.target.files])
  }


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

  useEffect(() => {
    setTimeout(() => setLoader(false), 6000)
  }, [])
  if (loader) {
    return <Loader />
  }

  const handleEvent = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let urls = postDetails.img

    // If new files are uploaded, handle the upload process.
    if (files && files.length > 0) {
      const newUrls = await Promise.all(
        files.map(async (file) => {
          const url = await upload(file); // Assuming `upload` is implemented for uploading files.
          if (!url) throw new Error('File upload failed');
          return url;
        })
      );

      urls = [...urls, ...newUrls]; // Combine old and new URLs.
    }

    const token = localStorage.getItem('token');

    const res = await axios.post(`https://back-end-g5hr.onrender.com/api/post/update/${id}`, {
      ...postDetails,
      img: urls,
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
    setLoading(false)
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
            <input type="file" multiple onChange={handleFiles} name="img" id="image" />
          </div>
          <div className="creat">
            <label htmlFor="">Description</label>
            <textarea name="description" value={postDetails.description} placeholder='Description' onChange={handleEvent} />
          </div>
        </div>
        <button type='submit' disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  )
}

export default UpdatePost