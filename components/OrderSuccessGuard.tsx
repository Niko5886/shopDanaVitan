"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccessGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const flag = sessionStorage.getItem("orderComplete");
    if (flag === "true") {
      sessionStorage.removeItem("orderComplete");
      // Умишлен еднократен client-mount guard: sessionStorage не може да се
      // чете при SSR без hydration mismatch, затова проверката е в effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllowed(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!allowed) return null;
  return <>{children}</>;
}
