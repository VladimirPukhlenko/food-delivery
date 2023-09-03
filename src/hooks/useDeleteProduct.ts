import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UseMutationResult, useMutation } from "react-query";
import { deleteProduct } from "@/requests/products";

type Data = {
  message: string;
};
export const useDeleteProduct = (): UseMutationResult<
  Data,
  unknown,
  string,
  unknown
> => {
  const router = useRouter();
  return useMutation((id: string) => deleteProduct(id), {
    onSuccess(data) {
      router.replace("/");
      toast.success(data.message);
    },
    onError(error: Error) {
      console.log(error);
      toast.error(error.message);
    },
  });
};
