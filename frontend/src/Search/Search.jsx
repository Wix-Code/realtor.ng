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

  /**useEffect(() => {
    const storedProperties = localStorage.getItem('searchedProperties');
    if (storedProperties) {
      const parsedData = JSON.parse(storedProperties);
      setData(parsedData.posts); // Update the state with persisted data
    }
  }, []);**/

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const queryParams = searchParams.toString();

      console.log(queryParams, "property")

      if (queryParams) {
        try {
          const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?${queryParams}`, {
            withCredentials: false,
          })
          //const fetchedData = res.data.posts || [];
          setData(res.data.posts); // Update context or state
          console.log(res.data, "serached")
          //localStorage.setItem('searchedProperties', JSON.stringify(fetchedData))
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      } else {
        // Load from localStorage if no queryParams
        const storedProperties = localStorage.getItem('searchedProperties');
        if (storedProperties) {
          setData(JSON.parse(storedProperties));
        }
      }
    };

    fetchData();
  }, [location.search, setData]); // Re-fetch if the URL changes

  /**  useEffect(() => {
     const savedData = localStorage.getItem('searchedProperties');
     if (savedData) {
       setData(JSON.parse(savedData));
     }
   }, []); **/

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 4000)
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
