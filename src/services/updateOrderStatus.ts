const UPDATE_API_ENDPOINT = "/api/orders/";

export const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  try {
    const request = await fetch(UPDATE_API_ENDPOINT + id, {
      cache: "no-store",
      method: "PUT",
      body: JSON.stringify(status),
    });

    if (!request.ok) {
      throw new Error(`Request failed with status ${request.status}`);
    }
  } catch (error) {
    throw new Error("Failed to update status");
  }
};
