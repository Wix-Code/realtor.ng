import React, { useContext, useState } from 'react'
import './components.css'
import { CiSearch } from 'react-icons/ci'
import { storeContext } from '../Context/Context'

const Hero = () => {


  const { searchProperty, setSearch, search, loading } = useContext(storeContext)


  return (
    <div className='hero'>
      <h1>Find your new property</h1>
      <div className="search">
        <input type="text" placeholder='Search by location...' onChange={(e) => setSearch(e.target.value)} required />
        <div className="hero_btn">
          <button disabled={loading || search === ""} onClick={searchProperty}>{loading ? "Searching..." : "Search"}</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
