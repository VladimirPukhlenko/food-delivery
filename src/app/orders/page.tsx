"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import { CiEdit } from "react-icons/ci";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import EmptyOrderList from "@/components/EmptyOrderList";
import { useGetOrders } from "@/hooks/useGetOrders";
import Loader from "@/components/UI/Loader";

const getStatusColorClass = (status: string): string => {
  const statusLowerCase = status?.toLowerCase();
  const classMap: Record<string, string> = {
    "on the way": "bg-red-100",
    "getting ready": "bg-green-100",
  };
  return classMap[statusLowerCase] || "bg-gray-100";
};

const Orders = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const { isLoading, isError, error, data: orders } = useGetOrders();
  const { mutate: updateStatus } = useUpdateStatus();

  const handleSubmit = (e: FormEvent<HTMLFormElement>, _id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.children[0] as HTMLInputElement;
    const status = input.value.trim();
    updateStatus({ id: _id, status });
  };

  if (isError) {
    router.replace("/");
  } else if (orders && !orders.length) {
    return <EmptyOrderList />;
  } else if (isLoading && status === "loading") {
    return (
      <div className="h-[calc(100vh-6rem)]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] relative text-xs md:text-base p-4 lg:p-8 xl:p-10">
      <table className="w-full text-center border-separate border-spacing-3 ">
        <thead className="uppercase [&>*]:px-2 [&>*]:py-4">
          <th className=" hidden md:table-cell">Order id</th>
          <th>Date</th>
          <th>Price</th>
          <th>Products</th>
          <th>Status</th>
        </thead>
        <tbody className="[&>tr>*]:px-2 [&>tr>*]:py-4 [&>tr>*]:rounded-md ">
          {orders &&
            orders.map((order) => {
              return (
                <tr
                  key={order._id}
                  className={`${getStatusColorClass(order.status)}`}
                >
                  <td className="hidden md:table-cell">{order._id}</td>
                  <td>
                    {String(new Date(order.createdAt))
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")}
                  </td>
                  <td>${order.price}</td>
                  <td>
                    {order.products
                      .map((product) => {
                        const productTitle = product.title;
                        const productQuantity =
                          product.quantity > 1 ? ` x${product.quantity}` : "";
                        const optionTitle = product.optionTitle.toLowerCase();

                        return `${productTitle}${productQuantity}(${optionTitle})`;
                      })
                      .join(" ")}
                  </td>

                  {data?.user.isAdmin ? (
                    <td>
                      <form
                        className=" flex flex-col items-center gap-2 p-1 lg:flex-row"
                        onSubmit={(e) => handleSubmit(e, order._id)}
                      >
                        <input
                          defaultValue={order.status}
                          className="bg-transparent w-full border border-white focus:outline focus:outline-red-500  focus:border-red-500 rounded-md p-2  "
                        />
                        <button className="text-red-500 text-xl cursor-pointer lg:text-2xl  xl:text-3xl">
                          <CiEdit />
                        </button>
                      </form>
                    </td>
                  ) : (
                    <td>{order.status}</td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
