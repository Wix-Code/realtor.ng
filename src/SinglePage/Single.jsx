import React from 'react'
import './single.css'
import SubLeft from './SubPages/SubLeft'
import Right from '../pages/Right'

const Single = () => {

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