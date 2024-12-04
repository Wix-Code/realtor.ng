import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import './home.css'
import Google from '../components/Google'
import HomeAbout from '../components/HomeAbout'
import Companies from '../components/Companies'
import Loader from '../Loader/Loader'


const Home = () => {

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 7000)
  }, [])
  if (loader) {
    return <Loader />
  }

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