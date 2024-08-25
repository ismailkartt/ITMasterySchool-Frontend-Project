import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from '../layouts/user-layout'
import HomePage from '../pages/home-page'

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            }
        ]
    }
])

const AppRouter = () => { 
    return <RouterProvider router={router}/>
}

export default AppRouter