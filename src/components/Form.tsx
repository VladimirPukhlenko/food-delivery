"use client";

import useAddFeedBack from "@/hooks/useAddFeedBack";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  topic: string;
  email: string;
  description: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onTouched" });

  const { mutate: addFeedBackMessage } = useAddFeedBack();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addFeedBackMessage(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 text-base text-red-500 font-medium flex flex-col w-full h-full  justify-around "
    >
      <h1 className="text-2xl text-center font-bold">Contact us</h1>
      <hr />
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label>Topic</label>
          <p className="text-xs text-red-600">
            {errors.topic && errors.topic.message}
          </p>
        </div>
        <input
          {...register("topic", {
            required: "Topic required field.",
          })}
          placeholder="Enter the subject of the message..."
          className={`w-full ${
            errors.topic ? "border-red-500  outline-red-500" : " outline-none"
          } rounded-lg placeholder-red-200 border p-2 border-gray-300`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label>Email</label>
          <p className="text-xs text-red-600">
            {errors.email && errors.email.message}
          </p>
        </div>
        <input
          {...register("email", {
            required: "Email required field.",
            pattern: {
              message: "Not a valid email",
              value: /(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
            },
          })}
          placeholder="example@domain.com"
          className={`w-full ${
            errors.email ? "border-red-500  outline-red-500" : " outline-none"
          } rounded-lg placeholder-red-200 border p-2 border-gray-300`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label>Description</label>
          <p className="text-xs text-red-600">
            {errors.description && errors.description.message}
          </p>
        </div>
        <textarea
          {...register("description", {
            required: "Description required field.",
            minLength: {
              value: 25,
              message: "The minimum length is 25 characters",
            },
          })}
          placeholder="Could you kindly share the purpose behind your request with us?"
          className={`marker:w-full rounded-lg ${
            errors.description
              ? "border-red-500  outline-red-500"
              : " outline-none"
          } h-40 resize-none placeholder-red-200 border p-2 border-gray-300`}
        />
      </div>
      <button className="bg-red-500 text-white rounded-lg overflow-hidden w-2/3 mx-auto uppercase hover:bg-red-600 transition-colors">
        <label
          htmlFor={`${isValid ? "my-drawer" : ""}`}
          className="cursor-pointer block py-2 overflow-hidden"
        >
          Submit
        </label>
      </button>
    </form>
  );
};

export default Form;
