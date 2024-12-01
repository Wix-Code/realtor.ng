import React, { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Rout from './Rout'
import Loader from './Loader/Loader'

const App = () => {

  const Rout = lazy(() => import('./Rout'));

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Rout />
        <Footer />
      </Suspense>

    </div>
  )
}

export default App