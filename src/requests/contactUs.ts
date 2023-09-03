import { Inputs } from "@/components/Form";
const CONTACTS_API_ENDPOINT = "/api/contacts";

export const addFeedBack = async (
  data: Inputs
): Promise<{ message: string }> => {
  try {
    const request = await fetch(CONTACTS_API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data), // Тело запроса - информация с обратной связью
    });

    // Проверяем статус запроса
    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    const response = await request.json();
    return response;
  } catch (error) {
    console.error("addFeedBack error =>", error);
    throw new Error("Failed to add information");
  }
};
