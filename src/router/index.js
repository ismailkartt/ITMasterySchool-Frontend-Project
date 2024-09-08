import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from '../layouts/user-layout'
import HomePage from '../pages/home-page'
import CoursesPage from '../pages/courses-page'
import EventsPage from '../pages/events-page'
import AboutPage from '../pages/about-page'


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: "courses",
                element: <CoursesPage/>,
            },
            {
                path: "events",
                element: <EventsPage/>,
            },
            {
                path: "about",
                element: <AboutPage/>,
            }
        ]
    }
])

const AppRouter = () => { 
    return <RouterProvider router={router}/>
}

export default AppRouter