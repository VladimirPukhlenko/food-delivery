"use client";

import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteProductBtn: FC<{ id: string }> = ({ id }) => {
  const session = useSession();
  const { mutate: deleteProduct } = useDeleteProduct();

  if (session.data?.user.isAdmin) {
    return (
      <button
        className="p-2 bg-red-500 rounded-full absolute top-4 right-4"
        onClick={() => deleteProduct(id)}
      >
        <AiOutlineDelete className="text-2xl text-white" />
      </button>
    );
  }
};

export default DeleteProductBtn;
