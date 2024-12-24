import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../Context/Context'
import ItemCard from '../pages/ItemCard'
import './search.css'
import Divide from '../pages/Divide'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Right from '../pages/Right'

const Search = () => {

  const { dat, setDat, sort } = useContext(storeContext)

  const [fit, setFit] = useState([])

  const location = useLocation();
  const navigate = useNavigate()

  /**useEffect(() => {
    const storedProperties = localStorage.getItem('searchedProperties');
    if (storedProperties) {
      const parsedData = JSON.parse(storedProperties);
      setData(parsedData.posts); // Update the state with persisted data
    }
  }, []);**/

  const fetchData = async () => {

    const searchParams = new URLSearchParams(location.search);
    let queryParams = searchParams.toString();  // Get query string from the URL

    const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?${queryParams}`);
    const fetchedData = res.data.posts;

    setDat(fetchedData || []);
    //console.log(fetchedData, "Fetch me")

    console.log(fetchedData, "data of properties")

  };

  useEffect(() => {
    fetchData();
  }, [location.search, setDat]);  // Re-run when the URL search params change

  console.log("Come to me")
  /**useEffect(() => {
    const fetchData = async () => {
      let queryParams = new URLSearchParams(location.search).toString();
      if (queryParams) {
        const storedParams = localStorage.getItem("lastSearchParams");
        if (storedParams) {
          queryParams = storedParams;
          console.log("Using stored query parameters:", queryParams);
        } else {
          console.warn("No query parameters or stored data available.");
          setData([]);
          queryParams = storedParams;
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
  }, [location.search]);**/


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
          dat.length > 0 ? (
            <div className='filt'>
              <h1>Searched Properties</h1>
              <div className="fiter">
                <div className="prop1">
                  {
                    dat.map((item) => {
                      return (
                        <ItemCard item={item} key={item.id} />
                      )
                    })
                  }
                </div>
                <Right />
              </div>
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
