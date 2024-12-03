import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context/Context'
import ItemCard from '../pages/ItemCard'
import './search.css'
import Divide from '../pages/Divide'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'

const Search = () => {

  const { data, setData } = useContext(storeContext)

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const queryParams = searchParams.toString();

      if (queryParams) {
        try {
          const res = await axios.get(`https://realtor-ng.vercel.app/api/post/create?${queryParams}`, {
            withCredentials: false,
          });
          setData(res.data.posts || []); // Persist data in context/state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [location.search, setData]); // Re-fetch if the URL changes

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 5000)
  }, [])
  if (loader) {
    return <Loader />
  }


  return (
    <div className='filtered'>

      <div className="searched">
        {
          data.length > 0 ? (
            <div className='filt'>
              <h1>Searched Properties</h1>
              <Divide />
            </div>
          ) : (
            <div className='no_property'>
              <h1>No property found</h1>
              <button onClick={() => window.history.back()}>Go Back</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Search