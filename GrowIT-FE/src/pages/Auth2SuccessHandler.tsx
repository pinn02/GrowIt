import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore.tsx';

const OAuth2SuccessHandler = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setIsLoggedIn } = useUserStore();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // 백엔드 CustomOAuth2SuccessHandler와 동일한 방식으로 세션에서 데이터 가져오기
        const oauth2Success = sessionStorage.getItem('oauth2_success');
        const userEmail = sessionStorage.getItem('userEmail');
        const userNickname = sessionStorage.getItem('userNickname');

        if (!oauth2Success || !userEmail) {
          throw new Error('OAuth2 인증 정보를 찾을 수 없습니다.');
        }

        const userData = {
          email: userEmail,
          nickname: userNickname || '카카오사용자'
        };

        // Zustand store 업데이트 (자동으로 user-storage에 저장됨)
        setUser(userData);
        setIsLoggedIn(true);

        // 세션 데이터 정리
        sessionStorage.removeItem('oauth2_success');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userNickname');

        // 다른 중복 저장소들 정리
        localStorage.removeItem('growit-auth-data');
        localStorage.removeItem('growit-user-storage');

        alert(`${userData.nickname}님, 환영합니다!`);
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