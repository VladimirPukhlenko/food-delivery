const UPDATE_API_ENDPOINT = "/api/orders/";

/**
 * Обновляет статус продукта.
 * @param {Object} options - Параметры для обновления статуса.
 * @param {string} options.id - Идентификатор продукта.
 * @param {string} options.status - Новый статус продукта.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<void> => {
  try {
    // Формируем запрос на обновление статуса
    const request = await fetch(UPDATE_API_ENDPOINT + id, {
      cache: "no-store",
      method: "PUT",
      body: JSON.stringify(status),
    });

    // Проверяем статус запроса
    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }
  } catch (error) {
    // Ловим ошибку, выводим её в консоль и пробрасываем дальше
    console.error("updateStatus error =>", error);
    throw new Error("Failed to update status");
  }
};
