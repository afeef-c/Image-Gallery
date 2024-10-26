import React from 'react'
import Navbar from './Navbar'
import Nav from './Nav'
import ImageUpload from './ImageUpload'
import ImageGallery from './ImageGallery'
import ImageList from './ImageList'
import ImageReorder from './sample'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
    <Nav />
      <Outlet/>
    </>
  )
}

export default Home