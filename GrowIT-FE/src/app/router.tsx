import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/StartPage';
import MainPage from '../pages/MainPage';
import BankruptcyPage from '../pages/BankruptcyPage'
import Auth2SuccessHandler from '../pages/Auth2SuccessHandler'
import EndingPage from '../pages/EndingPage';

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/oauth2/success', element: <Auth2SuccessHandler />},
  { path: '/login/oauth2/code/kakao', element: <LoginPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/bankruptcy', element: <BankruptcyPage /> },
  { path: '/ending', element: <EndingPage /> },
])