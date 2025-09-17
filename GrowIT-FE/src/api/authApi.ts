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
      // API 오류가 발생해도 클라이언트에서는 로그아웃 처리
      throw error;
    }
  },
};

export default apiClient;