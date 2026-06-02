'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export interface CartItem {
  slug: string; // уникален идентификатор
  name: string; // име на продукта
  price: number; // цена за един брой
  size: string; // избран размер
  image: string; // снимка (images[0])
  quantity: number; // брой
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number; // общ брой артикули
  totalPrice: number; // обща цена
  isCartOpen: boolean; // отворена ли е количката
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Добавяне — ако артикулът (същия slug И същия размер) вече
  // съществува, увеличи бройката. Иначе добави нов.
  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === item.slug && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.size === item.size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    // Отвори количката при добавяне
    setIsCartOpen(true);
  };

  // Премахване на конкретен артикул (по slug + size, защото един
  // продукт може да е в количката в различни размери)
  const removeItem = (slug: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.slug === slug && i.size === size))
    );
  };

  // Промяна на бройка
  const updateQuantity = (slug: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart трябва да се използва в CartProvider');
  }
  return context;
}
