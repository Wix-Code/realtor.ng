import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Sign } from '../Data'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './navbar.css'
import axios from 'axios'
import { FaBars, FaTimes } from 'react-icons/fa'
import SubLink from './SubLink'
import { storeContext } from '../Context/Context'

const Navbar = () => {


  const [open, setOpen] = useState(false)
  const [click, setClick] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { post } = useContext(storeContext)

  const { pathname } = location



  const user = JSON.parse(localStorage.getItem('user')) || null
  //const data = user?.info




  console.log(post, "navbar navbar")

  const signOut = async () => {
    try {
      await axios.post('https://back-end-g5hr.onrender.com/api/auth/logout')
      localStorage.removeItem('user', null)
      localStorage.removeItem('token', null)
      navigate('/')
      setClick(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='navbar'>
      <div className='navba'>
        <div className='nav1'>
          <Link to='/'><h1><span>real</span>tor.ng</h1></Link>
        </div>

        {open ?
          <SubLink setOpen={setOpen} pathname={pathname} /> : <div className='nav2'>
            <ul>
              {
                NavLink.map((link) => {
                  return (
                    <Link to={link.path}><li key={link.name} className={pathname === link.path ? "active" : ""}>
                      {link.name}
                    </li></Link>
                  )
                })
              }
            </ul>
          </div>
        }
        <div className='nav3'>
          {
            user ? <li className='li' onClick={signOut}>Sign Out</li> :
              <ul>
                {
                  Sign.map((link) => {
                    return (
                      <li key={link.path}>
                        <Link to={link.path}>{link.name}</Link>
                      </li>
                    )
                  })
                }
              </ul>
          }

          <div className="nav4">
            <button onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar