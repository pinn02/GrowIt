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
    const response = await apiClient.post('/logout');
    return response.data;
  },
};

export default apiClient;