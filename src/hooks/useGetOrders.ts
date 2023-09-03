import { getOrders } from "@/requests/orders";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

export const useGetOrders = () => {
  return useQuery("ordersData", () => getOrders(), {
    select: (data) => {
      return [...data].reverse();
    },
    onError(err: string) {
      toast.error(err);
    },
  });
};
