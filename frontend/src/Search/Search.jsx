import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context/Context'
import ItemCard from '../pages/ItemCard'
import './search.css'
import Divide from '../pages/Divide'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'

const Search = () => {

  const { data, setData, sort } = useContext(storeContext)

  const location = useLocation();
  const navigate = useNavigate()

  /**useEffect(() => {
    const storedProperties = localStorage.getItem('searchedProperties');
    if (storedProperties) {
      const parsedData = JSON.parse(storedProperties);
      setData(parsedData.posts); // Update the state with persisted data
    }
  }, []);**/

  /**useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const queryParams = searchParams.toString();


      console.log(queryParams, "property")

      if (queryParams) {
        try {
          const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?${queryParams}`, {
            withCredentials: false,
          })
          const fetchedData = res.data.posts || [];
          setData(fetchedData); // Update state with fetched data
          console.log(res.data, "searched");
          localStorage.setItem('searchedProperties', queryParams); // Save valid data

        } catch (error) {
          console.log("Error fetching data:", error);
        }
      } else {
        // Load from localStorage if no queryParams
        const storedParams = localStorage.getItem('searchParams')
        if (storedParams) {
          // Use stored parameters to fetch data
          const res = await axios.get(
            `https://back-end-g5hr.onrender.com/api/post/create?${storedParams}`,
            { withCredentials: false }
          )
          setData(res.data.posts || [])
          // Update URL with stored parameters
          navigate(`/search?${storedParams}`, { replace: true })
        } else {
          setData([])
        }
      }
    };

    fetchData();
  }, [location.search, setData]); // Re-fetch if the URL changes **/

  useEffect(() => {
    const fetchData = async () => {
      let queryParams = new URLSearchParams(location.search).toString();
      if (!queryParams) {
        const storedParams = localStorage.getItem("lastSearchParams");
        if (storedParams) {
          queryParams = storedParams;
          console.log("Using stored query parameters:", queryParams);
        } else {
          console.warn("No query parameters or stored data available.");
          setData([]);
          return; // Prevent unnecessary API call
        }
      }

      try {
        const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?${queryParams}`, {
          withCredentials: false,
        });

        const fetchedData = res.data.posts || [];
        setData(fetchedData);
        localStorage.setItem("searchedProperties", JSON.stringify(fetchedData));
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [location.search]);


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
