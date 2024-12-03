import React from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Rout from './Rout'
import ScrollToTop from './ScrollToTop/ScrollToTop'

const App = () => {


  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Rout />
      <Footer />
    </div>
  )
}

export default App