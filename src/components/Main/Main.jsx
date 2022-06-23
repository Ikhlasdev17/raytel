import React from 'react'
import { Outlet } from 'react-router-dom'
import Products from '../Products/Products'

const Main = () => {
  return (
    <div className='main'>
        <div className="container">
          <Outlet />
        </div>
    </div>
  )
}

export default Main