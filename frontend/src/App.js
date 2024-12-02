import React, { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Rout from './Rout'

const App = () => {

  const Rout = lazy(() => import('./Rout'));

  return (
    <div>
      <Navbar />
      <Rout />
      <Footer />

    </div>
  )
}

export default App