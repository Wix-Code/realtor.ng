import React, { useContext, useEffect, useState } from 'react'
import './pages.css'
import ItemCard from './ItemCard'
//import axios from 'axios'
import { storeContext } from '../Context/Context'

const Left = () => {

  const { sort, data, setSort } = useContext(storeContext)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust items per page as needed

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Paginate data
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /*const [data, setData] = useState([])
  const [sort, setSort] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/create?sort=${sort}`, {
          withCredentials: false,
        })
        setData(res.data.posts)
        console.log(res.data.posts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [sort])*/

  console.log(sort)

  return (
    <div className='left'>
      <div className="for_sale">
        <h2>Properties in Nigeria</h2>
        <select onChange={(e) => setSort(e.target.value)} name={sort} id="">
          <option>Sort By</option>
          <option value="most-recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="highest-price">Highest Price</option>
          <option value="lowest-price">Lowest Price</option>
        </select>
      </div>
      <div className="check">
        {
          paginatedData.map((item) => {
            return (
              <ItemCard key={item._id} item={item} />
            )
          })
        }
      </div>
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
  )
}

export default Left