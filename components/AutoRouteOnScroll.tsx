"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  downHref?: string;
  upHref?: string;
  thresholdPx?: number;
};

export default function AutoRouteOnScroll({
  downHref,
  upHref,
  thresholdPx = 120,
}: Props) {
  const router = useRouter();
  const redirectedRef = useRef(false);
  const downProgressRef = useRef(0);
  const upProgressRef = useRef(0);
  const prevScrollYRef = useRef(0);

  useEffect(() => {
    const navigateTo = (href: string | undefined) => {
      if (!href || redirectedRef.current) return;

      redirectedRef.current = true;
      router.push(href);
    };

    const onWheel = (event: WheelEvent) => {
      if (redirectedRef.current) return;

      if (event.deltaY > 0) {
        upProgressRef.current = 0;
        downProgressRef.current += event.deltaY;

        if (window.scrollY >= thresholdPx || downProgressRef.current >= thresholdPx) {
          navigateTo(downHref);
        }
        return;
      }

      if (event.deltaY < 0) {
        downProgressRef.current = 0;

        if (window.scrollY <= thresholdPx) {
          upProgressRef.current += Math.abs(event.deltaY);

          if (upProgressRef.current >= thresholdPx) {
            navigateTo(upHref);
          }
        } else {
          upProgressRef.current = 0;
        }
      }
    };

    const onScroll = () => {
      if (redirectedRef.current) return;

      const currentY = window.scrollY;
      const delta = currentY - prevScrollYRef.current;

      if (delta > 0) {
        upProgressRef.current = 0;
        downProgressRef.current += delta;

        if (currentY >= thresholdPx || downProgressRef.current >= thresholdPx) {
          navigateTo(downHref);
        }
      }

      if (delta < 0) {
        downProgressRef.current = 0;

        if (currentY <= thresholdPx) {
          upProgressRef.current += Math.abs(delta);

          if (upProgressRef.current >= thresholdPx) {
            navigateTo(upHref);
          }
        } else {
          upProgressRef.current = 0;
        }
      }

      prevScrollYRef.current = currentY;
    };

    prevScrollYRef.current = window.scrollY;

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [downHref, router, thresholdPx, upHref]);

  return null;
}
