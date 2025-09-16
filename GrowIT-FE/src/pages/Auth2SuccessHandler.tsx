import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { authApi } from '../api/authApi';

const OAuth2SuccessHandler = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setIsLoggedIn } = useUserStore();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const tokenData = await authApi.getOAuth2Token();
        
        if (!tokenData?.accessToken) {
          throw new Error('토큰을 받아올 수 없습니다.');
        }
        
        const userData = {
          email: tokenData.userEmail,
          nickname: tokenData.userNickname || '카카오 사용자'
        };
        
        setUser(userData);
        setToken(tokenData.accessToken);
        setIsLoggedIn(true);
        
        alert('로그인 성공!');
        navigate('/', { replace: true });
        
      } catch (error) {
        const errorMessage = error?.response?.data?.error || error?.message || '로그인에 실패했습니다.';
        alert(`로그인에 실패했습니다: ${errorMessage}`);
        navigate('/?error=login_failed', { replace: true });
      }
    };

    handleSuccess();
  }, []);

  return null;
};

export default OAuth2SuccessHandler;