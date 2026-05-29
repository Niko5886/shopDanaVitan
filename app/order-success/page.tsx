import Link from "next/link";
import OrderSuccessGuard from "@/components/OrderSuccessGuard";

export const metadata = {
  title: "Поръчката е успешна",
  description: "Вашата поръчка е получена успешно.",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <OrderSuccessGuard>
      <div className="flex min-h-[80vh] items-center justify-center bg-[#0a0a0a] px-6 py-16">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          {/* Checkmark */}
          <div className="flex h-24 w-24 animate-[successPulse_1.5s_ease-in-out_infinite] items-center justify-center rounded-full border-[3px] border-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent"
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="5 12.5 10 17.5 19 7.5" />
            </svg>
          </div>

          <h1 className="mt-6 text-[2rem] font-medium text-white">Поръчката е успешна!</h1>

          <p className="mt-3 max-w-[400px] text-base text-[#999999]">
            Благодарим ви! Изпратихме потвърждение на вашия имейл.
          </p>

          <p className="mt-2 max-w-[400px] text-sm text-[#666666]">
            Ще се свържем с вас скоро за уточняване на детайлите по доставката.
          </p>

          <div className="my-8 h-px w-[60px] bg-[#222222]" />

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/shop"
              className="rounded-[2px] bg-accent px-8 py-[14px] text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-accent-strong"
            >
              Към магазина
            </Link>
            <Link
              href="/"
              className="rounded-[2px] border border-accent px-8 py-[14px] text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-accent/10"
            >
              Начало
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes successPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    </OrderSuccessGuard>
  );
}
