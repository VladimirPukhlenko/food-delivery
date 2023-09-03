import { Product } from "@/types/types";

const PRODUCTS_API_ENDPOINT = `${process.env.BASE_URL}/api/products`;

/**
 * Получает список продуктов.
 * @param {string} slug - Название категории для фильтрации (по умолчанию - пустая строка).
 * @returns {Promise<Product[]>} - Массив объектов с информацией о продуктах.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */

export const getProducts = async (slug: string): Promise<Product[]> => {
  // Формируем URL для запроса в зависимости от наличия категории
  const URL = `${PRODUCTS_API_ENDPOINT}/${slug}`;

  try {
    // Отправляем запрос на получение списка продуктов
    const request = await fetch(URL);

    // Проверяем статус запроса
    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    // Парсим JSON из ответа
    const response = await request.json();

    // Возвращаем массив объектов с информацией о продуктах
    return response;
  } catch (error) {
    // Ловим ошибку, выводим её в консоль и пробрасываем дальше
    console.error("getProducts error =>", error);
    throw new Error("Failed to fetch product list");
  }
};

/**
 * Получает информацию о продукте по его идентификатору.
 * @param {string} id - Идентификатор продукта для запроса.
 * @returns {Promise<Product>} - Объект с информацией о продукте.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const getSingleProduct = async (id: string): Promise<Product> => {
  try {
    // Формируем запрос на получение информации о продукте
    const request = await fetch(`${PRODUCTS_API_ENDPOINT}/${id}`);

    // Проверяем статус запроса
    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    // Парсим JSON из ответа
    const response = await request.json();

    // Возвращаем объект с информацией о продукте
    return response;
  } catch (error) {
    // Ловим ошибку, выводим её в консоль и пробрасываем дальше
    console.error(error);
    throw new Error("Failed to fetch product information");
  }
};

/**
 * Удаляет продукт по его идентификатору.
 * @param {string} id - Идентификатор продукта для удаления.
 * @returns {Promise<{ message: string }>} - Объект с сообщением об успешном удалении.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  try {
    // Формируем запрос на удаление продукта
    const request = await fetch(`${PRODUCTS_API_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    // Проверяем статус запроса
    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    // Парсим JSON из ответа
    const response = await request.json();

    // Возвращаем объект с сообщением
    return response;
  } catch (error) {
    // Ловим ошибку, выводим её в консоль и пробрасываем дальше
    console.error("deleteProduct error =>", error);
    throw new Error("Failed to delete product");
  }
};
