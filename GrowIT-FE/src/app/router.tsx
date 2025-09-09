import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import BankruptcyPage from '../pages/BankruptcyPage'

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/bankruptcy', element: <BankruptcyPage /> },
])