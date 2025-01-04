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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust items per page as needed

  // Calculate total pages
  const totalPages = Math.ceil(dat.length / itemsPerPage);

  // Paginate data
  const paginatedData = dat.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const location = useLocation();

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

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoader(false), 3000)
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
                    paginatedData.map((item) => {
                      return (
                        <ItemCard item={item} key={item.id} />
                      )
                    })
                  }
                  <div className="pagination">
                    {
                      Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={currentPage === index + 1 ? 'active' : ''}
                        >
                          {index + 1}
                        </button>
                      ))
                    }
                  </div>
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
