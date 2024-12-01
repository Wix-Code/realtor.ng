import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Buy from './Properties/Properties'
import Home from './Home/Home'
import Single from './SinglePage/Single'
import Login from './Auth/Login'
import Register from './Auth/Register'
import About from './About/About'
import Contact from './Contact/Contact'
import Logout from './Auth/Logout'
import CreatePosts from './CreatePost/CreatePosts'
import UserPosts from './UserPosts/UserPosts'
import UpdatePost from './CreatePost/UpdatePost'
import Search from './Search/Search'
import Loader from './Loader/Loader'

const Rout = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/properties' element={<Buy />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/:id' element={<Single />} />
      <Route path='/search' element={<Search />} />
      <Route path='/lists/:id' element={<UserPosts />} />
      <Route path='/register' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/signout' element={<Logout />} />
      <Route path='/create' element={<CreatePosts />} />
      <Route path='/update/:id' element={<UpdatePost />} />
      <Route />
    </Routes>
  )
}

export default Rout