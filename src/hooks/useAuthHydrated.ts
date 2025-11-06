"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

// persist 복원 완료 후에만 true → 컴포넌트 렌더 타이밍 제어 (복원되기 전 ui 혼란을 방지)
export function useAuthHydrated() {
  const hydrated = useAuthStore((s) => s._hydrated);
  const [ready, setReady] = useState(hydrated);

  useEffect(() => {
    if (hydrated) {
      setReady(true);
      console.log('hydrated');
    }
  }, [hydrated]);

  return ready; // false면 아직 복원 전
}