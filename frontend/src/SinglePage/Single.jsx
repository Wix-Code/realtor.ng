import React, { useEffect, useState } from 'react'
import './single.css'
import SubLeft from './SubPages/SubLeft'
import Right from '../pages/Right'
import Loader from '../Loader/Loader'

const Single = () => {

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }

  return (
    <div className='single'>
      <div className="single_contain">
        <SubLeft />
        <Right />
      </div>
    </div>
  )
}

export default Single