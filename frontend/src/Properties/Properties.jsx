import React, { useEffect, useState } from 'react'
import './property.css'
import PropertyHero from './PropertyHero'
import Divide from '../pages/Divide'
import axios from 'axios'
import Left from '../pages/Left'
import Loader from '../Loader/Loader'

const Properties = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://back-end-g5hr.onrender.com/api/post/create', {
          withCredentials: true,
        })
        setData(res.data.posts)
        console.log(res.data.posts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  /*const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 6000)
  }, [])
  if (loader) {
    return <Loader />
  }*/

  return (
    <div className='buy'>
      <PropertyHero data={data} />
      <Divide />
    </div>
  )
}

export default Properties