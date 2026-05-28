import { Suspense } from "react";
import CheckoutClient from "../../components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] px-6 pt-24 text-white/60">Зареждане...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
