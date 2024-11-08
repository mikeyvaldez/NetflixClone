// This is where we configure all of our routing logic


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ReactDOM } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import PlansPage from './pages/PlansPage.tsx'
import BrowsePage from './pages/BrowsePage.tsx'
import WatchPage from './pages/WatchPage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/watch/:id" element={<WatchPage />} />
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
