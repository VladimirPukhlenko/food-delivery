import { IOrder, OrderItem } from "@/types/types";

const ORDERS_API_ENDPOINT = "/api/orders";

/**
 * Получает список заказов.
 *
 * @returns {Promise<OrderItem[]>} Массив объектов с информацией о заказах.
 * @throws {Error} В случае ошибки при выполнении запроса.
 */
export const getOrders = async (): Promise<OrderItem[]> => {
  try {
    // Отправляем запрос на получение списка заказов
    const request = await fetch(ORDERS_API_ENDPOINT, {
      cache: "no-store",
    });
    console.log(ORDERS_API_ENDPOINT);
    // Проверяем статус запроса
    if (!request.ok) {
      const errorData = await request.json();
      throw new Error(
        `Request failed with status ${request.status}: ${errorData.message}`
      );
    }

    const orders = await request.json();
    return orders;
  } catch (error) {
    console.error("getOrders error =>", error);
    throw new Error("Failed to fetch orders");
  }
};

/**
 * Добавляет заказ.
 * @param {IOrder} order - Информация о заказе для добавления.
 * @returns {Promise<{ message: string }>} - Ответ на запрос добавления заказа.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const addOrders = async (
  order: IOrder
): Promise<{ message: string }> => {
  try {
    const request = await fetch(ORDERS_API_ENDPOINT, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(order), // Тело запроса - информация о заказе
    });
    console.log(ORDERS_API_ENDPOINT);
    // Проверяем статус запроса
    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    const response = await request.json();
    return response;
  } catch (error) {
    console.error("addOrders error =>", error);
    throw new Error("Failed to add order");
  }
};
