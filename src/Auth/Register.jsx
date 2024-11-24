import React, { useState } from 'react'
import './auth.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import upload from '../utils/upload'

const Register = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState(null)
  const [userDetails, setUserDetails] = useState({
    userimg: '',
    username: '',
    password: '',
    email: '',
  })
  //const [err, setErr] = useState(false)

  const change = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
  const submit = async (e) => {
    e.preventDefault()
    //setLoading(true)
    const url = await upload(file)
    if (!url) {
      alert("File upload failed. Please try again.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { ...userDetails, userimg: url })
      if (res) {
        navigate('/signin')
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='register'>
      <div className="reg">
        <div className="reg_hi">
          <h1>Register</h1>
        </div>
      </div>
      <div className="regis">
        <div className="register_form">
          <div className="account">
            <h3>Create your own account</h3>
          </div>
          <form onSubmit={submit}>
            <div className="form_img">
              <label htmlFor="image"></label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} name="userimg" id="image" />
            </div>
            <div className="reg_inp">
              <label htmlFor="">Username</label>
              <input type="text" name="username" placeholder='Name' onChange={change} required />
            </div>
            <div className="reg_inp">
              <label htmlFor="">Email</label>
              <input type="email" name="email" placeholder='Email' onChange={change} required />
            </div>
            <div className="reg_inp">
              <label htmlFor="">Password</label>
              <input type="password" name="password" placeholder='Password' onChange={change} required />
            </div>
            <button type='submit'>{loading ? "loading..." : 'Register'}</button>
          </form>
          <div className="account">
            <h3>Already have an account?</h3>
            <Link to='/signin'><span>Sign In.</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register