import { updateStatus } from "@/services/updateOrderStatus";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";

type UpdateStatusProps = {
  id: string;
  status: string;
};

export const useUpdateStatus = (): UseMutationResult<
  void,
  unknown,
  UpdateStatusProps,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, status }: UpdateStatusProps) => updateStatus({ id, status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ordersData");
      },
    }
  );
};
