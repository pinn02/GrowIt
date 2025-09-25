// Google Analytics gtag 타입 정의
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId?: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export {};