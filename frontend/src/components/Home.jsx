import Nav from './Nav'
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