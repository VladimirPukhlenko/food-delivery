import { IMenuItem } from "@/types/menu.interface";

const CATEGORIES_API_ENDPOINT = `${process.env.BASE_URL}/api/categories`;

export const getAllCategories = async (): Promise<IMenuItem[]> => {
  try {
    const request = await fetch(CATEGORIES_API_ENDPOINT);
    const response: IMenuItem[] = await request.json();
    return response;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
