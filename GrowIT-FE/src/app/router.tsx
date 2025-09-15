import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/StartPage';
import MainPage from '../pages/MainPage';
import BankruptcyPage from '../pages/BankruptcyPage'
import RankingPage from '../pages/RankingPage'

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/bankruptcy', element: <BankruptcyPage /> },
  { path: '/ranking', element: <RankingPage /> },
])