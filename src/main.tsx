import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Home from './app/Home'
import Send from './app/Send'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "send",
    element: <Send />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
