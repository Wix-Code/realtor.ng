import React from 'react'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import './home.css'
import Google from '../components/Google'
import HomeAbout from '../components/HomeAbout'
import Companies from '../components/Companies'

const Home = () => {


  return (
    <div className='home'>
      <Hero />
      <Companies />
      <Latest />
      <HomeAbout />
      <Google />
    </div>
  )
}

export default Home