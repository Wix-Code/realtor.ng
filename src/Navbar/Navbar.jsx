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
  const data = user?.info




  console.log(post, "navbar navbar")

  const signOut = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout')
      localStorage.removeItem('user', null)
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
            user ? <li onClick={signOut}>Sign Out</li> :
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
          <div className='nav_img'>
            {
              data && <>
                <Link><img onClick={() => setClick(!click)} src={data && data.userimg || '/pics/avata.png'} alt="" /></Link>
                {
                  click && <div className="click">
                    <Link to={`/lists/${post?.userId?._id}`}><h3 onClick={() => setClick(false)}>Profile</h3></Link>
                    <h3 onClick={signOut}>Sign Out</h3>
                  </div>
                }
              </>
            }
          </div>
          <div className="nav4">
            <button onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar