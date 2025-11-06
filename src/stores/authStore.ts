"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 스토어에 담길 상태/액션 타입
type AuthState = {
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  reset: () => void;
  _hydrated: boolean;
  _setHydrated: (v: boolean) => void;
};

// create<타입>()(persist(...)) 형태: persist 미들웨어를 걸어서 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      setIsAdmin: (v) => set({ isAdmin: v }),
      reset: () => set({ isAdmin: false }), // 로그아웃 시 사용

      // 복원 완료 플래그
      _hydrated: false,
      _setHydrated: (v) => set({ _hydrated: v }),
    }),
    {
      name: "auth", // localStorage key 이름

      // SSR에서 window가 없는 에러 방지: 함수로 localStorage를 지연 참조
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ isAdmin: state.isAdmin }),

      // 저장값을 복원하는 시점에 호출됨
      // 복원이 끝난 후 _hydrated를 true로 세팅해 “준비 완료” 신호
      onRehydrateStorage: () => (state) => {
        state?._setHydrated(true);
      },
    }
  )
);