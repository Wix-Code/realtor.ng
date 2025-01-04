import React, { useEffect, useState } from 'react'
import './about.css'
import { Team } from '../Data'
import Loader from '../Loader/Loader'

const About = () => {

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)
  }, [])
  if (loader) {
    return <Loader />
  }
  return (
    <div className='about'>

      <div className="about_hero">

      </div>
      <div className="about_del">
        <div className="about_write">
          <h3>We are Nigeria’s largest commercial and residential real estate sales organization.</h3>
          <p>Our main areas of work are domestic and commercial property sales and purchases.
            With the years of experience in Nigerian real estate, we are the market leaders around for lifestyle and investment buyers. We are committed to earning customers for life by communication, honesty and safeguarding the interests of all parties.</p>
          <p>
            Our specialty is representing buyers and sellers of luxury homes , residential and commercial lands in Nigeria. We offer unparalleled opportunities for sellers of lands and luxury homes to have desired exposure to individuals considering buying or selling a home or land in the Nigeria market, or investing here. Our ability to think out of the box and compelling marketing solutions for sellers sets us apart from most realtors. We acquired our strong marketing and branding experience from several years of interacting with hundreds of clients and successfully closing deals desirable to their investment expectations.</p>
        </div>
        <div className="about_write">
          <h3>Our core values</h3>
          <ul>
            <li><b>Quality:</b> Excellent service delivery</li>
            <li><b>Teamwork:</b> Excellent service delivery</li>
            <li><b>Commitment:</b> We are committed to providing the highest level of service in ensuring our clients’ needs are met</li>
            <li><b>Proactive:</b> Excellent service delivery</li>
          </ul>
        </div>
      </div>
      <div className="team">
        <h1>MEET OUR TEAM</h1>
        <div className="teams">
          {
            Team.map((item) => {
              return (
                <div className='team_pic' style={{ backgroundImage: `url(${item.img})` }}>
                  <div className="team_names">
                    <h4>{item.name}</h4>
                    <p>{item.position}</p>
                  </div>
                  <div className="team_del">
                    <h4>{item.name}</h4>
                    <p>{item.position}</p>
                    <span>{item.desc}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default About