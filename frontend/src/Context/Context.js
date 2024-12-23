import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


export const storeContext = createContext(null)


const Context = (props) => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  console.log(error, "login error")

  const [userDetails, setUserDetails] = useState({
    password: '',
    email: '',
  })

  const [filter, setFilter] = useState({
    bathroom: "",
    bedroom: "",
    cat: "",
    location: "",
    type: "",
    furnishing: "",
  })

  const [data, setData] = useState([])
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState({
    location: ""
  })

  const searchInput = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
  }
  const [post, setPost] = useState(null)
  //const { id } = useParams()

  //const user = JSON.parse(localStorage.getItem('user')) || null
  //const data = user?.info


  // useEffect(() => {
  const fetchData = async (id) => {
    try {
      const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/single/${id}`, {
        withCredentials: false
      })
      setPost(res.data.posts)
      console.log(res.data.posts)
      console.log(res.data.posts.userId.username)
    } catch (error) {
      console.error(error)
    }
  }

  //fetchData()
  //}, [id])

  console.log(post?.price, "navbar post")


  const change = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
  const submit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await axios.post('https://back-end-g5hr.onrender.com/api/auth/login', userDetails, { withCredentials: true })
      console.log("Api data", response.data)
      /*navigate('/')
      localStorage.setItem('user', JSON.stringify(response.data))
      console.log(response.data)
      if (response.data.success === false) {
        setError(response.data.message)
        
      }*/
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/'); // Navigate only on success
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        const { success, message } = error.response.data;

        // Handle the `success === false` case
        if (success === false) {
          console.error('Error:', message); // Logs "Invalid email or password"
        }
        setError(message)
        console.log(error, "is error")
      }
      setLoading(false)
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?sort=${sort}`, {
          withCredentials: false,
        })
        setData(res.data.posts)
        //localStorage.setItem('allProperties', JSON.stringify(res.data))
        //console.log(res.data.posts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [sort])

  console.log(data)



  const searchProperty = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      /**const queryParams = new URLSearchParams(
        Object.entries(search).filter(([_, value]) => value)
      ).toString()**/
      const queryParams = new URLSearchParams({
        location: search.location,
        sort: sort
      }).toString();

      console.log(search, "Search object");

      console.log(queryParams, "Filtered properties")

      const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?${queryParams}`, {
        withCredentials: false,
      })
      const searchData = res.data.posts || []
      setData(searchData)
      localStorage.setItem('searchParams', queryParams)
      navigate(`/search?${queryParams}`)
      console.log(res.data.posts, "searched search")
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const setChangeFilter = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const isFormReady = Object.values(filter || {}).some((value) => value && value !== "") || sort;

  const searchFilter = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const queryParams = new URLSearchParams(
        Object.entries(filter).filter(([_, value]) => value)
      ).toString()

      /*const queryParams = new URLSearchParams({
        ...Object.fromEntries(Object.entries(filter).filter(([_, value]) => value)),
        sort: sort, // Include the sort parameter
      }).toString();*/

      // Append the sort parameter
      //const fullQuery = `${queryParams}&sort=${sort}`;

      const res = await axios.get(`https://back-end-g5hr.onrender.com/api/post/create?${queryParams}`, {
        withCredentials: false,
      })
      if (isFormReady) {
        setLoading(true)
        console.log(queryParams)
        const searchData = res.data.posts || []
        setData(searchData)
        localStorage.setItem('searchParams', queryParams)
        navigate(`/search?${queryParams}`)
      } else {
        alert("Please provide at least one filter option.");
      }
      setFilter({
        bathroom: "",
        bedroom: "",
        cat: "",
        location: "",
        type: "",
        furnishing: "",
      });
      setLoading(false)
      console.log(res.data.posts)
    } catch (error) {
      console.log(error)
    }
  }



  const values = {
    change, submit, loading, sort, data, setData, setSort, search, setSearch, searchProperty, filter, setFilter, searchFilter, setChangeFilter, search, post, error, fetchData, isFormReady, searchInput
  }

  return (
    <storeContext.Provider value={values}>
      {props.children}
    </storeContext.Provider>
  )
}

export default Context