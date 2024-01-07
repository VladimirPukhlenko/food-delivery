import { OrderItem, IOrder } from "@/types/order.interface";

const ORDERS_API_ENDPOINT = "/api/orders";

export const getOrders = async (): Promise<OrderItem[]> => {
  try {
    const request = await fetch(ORDERS_API_ENDPOINT, {
      cache: "no-store",
    });

    if (!request.ok) {
      const errorData = await request.json();
      throw new Error(
        `Request failed with status ${request.status}: ${errorData.message}`
      );
    }

    const orders = await request.json();
    return orders;
  } catch (error: any) {
    throw new Error((error as Error).message);
  }
};

export const addOrders = async (order: IOrder): Promise<IOrder> => {
  try {
    const request = await fetch(ORDERS_API_ENDPOINT, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(order),
    });

    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    const response = await request.json();
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
