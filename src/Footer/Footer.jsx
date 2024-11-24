import React from 'react'
import './footer.css'
import { Links } from '../Data'
import { Link, useLocation } from 'react-router-dom'


const Footer = () => {

  const location = useLocation()

  const { pathname } = location

  return (
    <div className='footer'>
      <div className="foot">
        <div className="nav1">
          <Link to='/'><h1><span>real</span>tor.ng</h1></Link>

        </div>
        <div className="footer2">
          <h2>Quick Links</h2>
          <div className="links">
            {
              Links.map((link) => {
                return (
                  <Link to={link.path}><li className={pathname === link.path ? "active" : ""}>{link.name}</li></Link>
                )
              })
            }
          </div>
        </div>
        <div className="footer3">
          <h2>Google Store</h2>
          <img src="./pics/app.jpg" alt="" />
        </div>
      </div>
      <div className="wright">
        <p>© 2024 realtor.ng All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer