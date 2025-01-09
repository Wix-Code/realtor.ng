import React, { useContext } from 'react'
//import { Links } from '../Data'
import { Link } from 'react-router-dom'
import './navbar.css'
import { storeContext } from '../Context/Context'

const SubLink = ({ setOpen, pathname }) => {

  const { token } = useContext(storeContext)

  const Links = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/properties',
      name: 'Properties',
    },
    {
      path: '/about',
      name: 'About Us',
    },
    ...(token
      ? [] // If token exists, hide Sign In and Sign Up
      : [
        { name: 'Sign In', path: '/signin' },
        { name: 'Sign Up', path: '/signup' },
      ]),
    {
      path: '/create',
      name: 'Post Property',
    },
  ]


  return (
    <div className='navlink'>
      <ul>
        {
          Links.map((item) => {
            return (
              <Link to={item.path}><li key={item.name} className={pathname === item.path ? "active" : ""} onClick={() => setOpen(false)}>{item.name}</li></Link>
            )
          })
        }

      </ul>
    </div>
  )
}

export default SubLink