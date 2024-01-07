import { IProduct } from "@/types/product.interface";

const PRODUCTS_API_ENDPOINT = `${process.env.BASE_URL}/api/products`;
export type ProductType = "pizzas" | "pastas" | "all" | "features" | "burgers";

export const getProducts = async (type: ProductType): Promise<IProduct[]> => {
  const URL = `${PRODUCTS_API_ENDPOINT}?type=${type}`;

  try {
    const request = await fetch(URL);

    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    const response = await request.json();

    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getSingleProduct = async (id: string): Promise<IProduct> => {
  try {
    const request = await fetch(`${PRODUCTS_API_ENDPOINT}/${id}`);

    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }

    const response = await request.json();

    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
