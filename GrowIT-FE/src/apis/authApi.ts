import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export const authApi = {
  loginWithKakao: () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  },

  getOAuth2Token: async () => {
    const response = await apiClient.get('/api/v1/oauth2/token');
    return response.data;
  },

  logout: async () => {
    try {
      const response = await apiClient.get('/api/v1/member/logout');
      return response.data;
    } catch (error) {
      console.error('로그아웃 API 오류:', error);
      throw error;
    }
  },

  withdraw: async () => {
    try {
      // localStorage에서 토큰 가져오기
      const userData = JSON.parse(localStorage.getItem('user-storage') || '{}');
      const token = userData.state?.token;
      
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }
      
      const response = await apiClient.patch('/api/v1/member/withdraw', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('회원탈퇴 API 오류:', error);
      throw error;
    }
  },
};

export default apiClient;