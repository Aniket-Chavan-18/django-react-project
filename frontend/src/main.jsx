import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthWrapper from './components/auth/AuthWrapper.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProblemPage from './components/home/ProblemPage.jsx'
import { store } from './app/store.js'
import { Provider } from "react-redux"
import TestCaseGenerator from './components/test_cases/TestCaseGenerator.jsx'
import DsaSheets from './components/problem/DsaSheets.jsx'
import LeetcodeProblemPage from './components/home/LeetcodeProblemPage.jsx'
import ProgressPage from './components/progess/ProgressPage.jsx'
import AllSubmissionsPage from './components/allsubmissions/AllSubmissionsPage.jsx'
import NotFound from './components/notfound/NotFound.jsx'
import ResetPassword from './components/auth/ResetPassword.jsx'
import Forget from './components/auth/Forget.jsx'
import ChangePassword from './components/auth/ChangePassword.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/user/auth',
    element: <AuthWrapper />
  },
  {
    path: '/problem/:id',
    element: <ProblemPage />
  },
  {
    path: '/problem/private/testcasegenerater/',
    element: <TestCaseGenerator />
  },
  {
    path: '/dsa-sheet',
    element: <DsaSheets />
  },
  {
    path: '/user/progress',
    element: <ProgressPage />
  },
  {
    path: '/user/allsubmissions',
    element: <AllSubmissionsPage />
  },
  {
    path: '/user/change-password',
    element: <ChangePassword />
  },
  {
    path: '/user/forget-password',
    element: <Forget />
  },
  {
    path: '/user/reset/:id/:token',
    element: <ResetPassword />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
