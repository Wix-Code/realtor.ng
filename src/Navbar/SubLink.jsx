import React from 'react'
import { Links } from '../Data'
import { Link } from 'react-router-dom'
import './navbar.css'

const SubLink = ({ setOpen, pathname }) => {
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