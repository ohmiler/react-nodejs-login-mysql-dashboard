import React from 'react'
import Navbar from './Navbar'
import ProtectedRoute from './ProtectedRoute'

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className='max-w-screen-xl mx-auto'>
        <div className='py-10'>
            <h1>Dashboard Page</h1>
            <hr className='my-4' />
            <p>
                Welcome to Dashboard
            </p>
        </div>
      </div>
    </>
  )
}

export default Dashboard
