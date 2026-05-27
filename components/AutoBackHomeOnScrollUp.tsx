"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AutoBackHomeOnScrollUp() {
  const router = useRouter();
  const redirectedRef = useRef(false);
  const wheelProgressRef = useRef(0);

  useEffect(() => {
    const thresholdPx = 120;

    const triggerRedirect = () => {
      if (redirectedRef.current) return;

      redirectedRef.current = true;
      router.push("/");
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY >= 0) {
        wheelProgressRef.current = 0;
        return;
      }

      // Пренасочваме само когато потребителят вече е почти в горната част на магазина.
      if (window.scrollY > thresholdPx) {
        wheelProgressRef.current = 0;
        return;
      }

      wheelProgressRef.current += Math.abs(event.deltaY);

      if (wheelProgressRef.current >= thresholdPx) {
        triggerRedirect();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [router]);

  return null;
}
