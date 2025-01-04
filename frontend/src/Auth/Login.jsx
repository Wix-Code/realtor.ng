import React, { useContext, useEffect, useState } from 'react'
import './auth.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../Context/Context'
import Loader from '../Loader/Loader'



const Login = () => {

  const { submit, change, error, loading } = useContext(storeContext)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)
  }, [])
  if (loader) {
    return <Loader />
  }

  return (
    <div className='register'>
      <div className="reg">
        <div className="reg_hi">
          <h1>Sign In</h1>
        </div>
      </div>
      <div className="regis">
        <div className="register_form">
          <div className="account">
            <h3>Sign in to your account</h3>
          </div>
          <form onSubmit={submit}>
            <div className="reg_inp">
              <label htmlFor="">Email</label>
              <input type="email" name="email" placeholder='Email' onChange={change} required />
            </div>
            <div className="reg_inp">
              <label htmlFor="">Password</label>
              <input type="password" name="password" placeholder='Password' onChange={change} required />
            </div>
            {
              error && <div className="error">
                <p style={{ color: "red" }}>{error}</p>
              </div>
            }
            <button disabled={loading} type="submit">{loading ? "Signing In " : "Sign In"}</button>
          </form>
          <div className="account">
            <h3>Don't have an account?</h3>
            <Link to='/register'><span>Register Now!</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login