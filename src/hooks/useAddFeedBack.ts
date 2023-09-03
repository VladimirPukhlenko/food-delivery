import { addFeedBack } from "@/requests/contactUs";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useAddFeedBack = () => {
  return useMutation(addFeedBack, {
    onSuccess: () => {
      toast("Thanks for your feedback!", { icon: "❤️" });
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};

export default useAddFeedBack;
