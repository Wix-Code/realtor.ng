import React, { useContext } from 'react'
import { storeContext } from '../Context/Context'
import ItemCard from '../pages/ItemCard'
import './search.css'
import Divide from '../pages/Divide'

const Search = () => {

  const { data } = useContext(storeContext)


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
            <div>
              <h1>No property found</h1>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Search