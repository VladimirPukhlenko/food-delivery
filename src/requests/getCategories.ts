import { IMenuItem } from "@/types/types";

const CATEGORIES_API_ENDPOINT = `${process.env.BASE_URL}/api/categories`;

/**
 * Получает все категории.
 * @returns {Promise<MenuItem[]>} - Массив объектов с информацией о категориях.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const getAllCategories = async (): Promise<IMenuItem[]> => {
  try {
    const request = await fetch(CATEGORIES_API_ENDPOINT);
    const response: IMenuItem[] = await request.json();
    return response;
  } catch (error) {
    console.error("getAllCategories error =>", error);
    throw new Error("Failed to fetch categories");
  }
};
