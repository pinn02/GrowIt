import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/StartPage';
import MainPage from '../pages/MainPage';
import BankruptcyPage from '../pages/BankruptcyPage'
import RankingPage from '../pages/RankingPage'
import EndingPage from '../pages/EndingPage';

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/bankruptcy', element: <BankruptcyPage /> },
  { path: '/ranking', element: <RankingPage /> },
  { path: '/ending', element: <EndingPage /> },
])