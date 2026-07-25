"use client";

import {
  createContext,
  useCallback,
  useContext,
  useOptimistic,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react";
import { getProductById, priceForQuantity } from "@/lib/products";
import type { CartItem } from "@/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  isPending: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "savoury-lab-cart";

let memoryCart: CartItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return memoryCart;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  memoryCart = items;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  memoryCart = readStorage();
  return memoryCart;
}

function getServerSnapshot(): CartItem[] {
  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isPending, startTransition] = useTransition();
  const [optimisticItems, setOptimisticItems] = useOptimistic(items);

  const commit = useCallback((next: CartItem[]) => {
    writeStorage(next);
  }, []);

  const addItem = (productId: string, quantity: number) => {
    const product = getProductById(productId);
    if (!product || !priceForQuantity(product, quantity)) return;

    startTransition(() => {
      const next = (() => {
        const existing = items.find((i) => i.productId === productId);
        if (existing) {
          return items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          );
        }
        return [...items, { productId, quantity }];
      })();
      setOptimisticItems(next);
      commit(next);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = getProductById(productId);
    if (!product) return;
    if (quantity < product.minQuantity) {
      removeItem(productId);
      return;
    }
    startTransition(() => {
      const next = items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      );
      setOptimisticItems(next);
      commit(next);
    });
  };

  const removeItem = (productId: string) => {
    startTransition(() => {
      const next = items.filter((i) => i.productId !== productId);
      setOptimisticItems(next);
      commit(next);
    });
  };

  const clear = () => {
    startTransition(() => {
      setOptimisticItems([]);
      commit([]);
    });
  };

  const subtotal = optimisticItems.reduce((sum, item) => {
    const product = getProductById(item.productId);
    if (!product) return sum;
    const priced = priceForQuantity(product, item.quantity);
    return sum + (priced?.lineTotalZar ?? 0);
  }, 0);

  const count = optimisticItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: optimisticItems,
        count,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        isPending,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
