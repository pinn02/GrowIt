/**
 * 카카오 OAuth 2.0 설정 파일
 *
 * 카카오 로그인 및 인증 관련 설정을 관리합니다.
 * 직접 카카오 인증 서버와 통신하는 방식으로 구현되어 있어,
 * 백엔드 서버가 실행되지 않아도 프론트엔드에서 독립적으로 카카오 로그인이 가능합니다.
 */

// 카카오 개발자 콘솔에서 발급받은 REST API 키
// 배포 환경에서는 환경변수 사용, 로컬에서는 기본값 사용
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY || 'tU4HQpvdU1P46vcnZ2J0lbe2b8cIYbyp';

// 카카오 OAuth 관련 설정
export const KAKAO_CONFIG = {
  // 카카오 개발자 콘솔에서 발급받은 REST API 키
  REST_API_KEY: KAKAO_REST_API_KEY,

  // 카카오 로그인 완료 후 리디렉트될 프론트엔드 URL
  // 백엔드에서 사용하던 Spring OAuth2 기본 패턴을 그대로 사용
  REDIRECT_URI: `${window.location.origin}/login/oauth2/code/kakao`,

  // 카카오 연결 해제(회원탈퇴) 완료 후 리디렉트될 프론트엔드 URL
  WITHDRAW_REDIRECT_URI: `${window.location.origin}/`,
};

/**
 * 카카오 로그인 인증 URL 생성 함수
 *
 * 카카오 인증 서버로 직접 리디렉트하는 URL을 생성합니다.
 * 사용자가 카카오에서 로그인하면 REDIRECT_URI로 authorization code가 전달됩니다.
 *
 * @returns {string} 카카오 OAuth 인증 URL
 */
export const getKakaoAuthUrl = () => {
  const { REST_API_KEY, REDIRECT_URI } = KAKAO_CONFIG;

  // 카카오 OAuth 2.0 Authorization Code 방식 URL 구성
  const params = new URLSearchParams({
    client_id: REST_API_KEY,        // 카카오 앱의 REST API 키
    redirect_uri: REDIRECT_URI,     // 인증 완료 후 리디렉트될 URI
    response_type: 'code'           // Authorization Code Grant 방식
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

/**
 * 카카오 연결 해제(회원탈퇴) 인증 URL 생성 함수
 *
 * 카카오 계정 연결 해제를 위한 인증 URL을 생성합니다.
 *
 * @returns {string} 카카오 연결 해제 인증 URL
 */
export const getKakaoWithdrawUrl = () => {
  const { REST_API_KEY, WITHDRAW_REDIRECT_URI } = KAKAO_CONFIG;

  const params = new URLSearchParams({
    client_id: REST_API_KEY,
    redirect_uri: WITHDRAW_REDIRECT_URI,
    response_type: 'code'
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

/**
 * 카카오 액세스 토큰 요청 함수
 *
 * authorization code를 사용하여 카카오 서버에서 액세스 토큰을 발급받습니다.
 *
 * @param {string} authCode 카카오에서 받은 authorization code
 * @returns {Promise<Object>} 토큰 정보 객체
 */
export const getKakaoToken = async (authCode: string) => {
  const { REST_API_KEY, REDIRECT_URI } = KAKAO_CONFIG;

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: authCode
  });

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  if (!response.ok) {
    throw new Error('카카오 토큰 발급 실패');
  }

  return await response.json();
};

/**
 * 카카오 사용자 정보 조회 함수
 *
 * 액세스 토큰을 사용하여 카카오 사용자 정보를 가져옵니다.
 *
 * @param {string} accessToken 카카오 액세스 토큰
 * @returns {Promise<Object>} 사용자 정보 객체
 */
export const getKakaoUserInfo = async (accessToken: string) => {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('카카오 사용자 정보 조회 실패');
  }

  return await response.json();
};