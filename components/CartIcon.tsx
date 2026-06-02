"use client";

import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setIsCartOpen(true)}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-colors duration-200 hover:text-accent"
      aria-label="Отвори количка"
    >
      {/* SVG икона на чанта/количка */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Брояч — показва се само ако има артикули */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white animate-[popIn_0.3s_ease]">
          {totalItems}
        </span>
      )}
    </button>
  );
}
