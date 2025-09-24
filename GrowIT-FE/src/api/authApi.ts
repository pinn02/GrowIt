import axios from 'axios';
import { getKakaoAuthUrl } from '../config/kakaoConfig.js';

/**
 * 백엔드 API 기본 URL 설정
 * 배포 환경에서는 실제 서버 도메인을 사용
 */
const API_BASE_URL = 'https://j13c201.p.ssafy.io';

/**
 * Axios 인스턴스 생성
 * - withCredentials: 쿠키를 포함한 cross-origin 요청 허용
 * - timeout: 요청 타임아웃 설정 (20초)
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

/**
 * 인증 관련 API 함수들
 */
export const authApi = {
  /**
   * 카카오 로그인 실행 함수
   *
   * 백엔드 우회하고 프론트엔드에서 직접 카카오 서버와 통신
   * 모든 환경에서 동일한 방식으로 처리하여 백엔드 의존성 제거
   */
  loginWithKakao: () => {
    window.location.href = getKakaoAuthUrl();
  },

  /**
   * OAuth2 토큰 조회 함수
   *
   * 카카오 로그인 완료 후 백엔드에서 생성된 JWT 토큰을 조회합니다.
   * 카카오 콜백 페이지에서 authorization code를 받은 후 호출됩니다.
   *
   * @returns {Promise} 토큰 정보가 포함된 응답 데이터
   */
  getOAuth2Token: async () => {
    const response = await apiClient.get('/api/v1/oauth2/token');
    return response.data;
  },

  /**
   * 로그아웃 함수
   *
   * 백엔드에 로그아웃 요청을 보내 세션을 무효화합니다.
   * 로그아웃 시 refresh token도 함께 삭제됩니다.
   *
   * @returns {Promise} 로그아웃 응답 데이터
   * @throws {Error} 로그아웃 API 호출 실패 시
   */
  logout: async () => {
    try {
      const response = await apiClient.get('/api/v1/member/logout');
      return response.data;
    } catch (error) {
      // 로그아웃 API 호출 실패
      throw error;
    }
  },

  /**
   * 회원탈퇴 함수
   *
   * 사용자 계정을 비활성화하고 관련 데이터를 처리합니다.
   * localStorage에서 JWT 토큰을 가져와 인증 헤더에 포함시킵니다.
   *
   * @returns {Promise} 회원탈퇴 응답 데이터
   * @throws {Error} 토큰이 없거나 API 호출 실패 시
   */
  withdraw: async () => {
    try {
      // localStorage에서 토큰 가져오기
      // Zustand store에서 관리되는 user-storage 키 사용
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
      // 회원탈퇴 API 호출 실패
      throw error;
    }
  },
};

export default apiClient;