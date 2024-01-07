"use client";
import React, { useEffect } from "react";
import CartItem from "@/components/CartItem";
import { useCartStore } from "@/libs/zustance/store";
import EmptyCart from "@/components/EmptyCart";
import { addOrders } from "@/services/orders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Cart = () => {
  const session = useSession();
  const store = useCartStore();
  const router = useRouter();

  const serviceCost = 4.99;
  const deliveryCost = 9.99;

  const total =
    store.totalPrice() > 30
      ? store.totalPrice() + serviceCost
      : store.totalPrice() + deliveryCost + serviceCost;

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  if (!store.cartQuantity()) return <EmptyCart />;

  const handleCheckOut = async () => {
    if (session.data?.user) {
      const response = await addOrders({
        email: session.data?.user.email!,
        price: +total.toFixed(2),
        status: "Getting ready",
        products: store.products,
      });
      router.push("/");
      toast.success("The order has been successfully completed");
      store.clearCart();
    } else {
      toast.error("Please login to place an order");
      router.push("/login");
    }
  };
  const handleClearCart = () => {
    router.push("/menu");
    toast.success("The basket has been cleared.");
    store.clearCart();
  };
  return (
    <div className="text-rose-500  h-[calc(100vh-6rem)] lg:flex ">
      <div className="overflow-y-auto  relative h-1/2 px-4 lg:h-full lg:w-1/2 lg:px-8">
        {store.products.map((product) => {
          return <CartItem key={product._id} {...product} />;
        })}
      </div>
      <div className="h-1/2 flex items-center font-medium bg-red-50 lg:h-full lg:w-1/2 ">
        <div className="px-4 py-2 flex flex-col gap-2 text-xl w-full lg:px-8 lg:py-4">
          <div className="flex justify-between">
            <p>Subtotal ({store.cartQuantity()} items)</p>
            <p>${store.totalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p>Service cost</p>
            <p>${serviceCost}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery cost</p>
            {store.totalPrice() > 50 ? (
              <p className="text-green-500 uppercase">Free</p>
            ) : (
              <p className="text-rose-500 uppercase">${deliveryCost}</p>
            )}
          </div>
          <hr className="my-1 border-1 border-gray-400" />
          <div className="font-bold">
            <div className="flex justify-between">
              <p className="uppercase">Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <br />
          <div className="flex justify-between">
            <button
              onClick={handleClearCart}
              className="text-red-300  block  uppercase py-2 rounded-lg  bg-gradient-to-l text filter contrast-200 hover:text-red-500 transition-colors  duration-300 "
            >
              Clear cart
            </button>
            <button
              onClick={handleCheckOut}
              className=" text-white block uppercase px-8 py-2 rounded-lg  bg-gradient-to-l from-red-500 to-orange-500  filter hover:brightness-125 transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
