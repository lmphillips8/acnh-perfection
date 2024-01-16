import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import MuseumGoal from './goalPages/museumGoal'
import RoyalCrown from './goalPages/royalCrown'
import ErrorPage from './errorPages/notFound'
import GoldenTools from './goalPages/goldenTools'
import SeasonalDIYs from './goalPages/seasonalDIYs'
import CookingRecipes from './goalPages/cookingRecipes'
import Friendship from './goalPages/friends'
import NookMiles from './goalPages/nookMiles'
import Flowers from './goalPages/flowers'
import Gyroids from './goalPages/gyroids'
import Goals from './Goals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Goals />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/museum',
    element: <MuseumGoal />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/tools',
    element: <GoldenTools />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/royalCrown',
    errorElement: <ErrorPage />,
    element: <RoyalCrown />,
  },
  {
    path: '/diys',
    errorElement: <ErrorPage />,
    element: <SeasonalDIYs />,
  },
  {
    path: '/cooking',
    errorElement: <ErrorPage />,
    element: <CookingRecipes />,
  },
  {
    path: '/photos',
    errorElement: <ErrorPage />,
    element: <Friendship />,
  },
  {
    path: '/nookMiles',
    errorElement: <ErrorPage />,
    element: <NookMiles />,
  },
  {
    path: '/flowers',
    errorElement: <ErrorPage />,
    element: <Flowers />,
  },
  {
    path: '/gyroids',
    errorElement: <ErrorPage />,
    element: <Gyroids />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
