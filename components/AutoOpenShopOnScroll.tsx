"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AutoOpenShopOnScroll() {
  const router = useRouter();
  const redirectedRef = useRef(false);
  const wheelProgressRef = useRef(0);

  useEffect(() => {
    const thresholdPx = 120;

    const triggerRedirect = () => {
      if (redirectedRef.current) return;

      redirectedRef.current = true;
      router.push("/shop");
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) return;

      wheelProgressRef.current += event.deltaY;

      if (wheelProgressRef.current >= thresholdPx) {
        triggerRedirect();
      }
    };

    const onScroll = () => {
      if (window.scrollY >= thresholdPx) {
        triggerRedirect();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [router]);

  return null;
}
