import React, { useContext, useEffect, useState } from 'react'
import './createpost.css'
import axios from 'axios'
import upload from '../utils/upload'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from '../Loader/Loader'
import { storeContext } from '../Context/Context'

const CreatePosts = () => {

  const navigate = useNavigate()
  //const { token } = useContext(storeContext)

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState(null)
  const [value, setValue] = useState('');
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
    img: [],
    userId: '',
  })

  const user = JSON.parse(localStorage.getItem('user')) || null
  const data = user?.info
  const token = localStorage.getItem('token');


  //console.log(data._id, "data id")

  const [loader, setLoader] = useState(true)

  console.log(token, "token")

  useEffect(() => {
    if (!data) {
      navigate('/signin')
    }
  })

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)
  }, [])
  if (loader) {
    return <Loader />
  }

  const handleEvent = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value })
  }

  const handleFiles = (e) => {
    setFiles([...e.target.files])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const urls = await Promise.all(
      files.map(async (file) => {
        const url = await upload(file);
        if (!url) throw new Error('File upload failed');
        return url;
      })
    );

    /*const url = await upload(file)
    if (!url) {
      alert("File upload failed. Please try again.");
      return;
    } */
    try {
      const payload = {
        ...postDetails,
        img: urls,
        //userId: data._id
      }

      console.log(payload, "payload")

      const res = await axios.post('https://back-end-g5hr.onrender.com/api/post/create', payload, {
        withCredentials: true
      })
      navigate('/')
      setLoading(false)
      console.log(postDetails)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert(error)
    }
  }

  return (
    <div className='create'>
      <h1>Create Posts</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Title</label>
            <input type="text" name='title' placeholder='Title' onChange={handleEvent} required />
          </div>
          <div className="creat">
            <label htmlFor="">Location</label>
            <input type="text" name='location' placeholder='Location' onChange={handleEvent} required />
          </div>
        </div>


        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Price</label>
            <input type="number" name='price' placeholder='Price' onChange={handleEvent} required />
          </div>
          <div className="creat">
            <label htmlFor="">DPrice</label>
            <input type="number" name='dPrice' placeholder='Price' onChange={handleEvent} required />
          </div>
        </div>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Phone No</label>
            <input type="text" name='phoneNo' placeholder='Phone No' onChange={handleEvent} required />
          </div>
          <div className="creat">
            <label htmlFor="">Bedroom</label>
            <input type="number" name="bedroom" onChange={handleEvent} required />
          </div>
        </div>
        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Category</label>
            <select name="cat" onChange={handleEvent} required>
              <option>Category</option>
              <option value="Rent">Rent</option>
              <option value="Buy">Buy</option>
            </select>
          </div>
          <div className="creat">
            <label htmlFor="">Bathroom</label>
            <input type="number" name="bathroom" onChange={handleEvent} required />
          </div>
        </div>

        <div className="create-two">
          <div className="creat">
            <label htmlFor="">Furnishing</label>
            <select name="furnish" onChange={handleEvent} required>
              <option>Furnishing</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>
          <div className="creat">
            <label htmlFor="">Building</label>
            <select name="type" onChange={handleEvent} required>
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
            <input type="file" multiple onChange={handleFiles} name="" id="image" required />
          </div>
          <div className="creat">
            <label htmlFor="">Description</label>
            <textarea name="description" onChange={handleEvent} id="" required></textarea>
          </div>
        </div>
        <button disabled={loading} type='submit'>{loading ? "Creating Post" : "Submit"}</button>
      </form>
    </div>
  )
}

export default CreatePosts