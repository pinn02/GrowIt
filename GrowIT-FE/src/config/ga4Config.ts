/**
 * Google Analytics 4 설정 파일
 */

// GA4 측정 ID (환경변수 우선, 없으면 기본값 사용)
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export const GA4_CONFIG = {
  MEASUREMENT_ID: GA4_MEASUREMENT_ID,
  // 개발 환경에서는 GA4 비활성화
  ENABLED: import.meta.env.PROD || import.meta.env.VITE_GA4_ENABLED === 'true',
};

/**
 * GA4 초기화 함수
 */
export const initializeGA4 = () => {
  if (!GA4_CONFIG.ENABLED) {
    console.log('GA4 disabled in development');
    return;
  }

  // gtag 함수 정의
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // GA4 초기화
  window.gtag('js', new Date());
  window.gtag('config', GA4_CONFIG.MEASUREMENT_ID);

  console.log('GA4 initialized:', GA4_CONFIG.MEASUREMENT_ID);
};

/**
 * 페이지 뷰 추적
 */
export const trackPageView = (pageName: string) => {
  if (!GA4_CONFIG.ENABLED) return;

  window.gtag?.('event', 'page_view', {
    page_title: pageName,
    page_location: window.location.href,
  });
};

/**
 * 커스텀 이벤트 추적
 */
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (!GA4_CONFIG.ENABLED) return;

  window.gtag?.('event', eventName, parameters);
};

/**
 * 카카오 로그인 성공 추적
 */
export const trackKakaoLogin = (userId: string) => {
  trackEvent('login', {
    method: 'kakao',
    user_id: userId,
  });
};

/**
 * 게임 시작 추적
 */
export const trackGameStart = (difficulty: string, ceoType: string) => {
  trackEvent('game_start', {
    difficulty: difficulty,
    ceo_type: ceoType,
  });
};