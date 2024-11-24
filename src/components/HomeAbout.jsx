import React from 'react'
import './components.css'

const HomeAbout = () => {
  return (
    <div className='homeabout'>
      <div className="homeabouts">
        <h3>About Nigeria Property Centre</h3>
        <p>Nigeria Property Centre is a real estate and property website in Nigeria with property listings for sale, rent and lease. We offer Nigerian property seekers an easy way to find details of property like homes, houses, lands, shops, office spaces and other commercial properties to buy or rent. Nigeria Property Centre provides a platform for advertising property from organisations and Nigerian private property owners.</p>
        <p>Nigeria Property Centre (NPC) is the clear leading property website with lots of users, advertising members and properties. Our advertisers are property professionals such as estate agents, letting (rental) agents, new homes developers and Nigerian private property owners who offer properties within Nigeria for property hunters.</p>
        <div className="home_num">
          <div className="home_numbers">
            <h1>18,046</h1>
            <h3>Agents & Developers</h3>
          </div>
          <div className="home_numbers">
            <h1>103,046</h1>
            <h3>Property listings</h3>
          </div>
          <div className="home_numbers">
            <h1>2,046</h1>
            <h3>Area covered</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeAbout