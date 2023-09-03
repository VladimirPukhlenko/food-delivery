// Импортируем необходимые типы
import { CartItemType, TCart } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Определяем интерфейс для хранилища состояния
interface IStore extends TCart {
  addToCart: (item: CartItemType) => void;
  deleteFromCart: (itemId: CartItemType) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<IStore>(
    (set, get) => ({
      // Начальное состояние
      products: [],

      // Вычисляемая функция для получения общей стоимости товаров в корзине
      totalPrice: () =>
        +get()
          .products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
          .toFixed(2),

      // Вычисляемая функция для получения общего количества товаров в корзине
      cartQuantity: () =>
        get().products.reduce((acc, curr) => acc + curr.quantity, 0),

      // Добавление товара в корзину
      addToCart: (item) => {
        const existingProduct = get().products.find(
          (product) =>
            product._id === item._id && product.optionTitle === item.optionTitle
        );
        if (existingProduct) {
          const updatedProducts = get().products.map((product) =>
            product._id === existingProduct._id &&
            product.optionTitle === existingProduct.optionTitle
              ? { ...product, quantity: product.quantity + item.quantity }
              : product
          );
          set({
            products: [...updatedProducts],
          });
        } else {
          set({
            products: [...get().products, item],
          });
        }
      },

      // Удаление товара из корзины
      deleteFromCart: (item) => {
        set((state) => {
          const existingProduct = state.products.find(
            (product) =>
              product._id === item._id &&
              product.optionTitle === item.optionTitle
          );
          if (existingProduct) {
            const updatedProducts = state.products.map((product) =>
              product._id === existingProduct._id &&
              product.optionTitle === existingProduct.optionTitle
                ? { ...product, quantity: product.quantity - 1 }
                : product
            );
            return {
              products: updatedProducts.filter((product) => product.quantity),
            };
          }
          return state;
        });
      },

      // Очистка корзины
      clearCart() {
        set({
          products: [],
        });
      },
    }),
    { name: "Cart", skipHydration: true } // Пропсы для использования persist
  )
);
