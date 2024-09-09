import React, { useEffect } from 'react'
import Topbar from '../components/common/topbar'
import Menubar from '../components/common/menubar'
import Footer from '../components/common/footer'
import { Outlet, useLocation } from 'react-router-dom'
import ScrollToTopButton from '../components/common/scroll-to-top-button'

const UserLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.document.documentElement.scrollTo({top: 0});
  
  }, [pathname])

  return (
    <>
        <Topbar/>
        <Menubar/>
        <Outlet/>
        <Footer/>
        <ScrollToTopButton/>
    </>
  )
}

export default UserLayout