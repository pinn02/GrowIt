import { createBrowserRouter } from 'react-router-dom'
// import HomePage from '../pages/Home'
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import ReportPage from '../pages/ReportPage'
import BankruptcyPage from '../pages/BankruptcyPage'

export const router = createBrowserRouter([
  // { path: '/', element: <HomePage /> },
  { path: '/', element: <LoginPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/report', element: <ReportPage /> },
  { path: '/bankruptcy', element: <BankruptcyPage /> },
])