import React, { useContext, useEffect } from 'react'
import { storeContext } from '../Context/Context'
import ItemCard from '../pages/ItemCard'
import './search.css'
import Divide from '../pages/Divide'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Search = () => {

  const { data, setData } = useContext(storeContext)

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const queryParams = searchParams.toString();

      if (queryParams) {
        try {
          const res = await axios.get(`http://localhost:5000/api/post/create?${queryParams}`, {
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