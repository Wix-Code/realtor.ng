import React, { useContext } from 'react'
import './pages.css'
import { storeContext } from '../Context/Context'

const Right = () => {

  const { filter, setChangeFilter, searchFilter, loading } = useContext(storeContext)

  return (
    <div className='right'>
      <div className="advance">
        <div className="advan">
          <h2>Advanced Filter Options</h2>
        </div>
        <form action="">
          <div className="inp">
            <label htmlFor="">Location</label>
            <input type="text" name='location' placeholder='Location' onChange={setChangeFilter} required />
          </div>
          <div className="inp">
            <label htmlFor="">Type</label>
            <select name="type" id="" onChange={setChangeFilter} required>
              <option value="" disabled selected>Select Type</option>
              <option value="bungalow">Bungalow</option>
              <option value="duplex">Duplex</option>
              <option value="flat">Flat</option>
            </select>
          </div>
          <div className="right_input">
            <div className="right_select">
              <label htmlFor="">Bedroom</label>
              <input type="number" name="bedroom" onChange={setChangeFilter} required />
            </div>
            <div className="right_select">
              <label htmlFor="">Bathroom</label>
              <input type="number" name="bathroom" onChange={setChangeFilter} required />
            </div>
          </div>
          <div className="right_input">
            <div className="right_select">
              <label htmlFor="">Furnish</label>
              <select name="furnish" onChange={setChangeFilter} required>
                <option value="" disabled selected>Select Furnishing</option>
                <option value="furnished">Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            <div className="right_select">
              <label htmlFor="">Category</label>
              <select name="cat" onChange={setChangeFilter} required>
                <option value="" disabled selected>Select Category</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>
          <button disabled={loading} onClick={searchFilter}>{loading ? "Searching" : "Search"}</button>
        </form>
      </div>
    </div>
  )
}

export default Right