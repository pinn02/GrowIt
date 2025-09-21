import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore.tsx';
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
        
        // Zustand store 업데이트 (자동으로 user-storage에 저장됨)
        setUser(userData);
        setToken(tokenData.accessToken);
        setIsLoggedIn(true);
        
        // 다른 중복 저장소들 정리
        localStorage.removeItem('growit-auth-data');
        localStorage.removeItem('growit-user-storage');
        
        // 로그인 성공 - 사용자 데이터 저장 완료
        
        alert('로그인 성공!');
        navigate('/', { replace: true });
        
      } catch (error) {
        // 로그인 처리 중 오류 발생
        const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
        alert(`로그인에 실패했습니다: ${errorMessage}`);
        navigate('/?error=login_failed', { replace: true });
      }
    };

    handleSuccess();
  }, [setUser, setToken, setIsLoggedIn, navigate]);

  return null;
};

export default OAuth2SuccessHandler;