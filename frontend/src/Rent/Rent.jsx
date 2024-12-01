import React, { useEffect, useState } from 'react'
import Divide from '../pages/Divide'
import axios from 'axios'
import RentPage from './RentPage'
import Left from '../pages/Left'

const Rent = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/post/create', {
          params: { cat: "Rent" },
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

  return (
    <div className='buy'>
      <RentPage data={data} />
      <Divide />
    </div>
  )
}

export default Rent