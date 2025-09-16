import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/StartPage';
import MainPage from '../pages/MainPage';
import BankruptcyPage from '../pages/BankruptcyPage'
import RankingPage from '../pages/RankingPage'
import Auth2SuccessHandler from '../pages/Auth2SuccessHandler'

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/oauth2/success', element: <Auth2SuccessHandler />},
  { path: '/main', element: <MainPage /> },
  { path: '/bankruptcy', element: <BankruptcyPage /> },
  { path: '/ranking', element: <RankingPage /> },
])